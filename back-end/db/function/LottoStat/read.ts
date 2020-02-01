import { Method } from '../../../class/Lotto/Inter'
import { Assembly, ProcessedData, Method2 } from '../../class/LottoProcessor'
import AWS from 'aws-sdk';
AWS.config.update(require('../../key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function getStats(name: Method | Method2): Promise<ProcessedData|number[]> {
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
                if (name in Method) {
                    const ideal: Assembly = {
                        $12: item.Ideal.M.$12.L.map(value => Number(value.N)),
                        $24: item.Ideal.M.$24.L.map(value => Number(value.N)),
                        $48: item.Ideal.M.$48.L.map(value => Number(value.N)),
                        $192: item.Ideal.M.$192.L.map(value => Number(value.N)),
                        all: item.Ideal.M.all.L.map(value => Number(value.N)),
                        latest: item.Ideal.M.latest.L.map(value => Number(value.N)),
                    };
                    const actual: Assembly = {
                        $12: item.Actual.M.$12.L.map(value => Number(value.N)),
                        $24: item.Actual.M.$24.L.map(value => Number(value.N)),
                        $48: item.Actual.M.$48.L.map(value => Number(value.N)),
                        $192: item.Actual.M.$192.L.map(value => Number(value.N)),
                        all: item.Actual.M.all.L.map(value => Number(value.N)),
                        latest: item.Actual.M.latest.L.map(value => Number(value.N)),
                    };
                    const coef = item.Coef.L.map(value => Number(value.N));

                    resolve({ ideal, actual, coef });
                } else if (name in Method2) {
                    switch(name){
                        case Method2.frequency:
                            const list = item.list.L.map(value => Number(value.N));
                            resolve(list);
                            break;
                        default:
                            console.log('?');
                            break;
                    }
                }
            }
        })
    });
}