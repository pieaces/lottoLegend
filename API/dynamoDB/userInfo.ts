import dynamoDB from ".";
import { GetItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

export function getRank(userName: string): Promise<number> {
    const params = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Rank': 'Rank'
        },
        ProjectionExpression: '#Rank',
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
            if(data.Item){
                resolve(Number(data.Item.Rank.S));
            }else resolve();
        });
    });
}