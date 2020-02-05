import { Params } from '../interface/Lotto';
import { Stats } from '../interface/Statistics';
import { Method, DBData, Assembly, AssemblyVersion } from '../interface/LottoDB';

import AWS from 'aws-sdk';
//AWS.config.update(require('./key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function queryStats(method: Method, params: Params): Promise<any[] | DBData> {
    const queryParams = {
        TableName: "LottoStat",
        KeyConditionExpression: "#Name = :Name",
        ExpressionAttributeNames: {
            "#Name": "Name"
        },
        ExpressionAttributeValues: {
            ":Name": {
                S: method
            }
        }
    };

    return await new Promise((resolve, reject) => {
        dynamoDB.query(queryParams, function (err, data) {
            if (err) {
                console.log('LottoStat - read 과정 에러', err);
                reject(err);
            }
            else {
                const item = data.Items[0];
                let list: Array<any>;
                switch (method) {
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
                        if (!params.from || !params.to) {
                            reject("Range doesn't exist");
                        }
                        let from = params.from, to = params.to;
                        if (method === Method.sum) {
                            from -= 21;
                            to -= 21;
                        } else if (method === Method.diffMaxMin) {
                            from -= 5;
                            to -= 5;
                        }
                        const ideal: Assembly = {
                            $12: item.Ideal.M.$12.L.slice(from, to).map(value => Number(value.N)),
                            $24: item.Ideal.M.$24.L.slice(from, to).map(value => Number(value.N)),
                            $48: item.Ideal.M.$48.L.slice(from, to).map(value => Number(value.N)),
                            $192: item.Ideal.M.$192.L.slice(from, to).map(value => Number(value.N)),
                            all: item.Ideal.M.all.L.slice(from, to).map(value => Number(value.N)),
                            latest: item.Ideal.M.latest.L.slice(from, to).map(value => Number(value.N)),
                        };
                        const actual: Assembly = {
                            $12: item.Actual.M.$12.L.slice(from, to).map(value => Number(value.N)),
                            $24: item.Actual.M.$24.L.slice(from, to).map(value => Number(value.N)),
                            $48: item.Actual.M.$48.L.slice(from, to).map(value => Number(value.N)),
                            $192: item.Actual.M.$192.L.slice(from, to).map(value => Number(value.N)),
                            all: item.Actual.M.all.L.slice(from, to).map(value => Number(value.N)),
                            latest: item.Actual.M.latest.L.slice(from, to).map(value => Number(value.N)),
                        };

                        let PACK: number;
                        if (method === Method.sum) {
                            PACK = 10;
                        }
                        if (method === Method.diffMaxMin) {
                            PACK = 5;
                        }
                        //const coef = item.Coef.L.map(value => Number(value.N));
                        let pos = item.Pos.L.slice(from, to).map(value => Number(value.N));

                        if (method === Method.sum || method === Method.diffMaxMin) {
                            for (const v in ideal) {
                                ideal[v as AssemblyVersion] = compressNumbers(ideal[v as AssemblyVersion], PACK);
                                actual[v as AssemblyVersion] = compressNumbers(actual[v as AssemblyVersion], PACK);
                            }
                            pos = compressNumbers(pos, PACK);
                        }
                        const dbData: DBData = { ideal, actual, pos };
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

function compressNumbers(numbers: number[], PACK: number): number[] {
    numbers = numbers.reduce((acc, cur, index) => {
        if (index % PACK === 0) {
            acc.push(cur);
        } else {
            acc[acc.length - 1] += cur;
        }
        return acc;
    }, []);
    return numbers;
}