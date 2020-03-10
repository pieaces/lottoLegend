import { dynamoDB, TableName } from '..'
import { Plan, getPlan } from '../userInfo';
import { Response } from '../../Response';
import { numsArrToAWSMapList, AWSListToNumbers, numbersToAWSList } from './functions';

export enum SelectTool{
    "free" = 'a',
    "charge" = 'b'
}
export enum SelectMethod {
    "auto" = 'a',
    "manual" = 'm'
}
interface SelectClass{
    tool?:SelectTool;
    method?:SelectMethod;
}

const planLimit = {
    [Plan.default]: 5,
    [Plan.basic]: 10,
    [Plan.premium]: 20,
    [Plan.premiumplus]: 40
}

export async function autoUpdateNumbers(userName: string, round: number, numsArr: number[][], tool: SelectTool): Promise<void> {
    const params = {
        TableName,
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
        dynamoDB.updateItem(params, async (err) => {
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
    const params = {
        TableName,
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
        dynamoDB.updateItem(params, async (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(new Response(false));
            }
        });
    });
}

export async function deleteMyNumber(userName: string, round: number, numbers:number[]): Promise<void> {
    const data = (await getNumbers(userName, round)).map(item => item.numbers);
    let index:number;
    for(let i =0; i<data.length; i++){
        if(JSON.stringify(data[i]) === JSON.stringify(numbers)){
            index = i;
            break;
        }
    }
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'Numbers',
            "#Round": round.toString(),
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `REMOVE #Map.#Round[${index}]`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}
export function getNumberSize(userName: string, round: number): Promise<number>{
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
        }, (err, data) => {
            if(err) reject(err);
            const item = data.Item;
            if('Numbers' in item) resolve(item.Numbers.M[round.toString()].L.length);
            else resolve(0);
        })
    })
}
export function getNumbers(userName: string, round: number, select?:SelectClass): Promise<{numbers:number[], method:string, tool:string, date:string}[]> {
    const ExpressionAttributeNames: { [key: string]: string } = {
        "#Map": 'Numbers',
        "#Round": round.toString(),
    }
    let ProjectionExpression = '#Map.#Round';

    const params = {
        TableName,
        ExpressionAttributeNames,
        ProjectionExpression,
        Key: {
            "UserName": {
                S: userName
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                if ('Numbers' in data.Item) {
                    const numbersData = data.Item.Numbers.M[round.toString()].L;
                    resolve(numbersData.filter(item => {
                        if (select) {
                            if (select.method && item.M.method.S !== select.method) {
                                return false;
                            }
                            if (select.tool && item.M.tool.S !== select.tool) {
                                return false;
                            }
                            return true;
                        } else return true;
                    }).map((item, index) => {
                        return {
                            numbers: AWSListToNumbers(item.M.numbers.L),
                            date: item.M.date.S,
                            method: item.M.method.S,
                            tool: item.M.tool.S,
                        }
                    }));
                }else resolve([]);
            }
        });
    });
}


export enum IncOrExc {
    "include" = "Include",
    "exclude" = "Exclude"
}
export async function updateIncOrExcNumbers(userName: string, round: number, numbers: number[], choice: IncOrExc): Promise<Response> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Choice": choice,
            "#Round": round.toString(),
        },
        ExpressionAttributeValues: {
            ":element": {
                L: numbersToAWSList(numbers)
            }
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Choice.#Round = :element`
    };
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(new Response(false));
            }
        });
    });
}

export async function deleteNumbers(userName: string, round: number, choice:IncOrExc): Promise<void> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Choice": choice,
            "#Round": round.toString()
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `REMOVE #Choice.#Round`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function getIncOrExcNumbers(userName: string, round: number, choice: IncOrExc): Promise<number[]> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Choice": choice,
            "#Round": round.toString()
        },
        ProjectionExpression: '#Choice.#Round',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                const item = data.Item;
                if (choice in item) {
                    const result = item[choice].M && item[choice].M[round.toString()].L;
                    resolve(result.map(item => Number(item.N)));
                }
                resolve([]);
            }
        });
    });
}