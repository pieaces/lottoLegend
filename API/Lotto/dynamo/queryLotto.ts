import { LottoNumber } from '../interface/Lotto';
import dynamoDB from '.'

export default function queryLotto(round: number): Promise<LottoNumber[]> {
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

    return new Promise((resolve, reject) => {
        dynamoDB.query(queryParams, function (err, data) {
            if (err) {
                reject('queryLotto 에러' + err);
            }
            else {
                const item = data.Items[0];
                if (typeof item === 'undefined') reject(`Not Exist ${round} item`);
                else {
                    const numbers = item.Numbers.NS.map(value => Number(value)).sort((a, b) => a - b);
                    resolve(numbers as LottoNumber[]);
                }
            }
        });
    });
}