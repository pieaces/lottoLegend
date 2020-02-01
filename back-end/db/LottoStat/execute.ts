import { Method } from '../../class/Lotto/Inter'
import LottoProcessor from '../LottoProcessor'
import readLottoData from '../LottoData/read'
import {writeLottoStat1} from './write'

async function writeDynamoDB(name: Method) {
    const lottoData = await readLottoData();
    const lottoProcessor = new LottoProcessor(lottoData);
    writeLottoStat1(lottoProcessor.processHelper(name), name);
}

function writeAllIntoDynomoDB() {
    for (const name in Method) {
        writeDynamoDB(name as Method);
    }
}

writeDynamoDB(Method.excludedLineCount);