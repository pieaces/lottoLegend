import { GetItemInput, GetItemOutput } from "aws-sdk/clients/dynamodb";
import dynamoDB from ".";
import { AWSError } from "aws-sdk";

export async function queryLotto(round: number): Promise<number[]> {
    const params:GetItemInput = {
        ProjectionExpression: 'Numbers',
        TableName: "LottoData",
        Key:{
            "Round": {
                N: round.toString()
            }
        }
    };

    return await new Promise((resolve, reject) => {
        dynamoDB.getItem(params, function (err:AWSError, data:GetItemOutput) {
            if (err) {
                reject('queryLotto 에러' + err);
            }
            else {
                const item = data.Item;
                if (typeof item === 'undefined') reject(`Not Exist ${round} item`);
                else {
                    const numbers = item.Numbers.NS.map(value => Number(value)).sort((a, b) => a - b);
                    resolve(numbers);
                }
            }
        });
    });
}