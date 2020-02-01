import AWS from 'aws-sdk';
import axios from 'axios'
import {LData} from '../../../class/Lotto/Base'

AWS.config.update(require('../../key.json'));
const dynamodb = new AWS.DynamoDB();

async function getLotto(round: number): Promise<boolean> {
    const bool = await axios.get('http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=' + round)
        .then(result => {
            const data = result.data;

            const numbers = [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6]
            const lotto:LData = {round:data.drwNo, numbers, date:data.drwNoDate, bonusNum:data.bnusNo};

            var params = {
                Item: {
                    "Round": {
                        N: lotto.round.toString()
                    },
                    "LDate": {
                        S: lotto.date
                    },
                    "Numbers": {
                        NS: lotto.numbers.map(value => value.toString())
                    },
                    "BonusNum": {
                        N: lotto.bonusNum.toString()
                    }
                },
                TableName: "LottoData"
            };

            dynamodb.putItem(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else console.log('success');
            });
            return true;
        })
        .catch(err => {
            return false
        });

    return bool;
}

async function writeAllLotto(round:number) {
    for (let i = 1; i <= round; i++) {
        const bool = await getLotto(i);
        console.log(i, bool);
    }
}