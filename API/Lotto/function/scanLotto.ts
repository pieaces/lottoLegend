import { LData, LottoNumber } from '../interface/Lotto';
import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB();

export default function read(): Promise<LData[]> {
    var params = {
        TableName: "LottoData"
    };
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                console.log('LottoData - read 과정 에러', err);
                reject(err);
            }
            else {
                const item = data.Items;
                const lottoData:LData[] = item.map(item => {
                    return {
                        round: Number(item.Round.N),
                        date: item.LDate.S,
                        bonusNum: Number(item.BonusNum.N),
                        numbers: item.Numbers.NS.map(value => Number(value) as LottoNumber).sort((a, b) => a - b)
                    };
                });
                resolve(lottoData.sort((a, b) => a.round - b.round));
            }
        });
    });
}