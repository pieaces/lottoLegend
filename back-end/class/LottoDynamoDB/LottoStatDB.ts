import LottoDB from './LottoDB';
import { Method } from '../LottoData/Base'
import { LottoNumber } from '../Generator/Base';
import dynamoDBJson, { dynamoData } from './function/dynamoDBJson'
import queryStats from './function/queryStats'

import AWS from 'aws-sdk';
AWS.config.update(require('./function/key.json'));
const dynamoDB = new AWS.DynamoDB();

export default class LottoStatDB extends LottoDB {
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
                    Item["Coef"] = dynamoDBJson(dbData.coef);
                    if (dbData.stats) {
                        Item["Stats"] = dynamoDBJson(dbData.stats);
                    }
                    break;
            }
            const params = {
                Item,
                TableName: "LottoStat"
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

    static async queryStat(name: Method) {
        const data = queryStats(name);
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