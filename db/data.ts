import Lotto from "../back-end/class/Lotto/Lotto";

const lotto: Lotto = new Lotto(require('../back-end/json/lotto.json'));

class LottoStat{
    actual:number[];
    ideal:number[];
    constructor(actual:number[], ideal:number[]){
        this.actual = actual;
        this.ideal = ideal.map(value => Number(value.toFixed(2)));
    }
}
const excludedLineCount:LottoStat = new LottoStat(
    lotto.gatherExcludedLineCount(),
    lotto.expectedExcludedLineCount()
);
const lineCount:LottoStat = new LottoStat(
    lotto.gatherLineCount(),
    lotto.expectedLineCount()
);

const intervalForOneWithin12:Array<number[]> = [];
for(let i =1; i<=45; i++){
    intervalForOneWithin12.push(lotto.gatherIntervalForOne(i));
}
const emergedRoundForOneWithin12:Array<number[]> = [];
for(let i =1; i<=45; i++){
    emergedRoundForOneWithin12.push(lotto.gatherEmergedRoundForOne(i, -12));
}
const howLongNone = lotto.gatherHowLongNone();
const frequency = lotto.gatherFrequency();


console.log(intervalForOneWithin12);
