import Posts from "./mariaDB/Posts";
import Comments from "./mariaDB/Comments";
import { updateNumbers, getNumbers, deleteNumber } from './dynamoDB/myNumbers'
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { Response } from "./class";
const pem = jwkToPem({
    "alg": "RS256",
    "e": "AQAB",
    "kid": "mv27gjWoWPX6h3VfMR2y2WsKGIAwdQ9jXRgn4cnMrYo=",
    "kty": "RSA",
    "n": "lqR6rfxpx4fNjalDjNrG1qQCo0sd7uLgIEwCRqg7bgvY6mbKPFhY0EbQGmgKl8-_p1Zx48r4XJ5zeKmbcpBBHrY57fQOsZGQonXSFH4FQDRMVMFVHwExokvGLnk83mJpuHikO1b-IMmsUlRwm6NE_Jgu7Yg4ErHPNcx3kBYfFjHO7h0J3jZ6HM_5uW8QPLh9Mvt_ZDxr37ElctecSXiWoKr7ySbsTt_W5qFxMHLkd9mwVO_CC3k5pBpLXsn5VKRAiM51X_aaQ1MMGTZ4f-0KFZr3jChn7-7BKouJoGO43x1FdkexdiBjRIWGzTszFXeziTNFY1R9uTtzrFdgeqMJ3w",
    "use": "sig"
});

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
function isIdentical(currentId: string, writerId: string): Response {
    if (currentId === writerId) {
        return new Response(false);
    } else {
        return new Response(true, '작성자가 아닙니다.');
    }
}
exports.handler = async (event: any, context: any, callback: any) => {
    console.log(event);
    const method: string = event.httpMethod;
    const resource: string = event.resource;
    let logedIn: boolean = false;

    let currentId: string, currentName: string;
    if (event.headers['x-id-token']) {
        jwt.verify(event.headers['x-id-token'], pem, { algorithms: ['RS256'] }, (err, decodedToken) => {
            if (err) {
                console.log('Intruder Alert!', err);
                const response = {
                    statusCode: 400,
                    headers,
                };
                return response;
            }
            logedIn = true;
            const userInfo = decodedToken as { 'cognito:username': string, nickname: string };
            currentId = userInfo["cognito:username"];
            currentName = userInfo.nickname;
        });
    }

    let statusCode: number = 200;
    let body: any;
    switch (resource) {
        case '/posts': {
            const db = new Posts();
            switch (method) {
                case 'GET':
                    const category:string = event.queryStringParameters.category;
                    const posts = await db.scan(category);
                    const count = await db.getCount();
                    body = {posts, count};
                    break;
                case 'POST':
                    if (logedIn) {
                        const { title, contents } = JSON.parse(event.body);
                        const insertId = await db.post(title, currentId, currentName, contents);
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
            const postId = event.pathParameters.postId;
            switch (method) {
                case 'GET':
                    await db.addHits(postId);    
                    const post = await db.get(postId);
                    body = post;
                    break;
                case 'PATCH': {
                    const response = isIdentical(currentId, (await db.getWriterId(postId)));
                    if (!response.error) {
                        const { contents } = JSON.parse(event.body)
                        const changedRows = await db.patch(postId, contents)
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
            const postId = event.pathParameters.postId;
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
            const commentId = event.pathParameters.commentId;
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
        case '/users/{userName}numbers/{round}': {
            const userName = event.pathParameters.userName;
            const round = event.pathParameters.round;
            if (logedIn) {
                const response = isIdentical(currentId, userName);
                if (!response.error) {
                    switch (method) {
                        case 'GET': {
                            const { numsArr } = await getNumbers(userName, round);
                            body = numsArr;
                        }
                            break;
                        case 'PATCH': {
                            const { numsArr } = JSON.parse(event.body)
                            body = await updateNumbers(userName, round, numsArr)
                        }
                            break;
                        case 'DELETE':
                            const index = Number(event.queryStringParameters && event.queryStringParameters.index);
                            await deleteNumber(userName, round, index);
                            break;
                    }
                } else {
                    statusCode = 400;
                    body = response.message;
                }
            } else {
                statusCode = 400;
                body = "로그인되지 않은 사용자입니다."
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