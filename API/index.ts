import { LottoNumber } from "./interface/Lotto";
import { StatsMethod, QueryStatsParams } from "./interface/LottoDB";
import verify from "./auth";
import { Response } from "./class";
import {getCurrentRound, isIdentical} from "./funtions";

import { getPlan, Plan } from "./dynamoDB/userInfo";
import { queryStats, queryLotto } from "./dynamoDB/lottoData";

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
    }
    const response = {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
    return response;
};