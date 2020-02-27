import { dynamoDB, TableName } from '.'
import { getRank, Plan } from './userInfo';
import { Response } from '../class';

enum Way {
    "auto" = 'a',
    "manual" = 'm',
}
const planValue = {
    [Plan.default]:5,
    [Plan.basic]:10,
    [Plan.premium]:20
}
function numsArrToAWSList(numsArr: number[][]): any {
    return numsArr.map(numbers => {
        return {
            L: numbers.map(num => { return { N: num.toString() } })
        }
    });
}
function numbersToAWSList(numbers: number[]): any{
    return numbers.map(num =>{
        return {
            N: num.toString()
        }
    });
}
export async function autoUpdateNumbers(userName: string, round: number, numsArr: number[][]): Promise<void> {
    const rank = await getRank(userName);
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
            "#Numbers": 'numbers',
            "#Class": rank + Way.auto,
            "#Size": 'size'
        },
        ExpressionAttributeValues: {
            ":element": {
                L: numsArrToAWSList(numsArr)
            },
            ':plus': {
                N: numsArr.length.toString()
            }
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        ConditionExpression: "attribute_exists(#Map.#Round)",
        UpdateExpression: `SET #Map.#Round.#Class.#Numbers = list_append(#Map.#Round.#Class.#Numbers, :element) ADD #Map.#Round.#Class.#Size :plus`
    };
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err: any) => {
            if (err) {
                await createNumbers(userName, round);
                await autoUpdateNumbers(userName, round, numsArr);
            } else {
                resolve();
            }
        });
    });
}

export async function updateNumbers(userName: string, round: number, numsArr: number[][], plan:Plan, way: Way): Promise<Response> {
    let size: number;
    try {
        size = (await getNumbersByClass(userName, round, plan + way)).size;
    } catch (err) {
        if (err === 'MyNumbers has to be created') {
            await createNumbers(userName, round);
            size = (await getNumbersByClass(userName, round, plan + way)).size;
        }
    }
    if (numsArr.length > planValue[plan] - size) {
        return new Response(true, `이 시스템의 저장 가능한 최대 크기는 ${planValue[plan]}개입니다. 현재 저장가능 개수는 ${planValue[plan] - size}개입니다.`);
    }
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
            "#Numbers": 'numbers',
            "#Class": plan + way,
            "#Size": 'size'
        },
        ExpressionAttributeValues: {
            ":element": {
                L: numsArrToAWSList(numsArr)
            },
            ':plus': {
                N: numsArr.length.toString()
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        ConditionExpression: "attribute_exists(#Map.#Round)",
        UpdateExpression: `SET #Map.#Round.#Class.#Numbers = list_append(#Map.#Round.#Class.#Numbers, :element) ADD #Map.#Round.#Class.#Size :plus`
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

function createNumbers(userName: string, round: number): Promise<void> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
        },
        ExpressionAttributeValues: {
            ':map': {
                M: {
                    [Plan.default + Way.manual]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [Plan.default + Way.auto]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [Plan.basic + Way.auto]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [Plan.premium + Way.manual]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [Plan.premium + Way.auto]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    }
                }
            }
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Map.#Round = if_not_exists(#Map.#Round, :map)`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function deleteNumber(userName: string, round: number, index: number): Promise<void> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
            "#Numbers": 'numbers'
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `REMOVE #Map.#Round.#Numbers[${index}]`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function getNumbersByClass(userName: string, round: number, classification: string): Promise<{ numsArr: number[][], size: number }> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
            "#Class": classification
        },
        ProjectionExpression: '#Map.#Round.#Class',
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
                if ('MyNumbers' in item) {
                    const result = item.MyNumbers.M && item.MyNumbers.M[round.toString()].M[classification].M;
                    const size = Number(result && result.size.N);
                    const numsArr = result && result.numbers.L?.map(obj => {
                        return obj.L?.map(ele => Number(ele.N))
                    });
                    resolve({ numsArr, size });
                } else {
                    reject('MyNumbers has to be created');
                }
            }
        });
    });
}

export function getAllNumbers(userName: string, round: number): Promise<{[key:string]: {numsArr: number[][], size: number} }> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
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
        dynamoDB.getItem(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                const item = data.Item;
                if ('MyNumbers' in item) {
                    const obj = item.MyNumbers.M && item.MyNumbers.M[round.toString()].M;
                    let entries = Object.entries(obj);
                    const result:any = {};
                    entries.forEach(entry =>{
                        result[entry[0]] = {
                            numsArr: entry[1].M.numbers.L.map(item => item.L.map(value => Number(value.N))),
                            size: Number(entry[1].M.size.N)
                        }
                    });
                    resolve(result);
                } else {
                    reject('MyNumbers has to be created');
                }
            }
        });
    });
}

enum IncOrExc{
    "include"="IncludedNumbers",
    "exclude"="ExcludedNumbers"
}

export async function updateIncOrExcNumbers(userName: string, round: number, numbers: number[], choice:IncOrExc): Promise<Response> {
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