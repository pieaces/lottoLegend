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
function cout(str: string, obj: any): void {
    console.log(str + ":", obj);
}

enum Mode { $1 = 1, $2 = 2, $4 = 4, $12 = 12, $24 = 24, $48 = 48, $96 = 96, $384 = 384, $ALL = LottoStat.getInstance().SIZE };
const lottoStat = new LottoStat(Mode.$ALL);

//cout('interval', lottoStat.intervalStats());
cout('odds...', lottoStat.gatherOddCount());