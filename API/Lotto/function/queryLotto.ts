import AWS from 'aws-sdk';
import { LottoNumber } from '../interface/Lotto';
const dynamoDB = new AWS.DynamoDB();

export default async function queryLotto(round: number): Promise<LottoNumber[]> {
    const queryParams = {
        ProjectionExpression: 'Numbers',
        TableName: "LottoData",
        Key:{
            "Round": {
                N: round.toString()
            }
        }
    };

    return await new Promise((resolve, reject) => {
        dynamoDB.getItem(queryParams, function (err, data) {
            if (err) {
                reject('LottoData - query 과정 에러' + err);
            }
            else {
                const item = data.Item;
                if (typeof item === 'undefined') reject(`Not Exist ${round} item`);
                else {
                    const numbers = item.Numbers.NS.map(value => Number(value)).sort((a, b) => a - b);
                    resolve(numbers as LottoNumber[]);
                }
            }
        });
    });
}