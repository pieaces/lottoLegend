import { Method } from '../../../class/Lotto/Inter'
import { Method2 } from '../../class/LottoProcessor'
import readLottoData from '../LottoData/read'
import LottoStatWrite from '../../class/LottoStatWrite'

export default function write() {
    readLottoData()
        .then(lottoData => {
            const lottoStatWrite = new LottoStatWrite(lottoData);

            for (const name in Method) {
                lottoStatWrite.writeLottoStat(name as Method);
            }
            for (const name in Method2) {
                lottoStatWrite.writeLottoStat(name as Method2);
            }
            console.log('LottoStat 입력 완료');
        })
        .catch(err => console.log(err));
}