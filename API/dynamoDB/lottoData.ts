import { DynamoDB, AWSError } from 'aws-sdk'
import { Stats } from '../interface/Statistics';
import { StatsMethod, DBData, Assembly, AssemblyVersion, QueryStatsParams } from '../interface/LottoDB';
import { LottoNumber } from '../interface/Lotto';
import { dynamoDB } from '.'
import { getCurrentRound } from '../funtions';
import { GetItemInput, GetItemOutput, ScanOutput, ScanInput } from 'aws-sdk/clients/dynamodb';
export async function queryLotto(round: number): Promise<LottoNumber[]> {
    const params: GetItemInput = {
        ProjectionExpression: 'Numbers',
        TableName: "LottoData",
        Key: {
            "Round": {
                N: round.toString()
            }
        }
    };
    return await new Promise((resolve, reject) => {
        dynamoDB.getItem(params, function (err, data: GetItemOutput) {
            if (err)
                reject(err);
            const item = data.Item;
            if (typeof item === 'undefined') reject(`Not Exist ${round} item`);
            else {
                const numbers = item.Numbers.NS.map(value => Number(value)).sort((a, b) => a - b);
                resolve(numbers as LottoNumber[]);
            }
        });
    });
}
export async function scanLotto(latest: number): Promise<number[][]> {
    const params: ScanInput = {
        ProjectionExpression: 'Round, Numbers',
        TableName: "LottoData",
    };
    return await new Promise((resolve, reject) => {
        dynamoDB.scan(params, function (err: AWSError, data: ScanOutput) {
            if (err) reject(err);
            resolve(
                data.Items.sort((a, b) => Number(b.Round.N) - Number(a.Round.N)).slice(1, 1+latest).map(item => item.Numbers.NS.map(num => Number(num)).sort((a,b)=>a-b))
            );
        });
    });
}

export async function queryStats(method: StatsMethod, ProjectionExpression?: string, ExpressionAttributeNames?: DynamoDB.ExpressionAttributeNameMap, params?: QueryStatsParams, ): Promise<any> {
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
        dynamoDB.getItem(queryParams, function (err, data: GetItemOutput) {
            if (err) reject(err);
            switch (method) {
                case StatsMethod.frequency:
                case StatsMethod.frequency12:
                    resolve(data.Item.List.L.map(value => Number(value.N)));
                    break;
                case StatsMethod.interval:
                    resolve(data.Item.List.L.map(value => {
                        return {
                            list: value.M.list.L.map(value => Number(value.N)),
                            stats: {
                                mean: Number(value.M.stats.M.mean.N),
                                stdev: Number(value.M.stats.M.stdev.N),
                                max: Number(value.M.stats.M.max.N),
                                min: Number(value.M.stats.M.min.N),
                            }
                        }
                    }));
                    break;
                case StatsMethod.emergence:
                    resolve(data.Item.List.L.map(value => value.L.map(value => value.BOOL)));
                    break;
                case StatsMethod.howLongNone:
                    resolve(data.Item.List.L.map(value => {
                        return {
                            round: Number(value.M.round.N),
                            date: value.M.date.S
                        }
                    }));
                    break;
                case StatsMethod.line:
                    resolve({
                        all: data.Item.All.L.map(value => Number(value.N)),
                        latest: data.Item.Latest.L.map(value => Number(value.N)),
                        total: getCurrentRound()
                    })
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
                    const ideal: Assembly = makeAssembly(data.Item.Ideal.M, params);
                    const actual: Assembly = makeAssembly(data.Item.Actual.M, params);
                    let pos: number[] = transformNumbers(data.Item.Pos.L, params);
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
                    if (data.Item.Stats) {
                        const stats: Stats = {
                            mean: Number(data.Item.Stats.M.mean.N),
                            stdev: Number(data.Item.Stats.M.stdev.N),
                            max: Number(data.Item.Stats.M.max.N),
                            min: Number(data.Item.Stats.M.min.N)
                        }
                        dbData.stats = stats;
                    }
                    if (data.Item.Piece) {
                        const piece = data.Item.Piece.L.map(item => Number(item.N));
                        dbData.piece = piece;
                        dbData.total = getCurrentRound();
                        if(data.Item.ExcludedLines) {
                            dbData.excludedLines = data.Item.ExcludedLines.L.map(boolArr => boolArr.L.map(item => item.BOOL))
                        }
                    }
                    resolve(dbData);
                    break;
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
    return {
        $12: transformNumbers(obj.$12 && obj.$12.L, params),
        $24: transformNumbers(obj.$24 && obj.$24.L, params),
        $48: transformNumbers(obj.$48 && obj.$48.L, params),
        $192: transformNumbers(obj.$192 && obj.$192.L, params),
        all: transformNumbers(obj.all && obj.all.L, params),
        latest: transformNumbers(obj.latest && obj.latest.L, params),
        latest12: transformNumbers(obj.latest12 && obj.latest12.L, params),
    };
}