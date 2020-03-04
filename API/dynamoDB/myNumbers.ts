import { dynamoDB, TableName } from '.'
import { Plan, getPlan } from './userInfo';
import { Response } from '../class';
import { getCurrentRound } from '../funtions';

export enum SelectTool{
    "free" = 'a',
    "charge" = 'b'
}
export enum SelectMethod {
    "auto" = 'a',
    "manual" = 'm'
}
interface SelectClass{
    tool:SelectTool;
    method?:SelectMethod;
}

interface NumsArrAllMethodReturn {
    [key:string]:{numsArr: number[][], size:number}
}
interface NumsArrOneMethodReturn { numsArr: number[][], size: number }
const planLimit = {
    [Plan.default]: 5,
    [Plan.basic]: 10,
    [Plan.premium]: 20,
    [Plan.premiumplus]: 40
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
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
            "#Numbers": 'numbers',
            "#Class": SelectTool.charge + SelectMethod.auto,
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

export async function updateNumbers(userName: string, round: number, numsArr: number[][], tool: SelectTool): Promise<Response> {
    const plan:Plan = await getPlan(userName);
    const classification = tool + SelectMethod.manual;
    let size: number = 0;
    try {
        const allNumbers = (await getNumbersByRound(userName, round));
        for(const tool in SelectTool){
            for(const method in SelectMethod){
                const classification = tool + method;
                size += allNumbers[classification].size;
            }
        }
    } catch (err) {
        if (err === 'That round has to be created') {
            await createNumbers(userName, round);
            size = (await getNumbersByClass(userName, round, {tool, method:SelectMethod.manual}) as NumsArrOneMethodReturn).size;
        }
    }
    const available = planLimit[plan] - size;
    if (numsArr.length > available) {
        return new Response(true, `이 시스템의 저장 가능한 최대 크기는 ${planLimit[plan]}개입니다. 현재 저장가능 개수는 ${available}개입니다.`);
    }
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
            "#Numbers": 'numbers',
            "#Class": classification,
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
                    [SelectTool.free + SelectMethod.manual]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [SelectTool.charge + SelectMethod.auto]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [SelectTool.charge + SelectMethod.manual]: {
                        M: {
                            numbers: {
                                L: new Array()
                            },
                            size: {
                                N: '0'
                            }
                        }
                    },
                    [SelectTool.charge + SelectMethod.auto]: {
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

export async function deleteNumsArr(userName: string, round: number, select:SelectClass, index: number): Promise<void> {
    const { size } = await getNumbersByClass(userName, round, select);
    if (index >= size || !select.method) {
        throw new RangeError('Abnormal Access:index is out of range. | method has to be exist.');
    }
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Map": 'MyNumbers',
            "#Round": round.toString(),
            "#Class": select.tool + select.method,
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

export function getNumbersByClass(userName: string, round: number, select:SelectClass): Promise<NumsArrAllMethodReturn | NumsArrOneMethodReturn> {
    function mapToObject(item: any, method:SelectMethod) {
        const result = item.MyNumbers.M && item.MyNumbers.M[round.toString()].M[select.tool + method].M;
        const size = Number(result && result.size.N);
        const numsArr = result && result.numbers.L?.map((obj: { L: any[]; }) => {
            return obj.L?.map(ele => Number(ele.N))
        });
        return ({ numsArr, size });
    }
    const ExpressionAttributeNames: { [key: string]: string } = {
        "#Map": 'MyNumbers',
        "#Round": round.toString(),
    }
    let ProjectionExpression = '#Map.#Round.#Class';
    if (select.method) {
        ExpressionAttributeNames['#Class'] = select.tool + select.method;
    } else {
        ExpressionAttributeNames['#Class'] = select.tool + SelectMethod.auto;
        ExpressionAttributeNames['#Class2'] = select.tool + SelectMethod.manual;
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
                    if (select.method) {
                        resolve(mapToObject(item, select.method));
                    } else {
                        const result: any = {};

                        Object.values(SelectMethod).forEach(method => {
                            result[select.tool + method] = mapToObject(item, method);
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
                    let entries = Object.entries<any>(obj);
                    const result: any = {};
                    entries.forEach(entry => {
                        result[entry[0]] = {
                            numsArr: entry[1].M.numbers.L.map((item:{L:[]}) => item.L.map((value:{N:string}) => Number(value.N))),
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

export async function freeGenerator(currentId:string) {
    const currentRound = getCurrentRound();
    const include = await getIncOrExcNumbers(currentId, currentRound, IncOrExc.include);
    const exclude = await getIncOrExcNumbers(currentId, currentRound, IncOrExc.exclude);
    const choice: number[] = [];

    exclude.forEach((num, index) => {
        for (let i = exclude[index - 1] + 1 || 1; i < num; i++) {
            choice.push(i);
        }
    });
    for (let i = exclude[exclude.length - 1] + 1; i <= 45; i++) {
        choice.push(i);
    }

    const numsArr: number[][] = [];
    const plan = await getPlan(currentId);

    while (numsArr.length < planLimit[plan]) {
        const SIZE = choice.length;
        const numberSet: Set<number> = new Set();
        while (numberSet.size < 6) {
            numberSet.add(choice[Math.floor(Math.random() * SIZE)]);
        }
        const numbers = [...numberSet].sort((a, b) => a - b);

        let flag = false;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < include.length; j++) {
                if (numbers[i] === include[j]) {
                    flag = true;
                    break;
                }
            }
        }
        if (flag) {
            numsArr.push(numbers);
        }
    }

    console.log(numsArr);
    return numsArr;
}