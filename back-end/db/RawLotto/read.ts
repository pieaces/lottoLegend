import AWS from 'aws-sdk';
import Lotto from '../../class/Lotto/Lotto'
import {LData} from '../../class/Lotto/Base'

AWS.config.update(require('./key.json'));
const dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "LottoData"
};
dynamodb.scan(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
        const lottos:LData[] = [];
        data.Items.forEach((lotto)=>{
            lottos.push({
                round:Number(lotto.Round.N),
                numbers:lotto.Numbers.NS.map(value => Number(value)).sort((a,b)=>a-b),
                date:lotto.LDate.S,
                bonusNum:Number(lotto.BonusNum.N)
            });
        });
        const lotto = new Lotto(lottos.sort((a, b)=> b.round - a.round));
        console.log(lotto.statsOddCount());
    }
});