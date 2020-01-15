import * as readline from "readline"
import { returnAC } from './function'
import LottoStat, { Mode } from './class'

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
try {
    const lottoStat = new LottoStat(Mode.$2);
    //console.log(lottoStat.aveRatioOddEven());
    //console.log(lottoStat.aveSum());
    //console.log(lottoStat.aveRatio$10());
    //console.log(lottoStat.howLongNone());
    //console.log(lottoStat.getData());
    //console.log(lottoStat.harmony());
    //cout(lottoStat.aveGetMinMax());
    cout('posCount$1',lottoStat.posCount$1());
    cout('posCount$10',lottoStat.posCount$10());
    cout('sum',lottoStat.sum());
    cout('odd', lottoStat.oddCount());

    cout('min', lottoStat.min());
    cout('max', lottoStat.max());
    cout('diff', lottoStat.diffMaxMin());
} catch (err) {
    console.log(err);
}
