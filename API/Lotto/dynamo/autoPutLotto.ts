import putLotto from './putLotto'
import LottoDB from '../class/LottoDB'
import counterLotto, { getCurrentRound } from './functions';
import dynamoDB from '.';
import { GetItemInput } from 'aws-sdk/clients/dynamodb';

export default async function autoPutLotto() {
    const total = getCurrentRound();
    const count = await counterLotto();
    console.log(`현재:${count}, 로또전체:${total}`);
    if (count < total) {
        try {
            await putLotto(total);

            const lottoDB = new LottoDB();
            await lottoDB.putALLStats();
            console.log('통계처리 자동화 완료');
            return true;
        } catch (err) {
            console.log('자동화 실패', err);
            return false;
        }
    } else {
        const { winAmount, winner } = await getWinAmountAndWinner();
        if (winAmount === 0 || winner === 0) {
            await putLotto(total);
            console.log('winner, winAmount 미입력상태 해결완료');
        } else {
            console.log(`업데이트가 필요없는 최신상태(count:${count}, total:${total})`);
        }
        return false;
    }
}

function getWinAmountAndWinner(): Promise<{ winAmount: number, winner: number }> {
    var params: GetItemInput = {
        TableName: "LottoData",
        Key: {
            Round: {
                N: getCurrentRound().toString()
            }
        },
        ProjectionExpression: 'WinAmount, Winner'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve({
                winAmount: Number(data.Item.WinAmount.N),
                winner: Number(data.Item.Winner.N)
            });
        });
    });
}