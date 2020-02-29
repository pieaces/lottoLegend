import Posts from "./mariaDB/Posts";
import Comments from "./mariaDB/Comments";
import { updateNumbers, getNumbersByClass, deleteNumsArr, deleteNumbers, getIncOrExcNumbers, getNumbersByRound, updateIncOrExcNumbers, IncOrExc } from './dynamoDB/myNumbers'
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { Response } from "./class";
import getCurrentRound from "./funtion/getCurrentRound";

import { StatsMethod, QueryStatsParams } from "./interface/LottoDB";
import { queryStats, queryLotto } from "./dynamoDB/lottoData";
import { LottoNumber } from "./interface/Lotto";
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
exports.handler = async (event: any) => {
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
        case '/stats/mass/{method}': {
            const method = event.pathParameters.method;
            let data;
            if (method in StatsMethod) {
                const temp: QueryStatsParams = {}
                const from = event.queryStringParameters && event.queryStringParameters.from
                const to = event.queryStringParameters && event.queryStringParameters.to;
                const list = event.queryStringParameters && event.queryStringParameters.list
                if ((from && to)) {
                    temp.from = Number(from);
                    temp.to = Number(to);
                } else if (list) {
                    temp.list = JSON.parse(decodeURI(list));
                }
                data = await queryStats(method as StatsMethod, temp);
                body = { data };
            } else {
                if (method === "excludeInclude") {
                    let temp: any = {};
                    temp.emergence = await queryStats("emergence" as StatsMethod, {});
                    temp.interval = await queryStats("interval" as StatsMethod, {});
                    temp.howLongNone = await queryStats("howLongNone" as StatsMethod, {});
                    temp.frequency = await queryStats("frequency" as StatsMethod, {});
        
                    data = temp;
                    let round = getCurrentRound(new Date().toString());
                    let total:number = 0;
        
                    const winNums: LottoNumber[][] = [];
                    while (winNums.length !== 3) {
                        try {
                            const numbers = await queryLotto(round);
                            winNums.push(numbers);
                            if(total === 0) total = round;
                        } catch (err) {
                            console.log(err);
                        }finally{
                            round--;
                        }
                    }
                    body = { data, total, winNums};
                }
                else body = 'wrong method';
            }
        }
            break;
        case '/stats/piece/{method}': {
            const method = event.pathParameters.method;
            body = await queryStats(method as StatsMethod, null, 'Ideal.#All, Actual.#All, Pos, Stats, Piece', { "#All": 'all' });
        }
            break;
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
            const postId = event.pathParameters.postId;
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
                    }else{
                        const post = await db.getTitleContents(postId);
                        body = post;
                    }
                    break;
                case 'PATCH': {
                    const response = isIdentical(currentId, (await db.getWriterId(postId)));
                    if (!response.error) {
                        const { title, contents } = JSON.parse(event.body)
                        const changedRows = await db.patch(postId, title, contents)
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
        /*
        rank = default, basic, premium
        method = auto, manual, include, exclude
        numbers/mass|piece/
        */
        case '/users/{userName}/numbers/mass/{round}': {
            const userName = event.pathParameters.userName;
            const round = event.pathParameters.round;
            if (logedIn) {
                const response = isIdentical(currentId, userName);
                if (!response.error) {
                    switch (method) {
                        case 'GET':
                            body = await getNumbersByRound(userName, round);
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
        case '/users/{userName}/numbers/mass/{round}/{rank}':
        case '/users/{userName}/numbers/mass/{round}/{rank}/{method}': {
            const userName = event.pathParameters.userName;
            const round = event.pathParameters.round;
            const rank = event.pathParameters.rank;
            const selectMethod = event.pathParameters.method;
            if (logedIn) {
                const response = isIdentical(currentId, userName);
                if (!response.error) {
                    switch (method) {
                        case 'GET':
                            if (selectMethod) {
                                const { numsArr } = await getNumbersByClass(userName, round, rank, selectMethod);
                                body = numsArr;
                            } else {
                                body = await getNumbersByClass(userName, round, rank);
                            }
                            break;
                        case 'POST':
                            const { numsArr } = JSON.parse(event.body)
                            body = await updateNumbers(userName, round, numsArr, rank, selectMethod);
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
        case '/users/{userName}/numbers/mass/{round}/{rank}/{method}/{index}': {
            const userName = event.pathParameters.userName;
            const round = event.pathParameters.round;
            const rank = event.pathParameters.rank;
            const selectMethod = event.pathParameters.method;
            const index = event.pathParameters.index;
            if (logedIn) {
                const response = isIdentical(currentId, userName);
                if (!response.error) {
                    switch (method) {
                        case 'DELETE':
                            await deleteNumsArr(userName, round, rank, selectMethod, index);
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
        case '/users/{userName}/numbers/piece/{round}/{choice}': {
            const userName = event.pathParameters.userName;
            const round = event.pathParameters.round;
            const choice = event.pathParameters.choice;
            if (logedIn) {
                const response = isIdentical(currentId, userName);
                if (!response.error) {
                    switch (method) {
                        case 'GET': {
                            const numbers = await getIncOrExcNumbers(userName, round, choice);
                            body = numbers;
                        }
                            break;
                        case 'POST': {
                            const { numbers } = JSON.parse(event.body);
                            await updateIncOrExcNumbers(userName, round, numbers, choice);
                        }
                            break;
                        case 'DELETE': {
                            await deleteNumbers(userName, round, choice);
                        }
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