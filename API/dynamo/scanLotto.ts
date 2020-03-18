import { LData, LottoNumber } from '../Lotto/interface/Lotto';
import dynamoDB from '.'

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
                const items = data.Items;
                const lottoData:LData[] = items.filter(item => 'Numbers' in item).map(item => {
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