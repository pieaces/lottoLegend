import dynamoDB from '.'
import { AWSError } from 'aws-sdk/lib/error';
import { GetItemOutput, GetItemInput } from 'aws-sdk/clients/dynamodb';

export type IncOrExc = "include" | "exclude";
export function getIncOrExcNumbers(userName: string, round: number, choice: IncOrExc): Promise<{current:number[], before?:number[]}> {
    const params = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'IncludeExclude',
            "#Choice": choice,
            "#Round": round.toString(),
            "#Before_Round": (round - 1).toString()
        },
        ProjectionExpression: '#Map.#Round.#Choice, #Map.#Before_Round.#Choice',
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
            const joint = data.Item.IncludeExclude && data.Item.IncludeExclude.M;
            const current = joint && joint[round].M[choice].NS;
            const before = joint && joint[round - 1] && joint[round-1].M[choice].NS;
            resolve({
                current: current && current.map(item => Number(item)).sort((a, b) => a - b),
                before: before && before.map(item => Number(item)).sort((a, b) => a - b),
            });
        });
    });
}

export function getLotto(round: number): Promise<number[]> {
    const params = {
        TableName: 'LottoData',
        ProjectionExpression: 'Numbers',
        Key: {
            "Round": {
                N: round.toString()
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            resolve(data.Item.Numbers.NS.map(num => Number(num)));
        });
    });
}

export function getWinStats(): Promise<number[]> {
    const params: GetItemInput = {
        TableName: 'LottoStats',
        Key: {
            "Name": {
                S: 'win'
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            resolve([Number(data.Item.firstWinner.N), Number(data.Item.secondWinner.N), Number(data.Item.thirdWinner.N), Number(data.Item.fourthWinner.N), Number(data.Item.fifthWinner.N)]);
        });
    });
}