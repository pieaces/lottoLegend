import { List } from 'immutable';
import { LData } from '../Lotto/Base';

import LottoData from "../LottoData";
import scanLotto from './function/scanLotto'

export default class LottoDB extends LottoData{
    protected hasLotto = false;

    async scanLotto() {
        const lottoData: LData[] = await scanLotto();
        this.data = List<LData>(lottoData);
        this.TOTAL_SIZE = this.data.size;
        this.mode = this.TOTAL_SIZE;
        this.hasLotto = true;
    }
}