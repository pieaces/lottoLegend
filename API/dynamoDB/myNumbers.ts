import { dynamoDB, TableName } from '.'
import { getRank, Plan } from './userInfo';
import { Response } from '../class';

export enum SelectMethod {
    "auto" = 'a',
    "manual" = 'm'
}
interface NumsArrAllMethodReturn {
    [key: string]: { numsArr: number[][], size: number }
}
interface NumsArrOneMethodReturn { numsArr: number[][], size: number }
const planValue = {
    [Plan.default]: 5,
    [Plan.basic]: 10,
    [Plan.premium]: 20
}
function numsArrToAWSList(numsArr: number[][]): any {
    return numsArr.map(numbers => {
        return {
            L: numbers.map(num => { return { N: num.toString() } })
        }
    });
}
function numbersToAWSList(numbers: number[]): any {
    return numbers.map(num => {
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
            "#Class": rank + SelectMethod.auto,
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

export async function updateNumbers(userName: string, round: number, numsArr: number[][], plan: Plan, method: SelectMethod): Promise<Response> {
    let size: number;
    try {
        size = (await getNumbersByClass(userName, round, plan, method) as NumsArrOneMethodReturn).size;
    } catch (err) {
        if (err === 'That round has to be created') {
            await createNumbers(userName, round);
            size = (await getNumbersByClass(userName, round, plan, method) as NumsArrOneMethodReturn).size;
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
            "#Class": plan + method,
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
                    [Plan.default + SelectMethod.auto]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [Plan.basic + SelectMethod.auto]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [Plan.premium + SelectMethod.manual]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [Plan.premium + SelectMethod.auto]: {
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

export async function deleteNumsArr(userName: string, round: number, rank: Plan, method: SelectMethod, index: number): Promise<void> {
    const { size } = await getNumbersByClass(userName, round, rank, method);
    if (index >= size) {
        throw new RangeError('Abnormal Access:index is out of range.');
    }
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
            "#Class": rank + method,
            "#Numbers": 'numbers',
            "#Size": 'size'
        },
        ExpressionAttributeValues: {
            ":one": {
                N: '1'
            }
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `REMOVE #Map.#Round.#Class.#Numbers[${index}] SET #Map.#Round.#Class.#Size = #Map.#Round.#Class.#Size - :one`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function getNumbersByClass(userName: string, round: number, rank: Plan, method?: SelectMethod): Promise<NumsArrAllMethodReturn | NumsArrOneMethodReturn> {
    function mapToObject(item: any, method: SelectMethod) {
        const result = item.MyNumbers.M && item.MyNumbers.M[round.toString()].M[rank + method].M;
        const size = Number(result && result.size.N);
        const numsArr = result && result.numbers.L?.map((obj: { L: any[]; }) => {
            return obj.L?.map(ele => Number(ele.N))
        });
        return ({ numsArr, size });
    }
    const ExpressionAttributeNames: { [key: string]: string } = {
        "#Map": 'MyNumbers',
        "#Round": round.toString(),
        "#Class": rank + method,
    }
    let ProjectionExpression = '#Map.#Round.#Class';
    if (method) {
        ExpressionAttributeNames['#Class'] = rank + method;
    } else {
        ExpressionAttributeNames['#Class'] = rank + SelectMethod.auto;
        ExpressionAttributeNames['#Class2'] = rank + SelectMethod.manual;
        ProjectionExpression += ', #Map.#Round.#Class2';
    }
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
                const item = data.Item;
                if ('MyNumbers' in item) {
                    if (method) {
                        resolve(mapToObject(item, method));
                    } else {
                        const result: any = {};

                        Object.values(SelectMethod).forEach(method => {
                            result[rank + method] = mapToObject(item, method);
                        });
                        resolve(result);
                    }
                } else {
                    reject('That round has to be created');
                }
            }
        });
    });
}

export function getNumbersByRound(userName: string, round: number): Promise< NumsArrAllMethodReturn > {
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
                    const result: any = {};
                    entries.forEach(entry => {
                        result[entry[0]] = {
                            numsArr: entry[1].M.numbers.L.map(item => item.L.map(value => Number(value.N))),
                            size: Number(entry[1].M.size.N)
                        }
                    });
                    resolve(result);
                } else {
                    reject('That round has to be created');
                }
            }
        });
    });
}

export enum IncOrExc {
    "include" = "IncludedNumbers",
    "exclude" = "ExcludedNumbers"
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