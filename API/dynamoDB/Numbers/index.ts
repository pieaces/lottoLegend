import dynamoDB from '..'
import { Plan, getPlan } from '../userInfo';
import { Response } from '../../Response';
import { numsArrToAWSMapList, NSToNumbers, numbersToNS } from './functions';
import { AWSError } from 'aws-sdk/lib/error';
import { UpdateItemInput, GetItemOutput, GetItemInput, ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';

export enum SelectTool {
    "free" = 'a',
    "charge" = 'b'
}
export enum SelectMethod {
    "auto" = 'a',
    "manual" = 'm'
}
interface SelectClass {
    tool?: SelectTool;
    method?: SelectMethod;
}

const planLimit = {
    [Plan.default]: 5,
    [Plan.basic]: 10,
    [Plan.premium]: 20,
    [Plan['premium+']]: 40
}

export async function autoUpdateNumbers(userName: string, round: number, numsArr: number[][], tool: SelectTool): Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'Numbers',
            "#Round": round.toString(),
        },
        ExpressionAttributeValues: {
            ":empty_list": {
                L: new Array()
            },
            ":element": {
                L: numsArrToAWSMapList(numsArr, SelectMethod.auto, tool)
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Map.#Round = list_append(if_not_exists(#Map.#Round, :empty_list), :element)`
    };
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err: AWSError) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export async function updateNumbers(userName: string, round: number, numsArr: number[][], tool: SelectTool): Promise<Response> {
    const plan: Plan = await getPlan(userName);
    const size = (await getNumberSize(userName, round));
    const available = planLimit[plan] - size;

    if (numsArr.length > available) {
        return new Response(true, `현재 가입하신 서비스의 가용공간은 총 ${planLimit[plan]}개입니다.<br>사용중인 공간은 ${size}개이고, 남은 공간은 ${available}개입니다.`);
    }
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'Numbers',
            "#Round": round.toString(),
        },
        ExpressionAttributeValues: {
            ":empty_list": {
                L: new Array()
            },
            ":element": {
                L: numsArrToAWSMapList(numsArr, SelectMethod.manual, tool)
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Map.#Round = list_append(if_not_exists(#Map.#Round, :empty_list), :element)`
    };
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err: AWSError) => {
            if (err) {
                reject(err);
            } else {
                resolve(new Response(false));
            }
        });
    });
}

export async function deleteMyNumber(userName: string, round: number, numsArr: number[][]): Promise<void> {
    const data = (await getNumbers(userName, round))[round.toString()].map(item => item.numbers);
    const indexes: number[] = [];
    const jsonNumsArr = numsArr.map(numbers => JSON.stringify(numbers));

    for (let i = 0; i < data.length; i++) {
        if (jsonNumsArr.some(item => JSON.stringify(data[i]) === item)) {
            indexes.push(i);
        }
    }
    if (indexes.length > 0) {
        let UpdateExpression = "Remove ";
        UpdateExpression += indexes.map(index => `#Map.#Round[${index}]`).join(',');

        const params: UpdateItemInput = {
            TableName: 'LottoUsers',
            ExpressionAttributeNames: {
                "#Map": 'Numbers',
                "#Round": round.toString(),
            },
            Key: {
                "UserName": {
                    S: userName
                }
            },
            UpdateExpression
        };
        return new Promise((resolve, reject) => {
            dynamoDB.updateItem(params, (err: AWSError) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}


export function getNumberSize(userName: string, round: number): Promise<number> {
    return new Promise((resolve, reject) => {
        dynamoDB.getItem({
            TableName: 'LottoUsers',
            ExpressionAttributeNames: {
                "#Map": 'Numbers',
                "#Round": round.toString(),
            },
            ProjectionExpression: '#Map.#Round',
            Key: {
                "UserName": {
                    S: userName
                }
            }
        }, (err: AWSError, data: GetItemOutput) => {
            if (err) reject(err);
            const item = data.Item;
            if ('Numbers' in item) resolve(item.Numbers.M[round.toString()].L.length);
            else resolve(0);
        })
    })
}

export interface MyNumberData {
    numbers: number[];
    method: string;
    tool: string;
    date: string;
}

export function getNumbers(userName: string, round?: number, select?: SelectClass): Promise<{ [round: string]: MyNumberData[] }> {
    const ExpressionAttributeNames: { [key: string]: string } = {
        "#Map": 'Numbers'
    }
    let ProjectionExpression = '#Map';
    if (round) {
        ExpressionAttributeNames["#Round"] = round.toString();
        ProjectionExpression += '.#Round';
    }

    const params = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ProjectionExpression,
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
                if (round && 'Numbers' in data.Item) {
                    const numbersData = data.Item.Numbers.M[round.toString()].L;
                    const result = numbersData.filter(item => {
                        if (select) {
                            if (select.method && item.M.method.S !== select.method) {
                                return false;
                            }
                            if (select.tool && item.M.tool.S !== select.tool) {
                                return false;
                            }
                            return true;
                        } else {
                            return true;
                        }
                    }).map(item => {
                        return {
                            numbers: NSToNumbers(item.M.numbers.NS).sort((a, b) => a - b),
                            date: item.M.date.S,
                            method: item.M.method.S,
                            tool: item.M.tool.S,
                        }
                    });
                    resolve({ [round.toString()]: result });
                } else if (!round && 'Numbers' in data.Item) {
                    const result: { [round: string]: MyNumberData[] } = {}
                    for (const key in data.Item.Numbers.M) {
                        if (data.Item.Numbers.M[key].L.length > 0) {
                            result[key] = data.Item.Numbers.M[key].L.filter(item => {
                                if (select) {
                                    if (select.method && item.M.method.S !== select.method) {
                                        return false;
                                    }
                                    if (select.tool && item.M.tool.S !== select.tool) {
                                        return false;
                                    }
                                    return true;
                                } else return true;
                            }).map(item => {
                                return {
                                    numbers: NSToNumbers(item.M.numbers.NS).sort((a, b) => a - b),
                                    date: item.M.date.S,
                                    method: item.M.method.S,
                                    tool: item.M.tool.S,
                                }
                            });
                        }
                    }
                    resolve(result);
                } else resolve({});
            }
        });
    });
}

