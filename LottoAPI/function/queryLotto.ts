import AWS from 'aws-sdk';
import { LottoNumber } from '../interface/Lotto';
//AWS.config.update(require('./key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function queryLotto(round: number): Promise<LottoNumber[]> {
    const queryParams = {
        ProjectionExpression: 'Numbers',
        TableName: "LottoData",
        KeyConditionExpression: "#Round = :round ",
        ExpressionAttributeNames: {
            "#Round": "Round"
        },
        ExpressionAttributeValues: {
            ":round": { N: round.toString() },
        }
    };

    return await new Promise((resolve, reject) => {
        dynamoDB.query(queryParams, function (err, data) {
            if (err) {
                reject('LottoData - query 과정 에러' + err);
            }
            else {
                const item = data.Items[0];
                if(typeof item === 'undefined') throw new Error(`Not Exist ${round} item`);
                const numbers = item.Numbers.NS.map(value => Number(value)).sort((a,b)=>a-b);
                resolve(numbers as LottoNumber[])
            }
        });
    });
}