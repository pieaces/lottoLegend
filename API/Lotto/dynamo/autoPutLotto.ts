import putLotto from './putLotto'
import LottoDB from '../class/LottoDB'
import counterLotto, { getCurrentRound } from './functions';

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
        console.log(`업데이트가 필요없는 최신상태(count:${count}, total:${total})`);
        return false;
    }
}