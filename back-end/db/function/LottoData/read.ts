import AWS from 'aws-sdk';
import { LData } from '../../../class/Lotto/Base';

AWS.config.update(require('../../key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function read(): Promise<LData[]> {
    var params = {
        TableName: "LottoData"
    };
    return await new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                console.log('LottoData - read 과정 에러', err);
                reject(err);
            }
            else {
                const item = data.Items;
                const lottoData = item.map(item => {
                    return {
                        round: Number(item.Round.N),
                        date: item.LDate.S,
                        bonusNum: Number(item.BonusNum.N),
                        numbers: item.Numbers.NS.map(value => Number(value)).sort((a, b) => a - b)
                    };
                });
                resolve(lottoData.sort((a, b) => a.round - b.round));
            }
        });
    });
}