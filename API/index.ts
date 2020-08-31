import { LottoNumber } from "./interface/Lotto";
import { StatsMethod, QueryStatsParams } from "./interface/LottoDB";
import { getCurrentRound } from "./funtions";
import { queryStats, queryLotto, scanLotto } from "./dynamoDB/lottoData";
import { getPlan, Plan } from "./dynamoDB/userInfo";
import verify from "./auth";
import Response from "./Response";

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Max-Age":3600,
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Cache-Control": "max-age=3600"
}
exports.handler = async (event: any) => {
    console.log(event);
    const resource = event.resource;

    let statusCode: number = 200;
    let body: any;

    let currentId: string;
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
    
    const method = event.queryStringParameters.method;
    switch (resource) {
        case '/stats/mass':
            let data: any;

            const ProjectionExpression = `Ideal, Actual, Pos, Stats, #List`;
            const ExpressionAttributeNames = {
                "#List": 'List'
            };
            if (method === "excludeInclude") {
                let temp: any = {};
                temp.emergence = await queryStats("emergence" as StatsMethod, ProjectionExpression, ExpressionAttributeNames);
                temp.interval = await queryStats("interval" as StatsMethod, ProjectionExpression, ExpressionAttributeNames);
                temp.howLongNone = await queryStats("howLongNone" as StatsMethod, ProjectionExpression, ExpressionAttributeNames);
                temp.frequency = await queryStats("frequency" as StatsMethod, ProjectionExpression, ExpressionAttributeNames);

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
            } else if (method === StatsMethod.line){
                data = await queryStats(method as StatsMethod);
                body = data;
            }else if (method in StatsMethod) {
                const temp: QueryStatsParams = {}
                const from = event.queryStringParameters && event.queryStringParameters.from
                const to = event.queryStringParameters && event.queryStringParameters.to;
                const list = event.queryStringParameters && event.queryStringParameters.list
                if ((from && to)) {
                    temp.from = Number(from);
                    temp.to = Number(to);
                } else if (list) {
                    temp.list = JSON.parse(list);
                }
                data = await queryStats(method as StatsMethod, ProjectionExpression, ExpressionAttributeNames, temp);
                body = { data };
            } else {
                return {
                    statusCode: 400,
                    headers
                }
            }
            break;
        case '/stats/piece': {
            let ProjectionExpression: string;
            let ExpressionAttributeNames: any;
            if (method !== StatsMethod.frequency) {
                ProjectionExpression = 'Ideal.#12,Ideal.#24,Ideal.#48,Ideal.#192,Ideal.#all, Ideal.latest12, Actual.#12,Actual.#24,Actual.#48,Actual.#192,Actual.#all,Actual.latest12, Pos, Stats, Piece';
                if(method === StatsMethod.excludedLineCount) ProjectionExpression += ',ExcludedLines';
                ExpressionAttributeNames = { '#12': '$12', '#24': '$24', '#48': '$48', '#192': '$192', '#all': 'all' };
                body = await queryStats(method as StatsMethod,
                    ProjectionExpression,
                    ExpressionAttributeNames);
            }
            else {
                ProjectionExpression = '#List';
                ExpressionAttributeNames = {
                    "#List": 'List'
                };
                const result: any = {};
                result.total = getCurrentRound();
                result.frequency = await queryStats(StatsMethod.frequency,
                    ProjectionExpression,
                    ExpressionAttributeNames);
                result.frequency12 = await queryStats(StatsMethod.frequency12,
                    ProjectionExpression,
                    ExpressionAttributeNames);
                    body = result;
            }

            if (method === StatsMethod.carryCount || method === 'pos$1') {
                body.lottos = await scanLotto(50);
                body.total = getCurrentRound();
            }
        }
    }
    const response = {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
    return response;
};