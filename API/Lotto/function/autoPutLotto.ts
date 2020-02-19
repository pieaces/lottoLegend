import putLotto from './putLotto'
import LottoDB from '../class/LottoDB'
import counterLotto from './counterLotto';

export default async function autoPutLotto() {
    const theDate = new Date('2020-02-01:20:50');
    const today = new Date();
    const between = Number(today) - Number(theDate);
    const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);

    const total = 896 + plusDate;
    const count = await counterLotto();
    console.log(`현재:${count}, 로또전체:${total}`);

            const lottoDB = new LottoDB();
            await lottoDB.putALLStats();
            console.log('통계처리 자동화 완료');   

}