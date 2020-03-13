import dynamoDB from '.'
import { AWSError } from 'aws-sdk/lib/error';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';

export enum IncOrExc {
    "include" = "Include",
    "exclude" = "Exclude"
}

export function getIncOrExcNumbers(userName: string, round: number, choice: IncOrExc): Promise<number[]> {
    const params = {
        TableName: 'LottoUsers',
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
        dynamoDB.getItem(params, (err:AWSError, data:GetItemOutput) => {
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