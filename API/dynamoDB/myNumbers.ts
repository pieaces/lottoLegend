import AWS from 'aws-sdk'
const dynamoDB = new AWS.DynamoDB();

const TableName = "LottoUsers";
function numsArrToList(numsArr: number[][]): AWS.DynamoDB.ListAttributeValue {
    return numsArr.map(numbers => {
        return {
            L: numbers.map(num => { return { N: num.toString() } })
        }
    });
}

export function updateNumbers(userName: string, round: number, numsArr: number[][]): Promise<void> {
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
        UpdateExpression: `SET #Map.#Round.#Numbers = list_append(#Map.#Round.#Numbers, :element), #Map.#Round.#Size = #Map.#Round.#Size + :plus`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err) => {
            if (err) {
                if (err.code === 'ConditionalCheckFailedException') {
                    await createNumbers(userName, round);
                    await updateNumbers(userName, round, numsArr);
                    resolve();
                }
                reject(err);
            }
            else resolve();
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

export function deleteNumber(userName: string, round: number, index: number):Promise<void>{
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
                if (item) {
                    const result = item.MyNumbers.M && item.MyNumbers.M[round.toString()].M;
                    const size = Number(result && result.size.N);
                    const numsArr = result && result.numbers.L?.map(obj => {
                        return obj.L?.map(ele => Number(ele.N))
                    });
                    resolve({ numsArr, size });
                }
            }
        });
    });
}