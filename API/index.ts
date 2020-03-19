import verify from "./auth";
import { getCurrentRound, isIdentical } from "./funtions";
import Posts from "./mariaDB/Posts";
import Comments from "./mariaDB/Comments";
import { getIncOrExcNumbers, IncOrExc } from './dynamoDB/myNumbers'
import { doesRecommend } from "./dynamoDB/recommend";
import { addPoint, Point, subtractPoint } from "./dynamoDB/userInfo";
import Users from "./mariaDB/Users";
import Response from "./Response";

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
exports.handler = async (event: any) => {
    if(event['detail-type'] === 'Scheduled Event'){
        return console.log('Scheduled Event');
    }    
    console.log(event);

    const method: string = event.httpMethod;
    const resource: string = event.resource;
    let logedIn: boolean = false;

    let currentId: string, currentName: string;
    if (event.headers['x-id-token']) {
        try {
            const userInfo = verify(event.headers['x-id-token']);
            logedIn = true;
            currentId = userInfo["cognito:username"];
            currentName = userInfo.nickname;
        } catch (err) {
            console.log('Intruder Alert! - Expired Token', err);
            const response = {
                statusCode: 400,
                headers,
            };
            return response;
        }
    }

    let statusCode: number = 200;
    let body: any;

    switch (resource) {
        case '/posts': {
            const db = new Posts();
            switch (method) {
                case 'GET':
                    const category: string = event.queryStringParameters.category;
                    const index: number = Number(event.queryStringParameters.index);
                    const posts = await db.scan(category, index);
                    const count = await db.getCount(category);
                    body = { posts, count };
                    break;
                case 'POST':
                    if (logedIn) {
                        const { category, title, contents } = JSON.parse(event.body);
                        const insertId = await db.post(category, title, currentId, contents);
                        await addPoint(currentId, Point.post);
                        body = insertId;
                    } else {
                        statusCode = 400;
                        body = "로그인되지 않은 사용자입니다."
                    }
                    break;
            }
        }
            break;
        case '/posts/{postId}': {
            const db = new Posts();
            const postId = Number(event.pathParameters.postId);
            switch (method) {
                case 'GET':
                    const flag = event.queryStringParameters && event.queryStringParameters.flag;
                    if (!flag) {
                        await db.addHits(postId);
                        const post = await db.get(postId);
                        if (post.category === "incl") {
                            post.incl = await getIncOrExcNumbers(post.userName, getCurrentRound(post.created), IncOrExc.include);
                        }
                        else if (post.category === "excl") {
                            post.excl = await getIncOrExcNumbers(post.userName, getCurrentRound(post.created), IncOrExc.exclude);
                        }else if(post.category === "qna"){
                            if(currentId !== post.userName){
                                return {
                                    statusCode:200,
                                    headers,
                                    body: JSON.stringify(new Response(true, "작성자가 아닙니다"))
                                }
                            }
                        }
                        body = post;
                        body.recommend = await doesRecommend(postId, currentId);
                    } else {
                        const post = await db.getTitleContents(postId);
                        body = post;
                    }
                    break;
                case 'PATCH': {
                    const response = isIdentical(currentId, (await db.getUserName(postId)));
                    if (!response.error) {
                        const { title, contents } = JSON.parse(event.body)
                        const changedRows = await db.updateContents(postId, title, contents)
                        body = changedRows;
                    } else {
                        statusCode = 400;
                        body = response.message;
                    }
                }
                    break;
                case 'DELETE': {
                    const response = isIdentical(currentId, (await db.getUserName(postId)));
                    if (!response.error) {
                        const affectedRows = await db.delete(postId);
                        await subtractPoint(currentId, Point.post);
                        body = affectedRows;
                    } else {
                        statusCode = 400;
                        body = response.message;
                    }
                }
                    break;
            }
        }
            break;
        case '/posts/{postId}/comments': {
            const db = new Comments();
            const postId = Number(event.pathParameters.postId);
            switch (method) {
                case 'GET':
                    const comments = await db.getByPost(postId);
                    body = comments;
                    break;
                case 'POST':
                    if (logedIn) {
                        const { contents } = JSON.parse(event.body);
                        const insertId = await db.post(postId, currentId, contents);
                        await addPoint(currentId, Point.comment);
                        const users = new Users();
                        const { rank } = await users.getRank(currentId);
                        body = { commentId: insertId, rank };
                    } else {
                        statusCode = 400;
                        body = "로그인되지 않은 사용자입니다."
                    }
                    break;
            }
        }
            break;
        case '/posts/{postId}/comments/{commentId}': {
            const db = new Comments();
            const commentId = Number(event.pathParameters.commentId);
            const response = isIdentical(currentId, (await db.getUserName(commentId)));
            if (!response.error) {
                switch (method) {
                    case 'PATCH':
                        const { contents } = JSON.parse(event.body)
                        const changedRows = await db.patch(commentId, contents)
                        body = changedRows;
                        break;
                    case 'DELETE':
                        const affectedRows = await db.delete(commentId);
                        await subtractPoint(currentId, Point.comment);
                        body = affectedRows;
                        break;
                }
            } else {
                statusCode = 400;
                body = response.message;
            }
        }
            break;
        case '/posts/{postId}/recommend': {
            switch (method) {
                case 'PATCH':
                    if (logedIn) {
                        const db = new Posts();
                        const postId = Number(event.pathParameters.postId);
                        const userName = await db.getUserName(postId);
                        await db.updateRecommends(postId, currentId);
                        await addPoint(currentId, Point.recommend);
                        await addPoint(userName, Point.recommended);
                    } else {
                        statusCode = 400;
                        body = "로그인되지 않은 사용자입니다."
                    }
                    break;
            }
        }
            break;
        case '/search': {
            const db = new Posts();
            switch (method) {
                case 'GET':
                    const category: string = event.queryStringParameters.category;
                    const title: string = event.queryStringParameters.title;
                    const text: (string | undefined) = event.queryStringParameters.text;
                    const index = Number(event.queryStringParameters.index);
                    const posts = await db.search(category, index, title, text);
                    const count = await db.getCountBySearch(category, title, text);
                    body = { posts, count };
                    break;
            }
        }
            break;
    }
    const response = {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
    return response;
};