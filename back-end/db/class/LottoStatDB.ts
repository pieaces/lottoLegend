import { List } from 'immutable';
import LottoProcessor, { ProcessedData, LottoDate } from './LottoProcessor'
import { Method1 } from '../../class/Lotto/Inter'
import { Method2 } from './LottoProcessor'
import { LottoNumber } from '../../class/Generator/Base';
import { dynamoDBJson, dynamoDBJson2 } from '../function/LottoStat/dynamoDBJson'
import readLottoStat from '../function/LottoStat/read'
import readLottoData from '../function/LottoData/read'
import { LData } from '../../class/Lotto/Base';

import AWS from 'aws-sdk';
AWS.config.update(require('../key.json'));
const dynamoDB = new AWS.DynamoDB();

export default class LottoStatDB extends LottoProcessor {
    private didRead = false;
    async readLottoData() {
        const lottoData: LData[] = await readLottoData();
        this.data = List<LData>(lottoData);
        this.TOTAL_SIZE = this.data.size;
        this.mode = this.TOTAL_SIZE;
        this.didRead = true;
    }
    async writeLottoStat(method: Method1 | Method2): Promise<void> {
        if (this.didRead) {
            let Item: any = { "Name": { S: method } };
            let data: ProcessedData | number[] | LottoDate[] | number[][] | boolean[][];
            switch (method) {
                case Method2.frequency:
                    data = this.processFrequency();
                    Item['List'] = dynamoDBJson(data);
                    break;
                case Method2.interval:
                    data = [] as number[][];
                    for (let i = 1; i <= 45; i++) {
                        const temp = this.processIntervalForOne(i as LottoNumber);
                        data.push(temp);
                    }
                    Item['List'] = dynamoDBJson2(data);
                    break;
                case Method2.emergence:
                    data = [] as boolean[][];
                    for (let i = 1; i <= 45; i++) {
                        const temp = this.processEmergedStatusForOne(i as LottoNumber);
                        data.push(temp);
                    }
                    Item['List'] = dynamoDBJson2(data);
                    break;
                case Method2.howLongNone:
                    data = this.processHowLongNone();
                    Item['List'] = dynamoDBJson2(data);
                    break;
                default:
                    data = this.processHelper(method);
                    Item["Ideal"] = dynamoDBJson(data.ideal);
                    Item["Actual"] = dynamoDBJson(data.actual);
                    Item["Coef"] = dynamoDBJson(data.coef);
            }
            const params = {
                Item,
                TableName: "LottoStat"
            };

            dynamoDB.putItem(params, function (err, data) {
                if (err) {
                    console.log(err, params.TableName, params.Item.Name);
                }
                else {
                    console.log(`write DB: ${params.TableName} - ${params.Item.Name.S}`);
                }
            });
        }
    }

    async readLottoStat(name:Method1 | Method2){
        const data = readLottoStat(name);
        return data;
    }

    async readAndWriteALL() {
        if (!this.didRead) {
            await this.readLottoData();
        }
        for (const name in Method1) {
            await this.writeLottoStat(name as Method1);
        }
        console.log('Method1 완료');
        for (const name in Method2) {
            await this.writeLottoStat(name as Method2);
        }
        console.log('Method2 완료');
    }

}