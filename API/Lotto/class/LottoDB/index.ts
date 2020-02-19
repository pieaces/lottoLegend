import LottoProcess from './LottoProcess';
import { List } from 'immutable';
import dynamoDBJson, { dynamoData } from '../../function/dynamoDBJson'
import queryStats from '../../function/queryStats'
import scanLotto from '../../function/scanLotto'
import { Method } from '../../interface/LottoDB';
import { LData, Params, LottoNumber } from '../../interface/Lotto';
import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB();

export default class LottoStatDB extends LottoProcess {
    protected hasLotto = false;

    async scanLotto() {
        const lottoData: LData[] = await scanLotto();
        this.data = List<LData>(lottoData);
        this.TOTAL_SIZE = this.data.size;
        this.mode = this.TOTAL_SIZE;
        this.hasLotto = true;
    }
    async putStat(method: Method): Promise<void> {
        if (this.hasLotto) {
            let Item: any = { "Name": { S: method } };
            let data: dynamoData;
            switch (method) {
                case Method.frequency:
                    data = this.processFrequency();
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
                default:
                    const dbData = this.processHelper(method);
                    Item["Ideal"] = dynamoDBJson(dbData.ideal);
                    Item["Actual"] = dynamoDBJson(dbData.actual);
                    Item["Pos"] = dynamoDBJson(dbData.pos);
                    if (dbData.stats) {
                        Item["Stats"] = dynamoDBJson(dbData.stats);
                    }
                    break;
            }
            const params = {
                Item,
                TableName: "LottoStats"
            };

            dynamoDB.putItem(params, function (err, data) {
                if (err) {
                    console.log(`${params.TableName} - ${params.Item.Name.S} putStat함수 에러`, err);
                }
                else {
                    console.log(`write DB: ${params.TableName} - ${params.Item.Name.S}`);
                }
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
        for (const name in Method) {
            await this.putStat(name as Method);
        }
        console.log('DB 작성 완료');
    }
}