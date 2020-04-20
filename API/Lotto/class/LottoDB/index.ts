import LottoProcess from './LottoProcess';
import { List } from 'immutable';
import dynamoDBJson, { dynamoData } from '../../../dynamo/jsonParser'
import queryStats from '../../../dynamo/queryStats'
import scanLotto from '../../../dynamo/scanLotto'
import { Method } from '../../interface/LottoDB';
import { LData, Params, LottoNumber } from '../../interface/Lotto';
import dynamoDB from '../../../dynamo'
import Analyze from '../Analyze';

export default class LottoStatDB extends LottoProcess {
    protected hasLotto = false;

    async scanLotto() {
        const lottoData: LData[] = await scanLotto();
        console.log('로또스캔 성공');
        this.data = List<LData>(lottoData);
        this.TOTAL_SIZE = this.data.size;
        this.mode = this.TOTAL_SIZE;
        this.hasLotto = true;
    }

    putStat(method: Method): Promise<void> {
        if (this.hasLotto) {
            let Item: any = { "Name": { S: method } };
            let data: dynamoData;
            switch (method) {
                case Method.frequency:
                    data = this.processFrequency();
                    Item['List'] = dynamoDBJson(data);
                    break;
                case Method.frequency12:
                    data = this.processFrequency(-12);
                    Item['List'] = dynamoDBJson(data);
                    break;
                case Method.interval:
                    data = [] as number[][];
                    for (let i = 1; i <= 45; i++) {
                        const temp = this.processIntervalForOne(i as LottoNumber);
                        data.push(temp);
                    }
                    Item['List'] = dynamoDBJson(data, this.statsInterval());
                    break;
                case Method.emergence:
                    data = [] as boolean[][];
                    for (let i = 1; i <= 45; i++) {
                        const temp = this.processEmergedStatusForOne(i as LottoNumber);
                        data.push(temp);
                    }
                    Item['List'] = dynamoDBJson(data);
                    break;
                case Method.howLongNone:
                    data = this.processHowLongNone();
                    Item['List'] = dynamoDBJson(data);
                    break;
                case Method.line:
                    Item['All'] = dynamoDBJson(Analyze.posCount$10(this.getLNumbers()));
                    Item['Latest'] = dynamoDBJson(Analyze.posCount$10(this.getLNumbers(-10)));
                    break;
                default:
                    const dbData = this.processHelper(method);
                    Item["Ideal"] = dynamoDBJson(dbData.ideal);
                    Item["Actual"] = dynamoDBJson(dbData.actual);
                    Item["Pos"] = dynamoDBJson(dbData.pos);
                    if (dbData.stats) {
                        Item["Stats"] = dynamoDBJson(dbData.stats);
                    }
                    if(method !== Method.excludedLine && method !== Method.carryCount && method !== Method.pos$1){
                        Item["Piece"] = {
                            L: this.getLNumbers(-50).map(numbers => {
                                return {
                                    N: this.methodMap.get(method).cal(numbers).toString()
                                }
                            })
                        };
                        if(method === Method.excludedLineCount){
                            Item['ExcludedLines'] = {
                                L: this.getLNumbers(-50).map(numbers => {
                                    return {
                                        L: returnExcludedLine(numbers).map(bool => boolToAWS(bool))
                                    }
                                })
                            }
                        }
                    }else if(method === Method.carryCount){
                        Item["Piece"] = {
                            L: Analyze.carryCount(this.getLNumbers(-50)).map(num =>{
                                return {
                                    N: num.toString()
                                }
                            })
                        };
                    }
                    break;
            }

            const params = {
                Item,
                TableName: "LottoStats"
            };
            return new Promise((resolve, reject) => {
                dynamoDB.putItem(params, function (err, data) {
                    if (err) {
                        reject(`${params.TableName} - ${params.Item.Name.S} putStat 에러:` + err);
                    }
                    else {
                        console.log(`통계값 작성: ${params.TableName} - ${params.Item.Name.S}`);
                        resolve();
                    }
                });
            });
        }
    }

    static async queryStat(method: Method, params:Params) {
        const data = queryStats(method, params);
        return data;
    }

    async putALLStats() {
        if (!this.hasLotto) {
            await this.scanLotto();
        }
        let count = 0;
        for (const name in Method) {
            console.log(count++);
            await this.putStat(name as Method);
        }
        console.log('통계값 DB 작성 완료');
    }
}

function returnExcludedLine(numbers:number[]) {
    const boolArr = new Array<boolean>(5).fill(true);
    numbers.forEach(num => {
        boolArr[Math.floor((num - 1) / 10)] = false;
    });
    return boolArr;
}
function boolToAWS(bool:boolean){
    return {
        BOOL: bool
    }
}