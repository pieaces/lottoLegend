import putLotto from './putLotto'
import LottoDB from '../class/LottoDB'

export default async function autoPutLotto(){
    const theDate = new Date('2020-02-01:20:50');
    const today = new Date();
    const between = Number(today) - Number(theDate);
    const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);

    const total = 896 + plusDate;
    const bool = await putLotto(total);
    if(bool){
        console.log(`${total}회 로또 데이터 자동화 입력 완료`);
        const lottoDB = new LottoDB();
        lottoDB.putALLStats()
        .then(()=> console.log('통계처리 자동화 완료'))
        .catch(err => console.log('통계처리 자동화 입력 실패', err));
    }else{
        console.log(`${total}회 로또 데이터 자동화 입력 실패!`);
    }
}