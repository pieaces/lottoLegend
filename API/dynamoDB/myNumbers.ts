import { dynamoDB, TableName } from '.'
import { numsAvailability } from './userInfo';
import { Response } from '../class';

function numsArrToList(numsArr: number[][]): AWS.DynamoDB.ListAttributeValue {
    return numsArr.map(numbers => {
        return {
            L: numbers.map(num => { return { N: num.toString() } })
        }
    });
}

export async function updateNumbers(userName: string, round: number, numsArr: number[][]): Promise<Response> {
    const availability = await numsAvailability(userName);
    let size;
    try {
        size = (await getNumbers(userName, round)).size;
    } catch (err) {
        if (err === 'MyNumbers has to be created') {
            await createNumbers(userName, round);
            size = (await getNumbers(userName, round)).size;
        }
    }
    if (numsArr.length > availability - size) {
        return new Response(true, `현재 요금제에서 저장 가능한 최대 크기는 ${availability}개입니다. 현재 저장 가능 개수는 ${availability - size}개입니다.`);
    }
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
            "#Numbers": 'numbers',
            "#Size": 'size'
        },
        ExpressionAttributeValues: {
            ":element": {
                L: numsArrToList(numsArr)
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
        UpdateExpression: `SET #Map.#Round.#Numbers = list_append(#Map.#Round.#Numbers, :element) ADD #Map.#Round.#Size :plus`
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
                    numbers: {
                        L: new Array()
                    },
                    size: {
                        N: '0'
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

export function getNumbers(userName: string, round: number): Promise<{ numsArr: number[][], size: number }> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
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
                    const result = item.MyNumbers.M && item.MyNumbers.M[round.toString()].M;
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