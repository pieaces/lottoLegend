import { Stats } from '../interface/Statistics';
import { Method, DBData, Assembly, AssemblyVersion, QueryStatsParams } from '../interface/LottoDB';

import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB();

export default async function queryStats(method: Method, params: QueryStatsParams): Promise<any[] | DBData> {
    const queryParams = {
        TableName: "LottoStats",
        Key:{
            "Name": {
                S: method
            }
        }
    };

    return await new Promise((resolve, reject) => {
        dynamoDB.getItem(queryParams, function (err, data) {
            if (err) {
                console.log('LottoStats - read 과정 에러', err);
                reject(err);
            }
            else {
                const item = data.Item;
                console.log(data);
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
                        if (method === Method.sum) {
                            params.from -= 21;
                            params.to -= 21;
                        } else if (method === Method.diffMaxMin) {
                            if (params.list) {
                                params.list = params.list.map(value => value - 5);
                            } else {
                                params.from -= 5; params.to -= 5;
                            }
                        }
                        const ideal: Assembly = makeAssembly(item.Ideal.M, params);
                        const actual: Assembly = makeAssembly(item.Actual.M, params);
                        let pos: number[] = transformNumbers(item.Pos.L, params);
                        if (method === Method.sum) {
                            const PACK = 10;
                            for (const v in ideal) {
                                ideal[v as AssemblyVersion] = compressNumbers(ideal[v as AssemblyVersion], PACK);
                                actual[v as AssemblyVersion] = compressNumbers(actual[v as AssemblyVersion], PACK);
                            }
                            pos = compressNumbers(pos, PACK);
                        }
                        if (method === Method.diffMaxMin && params.to - params.from > 6) {
                            const PACK = 2;
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
        });
    });
}

function compressNumbers(numbers: number[], PACK: number): number[] {
    const result = numbers.reduce((acc, cur, index) => {
        if (index % PACK === 0) {
            acc.push(cur);
        } else {
            acc[acc.length - 1] += cur;
        }
        return acc;
    }, []);
    return result;
}

function transformNumbers(list: AWS.DynamoDB.ListAttributeValue, params: QueryStatsParams): number[] {
    let result: number[];
    if (typeof params.from === 'number' && typeof params.to === 'number') {
        result = list.slice(params.from, params.to + 1).map((value) => Number(value.N))
    } else if (params.list) {
        result = list.filter((value, index) => {
            if (params.list.indexOf(index) !== -1) return value;
        }).map(value => Number(value.N));
    } else {
        result = list.map((value) => Number(value.N));
    }

    return result;
}

function makeAssembly(obj: AWS.DynamoDB.MapAttributeValue, params: QueryStatsParams): Assembly {
    let result: Assembly;

    result = {
        $12: transformNumbers(obj.$12.L, params),
        $24: transformNumbers(obj.$24.L, params),
        $48: transformNumbers(obj.$48.L, params),
        $192: transformNumbers(obj.$192.L, params),
        all: transformNumbers(obj.all.L, params),
        latest: transformNumbers(obj.latest.L, params),
    };

    return result;
}