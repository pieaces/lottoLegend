import { Method } from '../class/LottoData/Base'
import { Assembly, DBData } from '../class/LottoData'
import AWS from 'aws-sdk';
import { Stats } from '../class/Statistics';
// AWS.config.update(require('./key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function getStats(name: Method) {
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
                console.log('LottoStat - read 과정 에러', err);
                reject(err);
            }
            else {
                const item = data.Items[0];
                let list: Array<any>;
                switch (name) {
                    case Method.frequency:
                        list = item.List.L.map(value => Number(value.N));
                        resolve(list);
                        break;
                    case Method.interval:
                        list = item.List.L.map(value => {
                            return {
                                list: value.M.list.L.map(value => Number(value.N)),
                                stats: {
                                    mean: Number(value.M.stats.M.mean.N),
                                    stdev: Number(value.M.stats.M.stdev.N),
                                    max: Number(value.M.stats.M.max.N),
                                    min: Number(value.M.stats.M.min.N),
                                }
                            }
                        });
                        resolve(list);
                        break;
                    case Method.emergence:
                        list = item.List.L.map(value => value.L.map(value => value.BOOL));
                        resolve(list);
                        break;
                    case Method.howLongNone:
                        list = item.List.L.map(value => {
                            return {
                                round: Number(value.M.round.N),
                                date: value.M.date.S
                            }
                        });
                        resolve(list);
                        break;
                    default:
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
                        const dbData: DBData = { ideal, actual, coef };
                        if (item.Stats) {
                            const stats: Stats = {
                                mean: Number(item.Stats.M.mean.N),
                                stdev: Number(item.Stats.M.stdev.N),
                                max: Number(item.Stats.M.max.N),
                                min: Number(item.Stats.M.min.N)
                            }
                            dbData.stats = stats;
                        }
                        resolve(dbData);
                        break;
                }
            }
        })
    });
}