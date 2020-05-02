import verify from "./auth";
import { getCurrentRound, isIdentical } from "./funtions";
import Posts, { SearchType, Category } from "./mariaDB/Posts";
import Comments from "./mariaDB/Comments";
import { getIncOrExcNumbers, getLotto } from './dynamoDB/myNumbers'
import { doesRecommend } from "./dynamoDB/recommend";
import { addPoint, Point, subtractPoint, getRank, getMainUserInfo } from "./dynamoDB/userInfo";
import Users from "./mariaDB/Users";
import Response from "./Response";
import publish from "./sns";

const headers: any = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Max-Age":3600,
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Cache-Control": "max-age=1"

}
exports.handler = async (event: any) => {
    if (event['detail-type'] === 'Scheduled Event') {
        return console.log('Scheduled Event');
    }
    console.log(event);

    const method: string = event.httpMethod;
    const resource: string = event.resource;

    let currentId: string = null;
    if (event.headers['x-id-token']) {
        try {
            const userInfo = verify(event.headers['x-id-token']);
            currentId = userInfo["cognito:username"];
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
                    const category: Category = event.queryStringParameters.category;
                    const index: number = Number(event.queryStringParameters.index);
                    const posts = await db.scan(category, index, currentId);
                    const count = await db.getCount(category);
                    body = { posts, count };
                    if(category === 'pro') body.rank = currentId && await getRank(currentId);
                    break;
                case 'POST':
                    if (currentId) {
                        const { category, title, contents } = JSON.parse(event.body);
                        if(category === 'notice' && currentId !== 'lottoend'){
                            console.log('Intruder Alert! - You are not the Manager!');
                            return{
                                statusCode:400,
                                headers,
                            }
                        }else if(category === 'pro' && Number(await (new Users().getRank(currentId))) > 3 ){
                            console.log('Intruder Alert! - You are not the 1,2,3 rank!');
                            return{
                                statusCode:400,
                                headers,
                            }
                        }else if(category === 'qna'){
                            await publish('qna 작성됨', '+821093152042');
                        }
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
                    let currentRank;
                    if (!flag) {
                        await db.addHits(postId);
                        const post = await db.get(postId);
                        if (post.category === "include" || post.category === 'exclude') {
                            post.round = getCurrentRound(post.created) + 1;
                            post.numbers = await getIncOrExcNumbers(post.userName, post.round, post.category);
                            post.answer = await getLotto(post.round - 1);
                        } else if (post.category === "qna") {
                            if (currentId !== post.userName && currentId !== 'lottoend') {
                                return {
                                    statusCode: 200,
                                    headers,
                                    body: JSON.stringify(new Response(true, "본인이 아닙니다"))
                                }
                            }
                        }
                        else if(post.category === 'pro') currentRank = currentId && await getRank(currentId);
                        body = post;
                        body.recommend = await doesRecommend(postId, currentId);
                        currentRank && (body.user = currentRank);
                    } else {
                        const post = await db.getTitleContents(postId);
                        body = post;
                    }
                    headers["Cache-Control"] = "max-age=3600";
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
                    headers["Cache-Control"] = "max-age=60";
                    break;
                case 'POST':
                    if (currentId) {
                        const { contents } = JSON.parse(event.body);
                        const insertId = await db.post(postId, currentId, contents);
                        await addPoint(currentId, Point.comment);
                        const users = new Users();
                        const rank = await users.getRank(currentId);
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
            const postId = Number(event.pathParameters.postId);
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
                        const affectedRows = await db.delete(postId, commentId);
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
                    if (currentId) {
                        const db = new Posts();
                        const postId = Number(event.pathParameters.postId);
                        const userName = await db.getUserName(postId);
                        await db.updateRecommends(postId, currentId);
                        await addPoint(userName, Point.recommended);
                    } else {
                        statusCode = 400;
                        body = "로그인되지 않은 사용자입니다."
                    }
                    break;
            }
        }
            break;
        case '/posts/search': {
            const db = new Posts();
            switch (method) {
                case 'GET':
                    const category: string = event.queryStringParameters.category;
                    const word: string = event.queryStringParameters.word;
                    const type: string = event.queryStringParameters.type;
                    const index = Number(event.queryStringParameters.index);

                    const posts = await db.search(category, word, type as SearchType, index);
                    const count = await db.getCountBySearch(category, word, type as SearchType);
                    body = { posts, count };
                    headers["Cache-Control"] = "max-age=30";
                    break;
            }
        }
            break;
        case '/main/posts': {
            const db = new Posts();
            switch (method) {
                case 'GET':
                    const categories: Category[] = ['pro', 'analysis', 'include', 'exclude', 'free', 'notice'];
                    body = {};
                    for (let i = 0; i < categories.length; i++) body[categories[i]] = await db.mainBoard(categories[i]);
                    const winPosts = await db.mainWin();
                    body.win = winPosts.map((post, index) => {
                        const _img = post.contents.match(/<img src="\S+"/);
                        const img = _img && _img[0].slice(10, -1);
                        return {
                            id: winPosts[index].id,
                            title: winPosts[index].title,
                            created:winPosts[index].created,
                            img
                        }
                    });
                    if(currentId) {
                        body.user = await getMainUserInfo(currentId);
                    }
                    headers["Cache-Control"] = "max-age=1";
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