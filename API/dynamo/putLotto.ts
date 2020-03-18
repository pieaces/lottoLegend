import axios from 'axios'
import { LData } from '../Lotto/interface/Lotto';
import dynamoDB from '.'
import { Method } from '../Lotto/interface/LottoDB';
import Calculate from '../Lotto/class/Calculate';
import Analyze from '../Lotto/class/Analyze';
import { setTimeout } from 'timers';
import { PutItemInput, NumberSetAttributeValue, GetItemInput } from 'aws-sdk/clients/dynamodb';
interface LottoData extends LData {
    winner: number;
    winAmount: number;
}
function lottoDataParser(data: any): LottoData {
    const numbers = [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6]
    const lotto: LottoData = { round: data.drwNo, numbers, date: data.drwNoDate, bonusNum: data.bnusNo, winner: data.firstPrzwnerCo, winAmount: data.firstWinamnt };
    return lotto;
}
export default async function putLotto(round: number): Promise<void> {
    const result = await (axios.get('http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=' + round));
    const lotto: LottoData = lottoDataParser(result.data);
    let before: any = null;
    let beforeLotto: LottoData = null;
    if (round > 1) {
        before = await (axios.get('http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=' + (round - 1)));
        beforeLotto = lottoDataParser(before.data);
    }
    console.log(`${round}회 읽기 성공`);

    var params: PutItemInput = {
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
            },
            "Winner": {
                N: lotto.winner.toString()
            },
            "WinAmount": {
                N: lotto.winAmount.toString()
            },
            "Stats": {
                M: {
                    [Method.excludedLineCount]: {
                        N: Calculate.excludedLineCount(lotto.numbers).toString()
                    },
                    [Method.lowCount]: {
                        N: Calculate.lowCount(lotto.numbers).toString()
                    },
                    [Method.excludedLineCount]: {
                        N: Calculate.excludedLineCount(lotto.numbers).toString()
                    },
                    [Method.sum]: {
                        N: Calculate.sum(lotto.numbers).toString()
                    },
                    [Method.oddCount]: {
                        N: Calculate.oddCount(lotto.numbers).toString()
                    },
                    [Method.primeCount]: {
                        N: Calculate.primeCount(lotto.numbers).toString()
                    },
                    [Method.$3Count]: {
                        N: Calculate.$3Count(lotto.numbers).toString()
                    },
                    [Method.sum$10]: {
                        N: Calculate.sum$10(lotto.numbers).toString()
                    },
                    [Method.diffMaxMin]: {
                        N: Calculate.diffMaxMin(lotto.numbers).toString()
                    },
                    [Method.AC]: {
                        N: Calculate.AC(lotto.numbers).toString()
                    },
                    [Method.consecutiveExist]: {
                        N: Calculate.consecutiveExist(lotto.numbers).toString()
                    },
                }
            },
            "Win": {
                M: {
                }
            },
            "Week": {
                NS: await getWeekNumberSet(round)
            }
        },
        TableName: "LottoData"
    };
    if (round > 1) {
        params.Item.Stats.M[Method.carryCount] = {
            N: Analyze.carryCount([beforeLotto.numbers, lotto.numbers])[0].toString()
        };
    }
    return new Promise((resolve, reject) => {
        dynamoDB.putItem(params, function (err: any) {
            if (err) reject(err);
            else {
                console.log(`${round}회 putLotto 성공`);
                resolve();
            }
        });
    });
}

function getWeekNumberSet(round: number): Promise<NumberSetAttributeValue> {
    const params: GetItemInput = {
        ProjectionExpression: 'Week',
        TableName: "LottoData",
        Key: {
            'Round': {
                N: round.toString()
            }
        },
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data.Item.Week.NS)
        });
    });
}

export async function writeAllLotto(until: number, from: number = 1): Promise<void> {
    let round = from;
    try {
        while (round <= until) {
            await putLotto(round++);
            console.log('*******')
        }
    } catch (err) {
        console.error('-----');
        setTimeout(() => writeAllLotto(until, round), 100);
    }
}