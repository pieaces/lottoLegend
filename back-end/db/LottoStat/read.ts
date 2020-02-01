import { Method } from '../../class/Lotto/Inter'
import {Assembly, ProcessedData} from '../LottoProcessor'
import AWS from 'aws-sdk';
AWS.config.update(require('../key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function getStats(name: Method): Promise<ProcessedData> {
    var params = {
        TableName: "LottoStat",
        KeyConditionExpression: "#Name = :Name",
        ExpressionAttributeNames: {
            "#Name": "Name"
        },
        ExpressionAttributeValues: {
            ":Name": {
                S: name
            }
        }
    };

    return await new Promise((resolve, reject) => {
        dynamoDB.query(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            }
            else {
                const item = data.Items[0];
                const ideal:Assembly = {
                    $12: item.Ideal.M.$48.L.map(value => Number(value.N)),
                    $24: item.Ideal.M.$48.L.map(value => Number(value.N)),
                    $48: item.Ideal.M.$48.L.map(value => Number(value.N)),
                    $192: item.Ideal.M.$48.L.map(value => Number(value.N)),
                    all: item.Ideal.M.$48.L.map(value => Number(value.N)),
                    latest: item.Ideal.M.Latest.L.map(value => Number(value.N)),
                };
                const actual:Assembly = {
                    $12: item.Actual.M.$48.L.map(value => Number(value.N)),
                    $24: item.Actual.M.$48.L.map(value => Number(value.N)),
                    $48: item.Actual.M.$48.L.map(value => Number(value.N)),
                    $192: item.Actual.M.$48.L.map(value => Number(value.N)),
                    all: item.Actual.M.$48.L.map(value => Number(value.N)),
                    latest: item.Actual.M.Latest.L.map(value => Number(value.N)),
                };
                const coef = item.Coef.L.map(value => Number(value.N));

                resolve({ ideal, actual, coef });
            }
        })
    });
}