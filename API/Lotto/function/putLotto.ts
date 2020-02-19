import axios from 'axios'
import { LData } from '../interface/Lotto';
import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB();

export default async function putLotto(round: number):Promise<void> {
    const result = await (axios.get('http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=' + round));
    console.log(`${round}회 읽기 성공`);

    const data = result.data;
    const numbers = [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6]
    const lotto: LData = { round: data.drwNo, numbers, date: data.drwNoDate, bonusNum: data.bnusNo };

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

    return new Promise((resolve, reject) => {
        dynamodb.putItem(params, function (err, data) {
            if (err) reject('putLotto 에러: ' + err);
            else {
                console.log('putLotto 성공');
                resolve();
            }
        });
    });
}

export async function writeAllLotto(round: number) {
    for (let i = 1; i <= round; i++) {
        const bool = await putLotto(i);
        console.log(i, bool);
    }
}