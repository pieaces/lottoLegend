import verify from "./auth";
import { getCurrentRound, isIdentical } from "./funtions";

import Posts from "./mariaDB/Posts";
import Comments from "./mariaDB/Comments";
import { getIncOrExcNumbers, IncOrExc } from './dynamoDB/myNumbers'
import { getRecommendUsers } from "./dynamoDB/recommend";
import { getRank } from "./dynamoDB/userInfo";

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
exports.handler = async (event: any) => {
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
                        const insertId = await db.post(category, title, currentId, currentName, contents);
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
                            post.incl = await getIncOrExcNumbers(post.writerId, getCurrentRound(post.created), IncOrExc.include);
                        }
                        else if (post.category === "excl") {
                            post.excl = await getIncOrExcNumbers(post.writerId, getCurrentRound(post.created), IncOrExc.exclude);
                        }
                        body = post;
                    } else {
                        const post = await db.getTitleContents(postId);
                        body = post;
                    }
                    body.recommend = (await getRecommendUsers(postId)).indexOf(currentId) !== -1;
                    body.rank = (await getRank(body.writerId));
                    break;
                case 'PATCH': {
                    const response = isIdentical(currentId, (await db.getWriterId(postId)));
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
                    const response = isIdentical(currentId, (await db.getWriterId(postId)));
                    if (!response.error) {
                        const affectedRows = await db.delete(postId);
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
                        const insertId = await db.post(postId, currentId, currentName, contents);
                        body = insertId;
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
            const response = isIdentical(currentId, (await db.getWriterId(commentId)));
            if (!response.error) {
                switch (method) {
                    case 'PATCH':
                        const { contents } = JSON.parse(event.body)
                        const changedRows = await db.patch(commentId, contents)
                        body = changedRows;
                        break;
                    case 'DELETE':
                        const affectedRows = await db.delete(commentId);
                        body = affectedRows;
                        break;
                }
            } else {
                statusCode = 400;
                body = response.message;
            }
        }
            break;
        case 'posts/{postId}recommend': {
            switch (method) {
                case 'PATCH':
                    if (logedIn) {
                        const db = new Posts();
                        const postId = Number(event.pathParameters.postId);
                        await db.updateRecommends(postId, currentId);
                    } else {
                        statusCode = 400;
                        body = "로그인되지 않은 사용자입니다."
                    }
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