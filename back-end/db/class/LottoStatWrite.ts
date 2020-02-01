import LottoProcessor, { ProcessedData, LottoDate } from './LottoProcessor'
import { Method } from '../../class/Lotto/Inter'
import { Assembly, Method2 } from './LottoProcessor'
import { LottoNumber } from '../../class/Generator/Base';

import AWS from 'aws-sdk';
import { LData, Mode } from '../../class/Lotto/Base';
AWS.config.update(require('../key.json'));
const dynamoDB = new AWS.DynamoDB();

export default class LottoStatWrite extends LottoProcessor {
    constructor(data: LData[], mode: Mode = data.length) {
        super(data, mode);
    }

    async writeLottoStat(method: Method | Method2): Promise<void> {
        let Item: any = { "Name": { S: method } };
        let data: ProcessedData | number[] | LottoDate[];
        switch (method) {
            case Method2.frequency:
                data = this.processFrequency();
                Item["list"] = dynamoDBJson(data);
                break;
            case Method2.interval:
                const temp: Array<number[]> = [];
                for (let i = 1; i <= 45; i++) {
                    const data = this.processIntervalForOne(i as LottoNumber);
                    temp.push(data);
                    Item['map'] = dynamoDBJson2(temp);
                }
                break;
            case Method2.emergence:
                const temp2: Array<boolean[]> = [];
                for (let i = 1; i <= 45; i++) {
                    const data = this.processEmergedStatusForOne(i as LottoNumber);
                    temp2.push(data);
                    Item[i] = dynamoDBJson2(temp2);
                }
                break;
            case Method2.howLongNone:
                data = this.processHowLongNone();
                Item['map'] = dynamoDBJson2(data);
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
function dynamoDBJson2(data: number[][] | boolean[][] | LottoDate[]) {
    if ("date" in data) {
        return {
            M: {
                "round": {
                    "N": data.round.toString()
                },
                "date": {
                    "S": data.date
                }
            }
        }
    }
}
function dynamoDBJson(data: Assembly | number[]) {
    if ("$12" in data) {
        return {
            M: {
                "$12": {
                    "L": data.$12.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "$24": {
                    "L": data.$24.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "$48": {
                    "L": data.$48.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "$192": {
                    "L": data.$192.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "all": {
                    "L": data.all.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "latest": {
                    "L": data.latest.map(item => {
                        return { "N": item.toString() };
                    })
                }
            }
        }
    } else {
        return {
            L: data.map(item => {
                return { "N": item.toString() };
            })
        }
    }
}