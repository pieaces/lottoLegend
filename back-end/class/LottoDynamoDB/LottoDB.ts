import { List } from 'immutable';
import { LData } from '../Lotto/Base';

import LottoProcess from "../LottoData/LottoProcess";
import scanLotto from './function/scanLotto'

export default class LottoDB extends LottoProcess{
    protected hasLotto = false;

    async scanLotto() {
        const lottoData: LData[] = await scanLotto();
        this.data = List<LData>(lottoData);
        this.TOTAL_SIZE = this.data.size;
        this.mode = this.TOTAL_SIZE;
        this.hasLotto = true;
    }
}