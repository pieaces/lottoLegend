import { LottoNumber } from "./interface/Lotto";
import { StatsMethod, QueryStatsParams } from "./interface/LottoDB";
import verify from "./auth";
import { Response } from "./class";
import {getCurrentRound, isIdentical} from "./funtions";

import Posts from "./mariaDB/Posts";
import Comments from "./mariaDB/Comments";
import { getPlan, Plan } from "./dynamoDB/userInfo";
import { queryStats, queryLotto } from "./dynamoDB/lottoData";
import { updateNumbers, getNumbersByClass, deleteNumsArr, getIncOrExcNumbers, getNumbersByRound, updateIncOrExcNumbers, IncOrExc } from './dynamoDB/myNumbers'

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
        case '/stats/mass/{method}': {
            const method = event.pathParameters.method;
            let data;
            if (method === "excludeInclude") {
                let temp: any = {};
                temp.emergence = await queryStats("emergence" as StatsMethod, {});
                temp.interval = await queryStats("interval" as StatsMethod, {});
                temp.howLongNone = await queryStats("howLongNone" as StatsMethod, {});
                temp.frequency = await queryStats("frequency" as StatsMethod, {});

                data = temp;
                let round = getCurrentRound();
                let total: number = 0;

                const winNums: LottoNumber[][] = [];
                while (winNums.length !== 3) {
                    try {
                        const numbers = await queryLotto(round);
                        winNums.push(numbers);
                        if (total === 0) total = round;
                    } catch (err) {
                        console.log(err);
                    } finally {
                        round--;
                    }
                }
                body = { data, total, winNums };
            } else if (method in StatsMethod) {
                const plan = await getPlan(currentId);
                if (plan !== Plan.premium && plan !== Plan.premiumplus) {
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify(new Response(true, 'Not Premium'))
                    }
                }
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
                body = 'wrong method';
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
                    } else {
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
        case '/numbers/mass': {
            if (logedIn) {
                switch (method) {
                    case 'GET': {
                        const round = event.queryStringParameters.round;
                        const tool = event.queryStringParameters.tool;
                        const selectMethod = event.queryStringParameters.method;
                        if (!tool) {
                            body = await getNumbersByRound(currentId, round);
                        } else {
                            if (selectMethod) {
                                const { numsArr } = await getNumbersByClass(currentId, round, { tool, method: selectMethod });
                                body = numsArr;
                            } else {
                                body = await getNumbersByClass(currentId, round, { tool, method: selectMethod });
                            }
                        }
                    }
                        break;
                    case 'POST':
                        const { numsArr, tool } = JSON.parse(event.body)
                        body = await updateNumbers(currentId, getCurrentRound(), numsArr, tool);
                        break;
                }
            } else {
                statusCode = 400;
                body = "로그인되지 않은 사용자입니다."
            }
        }
            break;
        case '/numbers/mass/{index}': {
            const index = event.pathParameters.index;
            if (logedIn) {
                switch (method) {
                    case 'DELETE':
                        const { selectMethod, tool } = JSON.parse(event.body)
                        await deleteNumsArr(currentId, getCurrentRound(), { tool, method: selectMethod }, index);
                        break;
                }
            } else {
                statusCode = 400;
                body = "로그인되지 않은 사용자입니다."
            }
        }
            break;
        case '/numbers/piece': {
            switch (method) {
                case 'GET': {
                    const userName = event.queryStringParameters && event.queryStringParameters.userName || currentId;
                    const round = event.queryStringParameters && event.queryStringParameters.round || getCurrentRound();
                    const choice = event.queryStringParameters && event.queryStringParameters.choice;
                    if (choice) {
                        const numbers = await getIncOrExcNumbers(userName, round, choice);
                        body = numbers;
                    } else {
                        const include = await getIncOrExcNumbers(userName, round, IncOrExc.include);
                        const exclude = await getIncOrExcNumbers(userName, round, IncOrExc.exclude);
                        body = { include, exclude };
                    }
                }
                    break;
                case 'POST':
                    if (logedIn) {
                        const { numbers, choice } = JSON.parse(event.body);
                        await updateIncOrExcNumbers(currentId, getCurrentRound(), numbers.sort((a:number,b:number) => a-b), choice);
                        break;
                    } else {
                        statusCode = 400;
                        body = "로그인되지 않은 사용자입니다."
                    }
                    break;
                /*
            case 'DELETE':
                await deleteNumbers(userName, round, choice);
                break;
                */
            }
            break;
        }
    }
    const response = {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
    return response;
};