type IncOrExc = "include" | "exclude"
export async function updateIncOrExcNumbers(userName: string, round: number, numbers: number[], choice: IncOrExc): Promise<Response> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'IncludeExclude',
            "#Choice": choice,
            "#Round": round.toString(),
        },
        ExpressionAttributeValues: {
            ":element": {
                NS: numbersToNS(numbers)
            }
        },
        ConditionExpression: 'attribute_exists(#Map.#Round)',
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Map.#Round.#Choice = :element`
    };
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err: AWSError) => {
            if (err) {
                if (err.code === 'ConditionalCheckFailedException') {
                    await createIncOrExcNumbers(userName, round);
                    resolve(await updateIncOrExcNumbers(userName, round, numbers, choice));
                } else reject(err);
            } else {
                resolve(new Response(false));
            }
        });
    });
}
export function deleteIncOrExcNumbers(userName: string, round: number, choice: IncOrExc): Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'IncludeExclude',
            "#Round": round.toString(),
            "#Choice": choice,
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: 'Remove #Map.#Round.#Choice'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

async function createIncOrExcNumbers(userName: string, round: number): Promise<Response> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'IncludeExclude',
            "#Round": round.toString(),
        },
        ExpressionAttributeValues: {
            ":empty_map": {
                M: {
                }
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        ConditionExpression: 'attribute_not_exists(#Map.#Round)',
        UpdateExpression: `SET #Map.#Round = :empty_map`
    };
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err: AWSError) => {
            if (err) {
                reject(err);
            } else {
                resolve(new Response(false));
            }
        });
    });
}

export function getIncOrExcNumbers(userName: string, round: number, choice: IncOrExc): Promise<number[]> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'IncludeExclude',
            "#Choice": choice,
            "#Round": round.toString()
        },
        ProjectionExpression: '#Map.#Round.#Choice',
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
                if ('IncludeExclude' in item) {
                    resolve(item.IncludeExclude.M[round].M[choice].NS.map(item => Number(item)).sort((a,b) => a-b));
                } else resolve([]);
            }
        });
    });
}
export function getIncAndExcNumbers(userName: string, round: number): Promise<{ include?: number[], exclude?: number[] }> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'IncludeExclude',
            "#Round": round.toString()
        },
        ProjectionExpression: '#Map.#Round',
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
                if ('IncludeExclude' in item) {
                    const joint = item.IncludeExclude.M[round].M;
                    const include = joint.include && joint.include.NS.map(item => Number(item)).sort((a, b) => a - b);
                    const exclude = joint.exclude && joint.exclude.NS.map(item => Number(item)).sort((a, b) => a - b);

                    resolve({ include, exclude });
                } else resolve({});
            }
        });
    });
}

export function getIncOrExcRounds(userName: string): Promise<string[]> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'IncludeExclude',
        },
        ProjectionExpression: '#Map',
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
                const rounds = Object.keys(data.Item.IncludeExclude.M).reverse();
                resolve(rounds);
            }
        });
    });
}

export function scanWeekNumbers(round?: number): Promise<{ data: { round: number, week: number[], numbers?: number[] }[], rounds?:number[] }> {
    const params: ScanInput = {
        TableName: 'LottoData',
        ExpressionAttributeNames: {
            "#Round": 'Round',
            "#Week": 'Week',
            "#Numbers": 'Numbers'
        },
        ProjectionExpression: '#Round, #Week, #Numbers',
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) {
                reject(err);
            }
            const filteredData = data.Items.filter(item => {
                return 'Week' in item && (!round || Number(item.Round.N) <= round)
            });

            resolve({
                data: filteredData
                    .sort((a, b) => Number(b.Round.N) - Number(a.Round.N))
                    .slice(0, 5)
                    .map(item => {
                        return {
                            round: Number(item.Round.N),
                            week: item.Week.NS.map(num => Number(num)).sort((a, b) => a - b),
                            numbers: item.Numbers && item.Numbers.NS.map(num => Number(num))
                        }
                    }),
                rounds: !round && filteredData.map(item => Number(item.Round.N))
            })
        });
    });
}