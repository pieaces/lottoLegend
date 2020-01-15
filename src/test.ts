import * as readline from "readline"
import LottoStat from './class/LottoStat'

/*
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Input numbers: ", (answer: string) => {
    const arr: number[] = answer.split(' ').map((item: string) => Number(item)).sort((a, b) => a - b);
    console.log(arr);

    const acValue: number = returnAC(arr);
    console.log(acValue);
    rl.close();
});
*/
function cout(str:string, obj:any):void{
    console.log(str + ":", obj);
}

export enum Mode { $1 = 1, $2 = 2, $12 = 12, $24 = 24, $48 = 48, $96 = 96, $384 = 384};
try {
    const lottoStat = new LottoStat();
    lottoStat.setData(LottoStat.allLotto.getNumbers());

    /*
    cout('posCount$1',lottoStat.posCount$1());
    cout('posCount$10',lottoStat.posCount$10());
    cout('sum',lottoStat.sum());
    cout('odd', lottoStat.oddCount());
    cout('min', lottoStat.min());
    cout('max', lottoStat.max());
    cout('diff', lottoStat.diffMaxMin());
    cout('AC', lottoStat.AC());
    */
   cout('frequency', lottoStat.frequencyPercent());
} catch (err) {
    console.log(err);
}