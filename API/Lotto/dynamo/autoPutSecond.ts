import { getCurrentRound } from "./functions";
import { addPoint, rankToString } from "./addPoint";
import { GetItemInput, ScanInput, ScanOutput, UpdateItemInput } from "aws-sdk/clients/dynamodb";
import dynamoDB from ".";
import { AWSError } from "aws-sdk";

interface LottoData {
    numbers: number[];
    bonusNum: number;
}
export default async function autoPutSecond() {
    const round = getCurrentRound();
    const answer = await queryLotto2(round);
    const users = await scanUsers(round);
    const winner = new Array<number>(5).fill(0);
    users.forEach(async(user) => {
        user.numsArr && user.numsArr.forEach(async (numbers) => {
            if (numbers) {
                const rank = win(numbers, answer);
                if (1 <= rank && rank <= 5) {
                    winner[rank - 1]++;
                    if(1 <=rank && rank <= 3) await addWinnerToLottoData(round, rank, user.userName);
                }
            }
        });
        if(user.include && user.include.length>=10){
            const point = Math.pow(whatCount(user.include, answer.numbers), 2)<<3/Math.log10(user.include.length);
            await addPoint(user.userName, point);
        }
        if(user.exclude && user.exclude.length>=10){
            const point = Math.pow(whatCount(user.exclude, answer.numbers), 2)<<1/Math.log10(user.exclude.length);
            await addPoint(user.userName, point);
        }
    });
    await addWinToLottoStats(winner);
    console.log('autoPutSeconds 완료');
}

function queryLotto2(round: number): Promise<LottoData> {
    const params: GetItemInput = {
        ProjectionExpression: 'Numbers, BonusNum',
        TableName: "LottoData",
        Key: {
            'Round': {
                N: round.toString()
            }
        },
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, function (err, data) {
            if (err) {
                reject(err);
            }
            if (data.Item) {
                const numbers = data.Item.Numbers.NS.map(value => Number(value)).sort((a, b) => a - b);
                const bonusNum = Number(data.Item.BonusNum.N)
                resolve({ numbers, bonusNum });
            } else resolve();
        });
    });
}

function win(numbers: number[], answer: LottoData): number {
    let count = 0;
    if (numbers) {
        numbers.forEach(num => {
            if (answer.numbers.some(item => Number(item) === num)) count++;
        });
        switch (count) {
            case 3://5등
                return 5;
            case 4://4등
                return 4;
            case 5:
                if (numbers.some(item => Number(answer.bonusNum) === item)) return 2;
                else return 3;
            case 6://1등
                return 1;
            default: return 0;
        }
    }
}

function scanUsers(round: number): Promise<{ userName: string, numsArr?: number[][], include?: number[], exclude?: number[] }[]> {
    const params: ScanInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Round': round.toString()
        },
        ProjectionExpression: 'UserName, Numbers.#Round, IncludeExclude.#Round.include, IncludeExclude.#Round.exclude'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);

            const result = data.Items.map(item => {
                return {
                    userName: item.UserName.S,
                    numsArr: item.Numbers && item.Numbers.M[round].L.map(myNumbers => myNumbers.M.numbers.NS.map(num => Number(num))),
                    include: item.IncludeExclude && item.IncludeExclude.M[round].M.include && item.IncludeExclude.M[round].M.include.NS.map(num => Number(num)),
                    exclude: item.IncludeExclude && item.IncludeExclude.M[round].M.exclude && item.IncludeExclude.M[round].M.exclude.NS.map(num => Number(num)),
                }
            });
            resolve(result);
        });
    });
}
function getWin(): Promise<number[]> {
    const params: GetItemInput = {
        TableName: "LottoStats",
        Key: {
            'Name': {
                S: 'win'
            }
        },
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(Object.values(data.Item).map(item => Number(item.N)))
        });
    });
}

export function whatCount(numbers:number[], answer:number[]):number{
    let count = 0;
    numbers.forEach(num => {
        if(answer.some(item => item === num)) count++;
    })
    return count;
}

function addWinToLottoStats(winner:number[]):Promise<void> {
    const ExpressionAttributeValues:any = {};
    let UpdateExpression = "ADD ";

    winner.forEach((num, index) => {
        ExpressionAttributeValues[':operand'+index] = {
            N:num.toString()
        }
        UpdateExpression += `${rankToString(index+1)} :operand${index},`;
    });

    ExpressionAttributeValues
    const params: UpdateItemInput = {
        TableName: 'LottoStats',
        ExpressionAttributeValues,
        Key: {
            Name: {
                S: 'win'
            }
        },
        UpdateExpression:UpdateExpression.slice(0,-1)
    }
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    })
}
function addWinnerToLottoData(round: number, rank: number, userName: string) {
    const params: UpdateItemInput = {
        TableName: 'LottoData',
        Key: {
            'Round': {
                N: round.toString()
            }
        },
        ExpressionAttributeValues: {
            ':user': {
                SS: [userName]
            }
        },
        UpdateExpression: `ADD Win.${rankToString(rank)} :user`
    };
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}