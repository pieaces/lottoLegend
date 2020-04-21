import dynamoDB from '.'
import { AWSError } from 'aws-sdk/lib/error';
import { GetItemOutput, GetItemInput, UpdateItemInput, ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { parsePlanKeyAndUntil, getCurrentRound } from '../funtions';
import { NSToNumbers } from './Numbers/functions';
import { MyNumberData } from './Numbers';

export enum Plan {
    "default" = "a",
    "basic" = "b",
    "premium" = "c",
    "premium+" = "d"
}
const ExpressionAttributeNames = {
    "#Plan": 'Plan',
    '#Until': 'Until'
};

export function getPlan(userName: string): Promise<Plan> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ProjectionExpression: '#Plan, #Until',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            else {
                const item = data.Item;
                let plan: Plan = Plan.default;
                if ('Plan' in item && 'Until' in item) {
                    const _plan = item.Plan.S;
                    const now = Number(new Date());
                    const until = Number(new Date(item.Until.S));
                    if (now <= until) {
                        switch (_plan) {
                            case Plan.basic:
                                plan = Plan.basic;
                                //availability = planValues[Plan.basic];
                                break;
                            case Plan.premium:
                                plan = Plan.premium;
                                //availability = planValues[Plan.premium];
                                break;
                            case Plan['premium+']:
                                plan = Plan['premium+']
                        }
                    }
                }
                resolve(plan);
            }
        });
    });
}
export function expirePlan(userName: string): Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ExpressionAttributeValues: {
            ':value': {
                S: Plan.default
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Plan = :value Remove #Until`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}

interface MyPage {
    include?: { current?: number[], before?: number[] },
    exclude?: { current?: number[], before?: number[] },
    numsArr?: MyNumberData[],
    beforeNumbers?: MyNumberData[],
    point?: number,
    rank?: number,
    plan?: string,
    until?: string,
    winner?: number,
    day?: number,
    total?: number
}
export function getMyHome(userName: string): Promise<MyPage> {
    const round = getCurrentRound() + 1;
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Numbers": 'Numbers',
            "#IncExc": 'IncludeExclude',
            "#Current": round.toString(),
            "#Before": (round - 1).toString(),
            "#Plan": "Plan",
            "#Until": "Until",
            "#Point": "Point",
            "#Rank": "Rank",
            "#Day": 'Day'
        },
        ProjectionExpression: '#Numbers.#Current, #Numbers.#Before, #IncExc.#Current, #IncExc.#Before, #Plan, #Until, #Point, #Rank, #Day',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            else {
                const result: MyPage = {};

                const beforeNumbers = data.Item.Numbers && data.Item.Numbers.M[round-1] && data.Item.Numbers.M[round-1].L;
                const numbersData = data.Item.Numbers && data.Item.Numbers.M[round] && data.Item.Numbers.M[round].L;
                result.beforeNumbers = beforeNumbers && beforeNumbers.map(item => {
                    return {
                        numbers: NSToNumbers(item.M.numbers.NS).sort((a, b) => a - b),
                        date: item.M.date.S,
                        method: item.M.method.S,
                        tool: item.M.tool.S,
                    }
                });
                result.numsArr = numbersData && numbersData.map(item => {
                    return {
                        numbers: NSToNumbers(item.M.numbers.NS).sort((a, b) => a - b),
                        date: item.M.date.S,
                        method: item.M.method.S,
                        tool: item.M.tool.S,
                    }
                });

                if ('IncludeExclude' in data.Item) {
                    const include: { current?: number[], before?: number[] } = {};
                    const exclude: { current?: number[], before?: number[] } = {};

                    if (data.Item.IncludeExclude.M[round]) {
                        const current = data.Item.IncludeExclude.M[round].M;
                        if (current) {
                            include.current = current.include && current.include.NS.map(item => Number(item)).sort((a,b)=>a-b);
                            exclude.current = current.exclude && current.exclude.NS.map(item => Number(item)).sort((a,b)=>a-b);
                        }
                    }
                    if (data.Item.IncludeExclude.M[round - 1]) {
                        const before = data.Item.IncludeExclude.M[round - 1].M;
                        if (before) {
                            include.before = before.include && before.include.NS.map(item => Number(item)).sort((a,b)=>a-b);
                            exclude.before = before.exclude && before.exclude.NS.map(item => Number(item)).sort((a,b)=>a-b);
                        }
                    }
                    result.include = include;
                    result.exclude = exclude;
                }
                const { plan, until } = parsePlanKeyAndUntil(data.Item);
                result.plan = plan;
                result.until = until;
                result.point = Number(data.Item.Point.N);
                result.rank = Number(data.Item.Rank.N);
                result.day = data.Item.Day && Number(data.Item.Day.N);
                result.total = round;
                resolve(result);
            }
        });
    });
}