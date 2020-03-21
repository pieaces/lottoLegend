import { DynamoDB, AWSError } from 'aws-sdk'
import { Stats } from '../interface/Statistics';
import { StatsMethod, DBData, Assembly, AssemblyVersion, QueryStatsParams } from '../interface/LottoDB';
import { dynamoDB } from '.'
import { getCurrentRound } from '../funtions';
import { GetItemInput } from 'aws-sdk/clients/dynamodb';

export async function getWeekNumbers(): Promise<number[]>{
    const queryParams: GetItemInput = {
        TableName: "LottoData",
        ExpressionAttributeNames: {
            "#Week": 'Week'
        },
        ProjectionExpression: '#Week',
        Key: {
            "Round": {
                N: (getCurrentRound()+1).toString()
            }
        }
    };
    return await new Promise((resolve, reject) => {
        dynamoDB.getItem(queryParams, (err:AWSError, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.Item.Week.NS.map(item => Number(item)));
        })
    });
}
export default async function queryStats(method: StatsMethod | 'howLongNone', ProjectionExpression?: string, ExpressionAttributeNames?: DynamoDB.ExpressionAttributeNameMap, params?: QueryStatsParams, ): Promise<any> {
    const queryParams: GetItemInput = {
        TableName: "LottoStats",
        Key: {
            "Name": {
                S: method
            }
        }
    };
    if (ProjectionExpression) queryParams.ProjectionExpression = ProjectionExpression;
    if (ExpressionAttributeNames) queryParams.ExpressionAttributeNames = ExpressionAttributeNames;
    return await new Promise((resolve, reject) => {
        dynamoDB.getItem(queryParams, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                const item = data.Item;
                let list: Array<any>;
                switch (method) {
                    case 'howLongNone':
                        list = item.List.L.map(value => {
                            return {
                                round: Number(value.M.round.N),
                                date: value.M.date.S
                            }
                        });
                        resolve(list);
                        break;
                    default:
                        if (method === StatsMethod.sum && params && params.from) {
                            params.from -= 21;
                            params.to -= 21;
                        } else if (method === StatsMethod.diffMaxMin && params) {
                            if (params.list) {
                                params.list = params.list.map(value => value - 5);
                            } else {
                                params.from -= 5; params.to -= 5;
                            }
                        }
                        const ideal: Assembly = makeAssembly(item.Ideal.M, params);
                        const actual: Assembly = makeAssembly(item.Actual.M, params);
                        let pos: number[] = transformNumbers(item.Pos.L, params);
                        if (method === StatsMethod.sum) {
                            const PACK = 10;
                            for (const v in ideal) {
                                ideal[v as AssemblyVersion] = compressNumbers(ideal[v as AssemblyVersion], PACK);
                                actual[v as AssemblyVersion] = compressNumbers(actual[v as AssemblyVersion], PACK);
                            }
                            pos = compressNumbers(pos, PACK);
                        }
                        if (method === StatsMethod.diffMaxMin && (params && params.to - params.from > 6)) {
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
                        if (item.Piece) {
                            const piece = item.Piece.L.map(item => Number(item.N));
                            dbData.piece = piece;
                            dbData.total = getCurrentRound();
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

function transformNumbers(list: DynamoDB.ListAttributeValue, params?: QueryStatsParams): number[] {
    let result: number[] = [];
    if (list) {
        if (params && typeof params.from === 'number' && typeof params.to === 'number') {
            result = list.slice(params.from, params.to + 1).map((value) => Number(value.N))
        } else if (params && params.list) {
            result = list.filter((value, index) => {
                if (params.list.indexOf(index) !== -1) return value;
            }).map(value => Number(value.N));
        } else {
            result = list.map((value) => Number(value.N));
        }
    }
    return result;
}

function makeAssembly(obj: DynamoDB.MapAttributeValue, params?: QueryStatsParams): Assembly {
    const result: Assembly = {
        $12: transformNumbers(obj.$12 && obj.$12.L, params),
        $24: transformNumbers(obj.$24 && obj.$24.L, params),
        $48: transformNumbers(obj.$48 && obj.$48.L, params),
        $192: transformNumbers(obj.$192 && obj.$192.L, params),
        all: transformNumbers(obj.all && obj.all.L, params),
        latest: transformNumbers(obj.latest && obj.latest.L, params),
    };

    return result;
}