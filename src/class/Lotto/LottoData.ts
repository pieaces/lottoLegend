import Calculate from '../Statistics/Calculate'
import Analyze from '../Analyze/Analyze'
import LottoBase, {LData} from './LottoBase'
import factMixedIn from './factMixedIn'

interface Helper{
    method: (numbers: number[])=> number;
    from: number;
    to: number;
    mode: number;
}
export default class LottoData extends factMixedIn(LottoBase) {
    public mode: number;
    constructor(data: LData[], mode: number) {
        super(data);
        this.mode = mode;
    }

    private gatherHelper(helper:Helper):number[] {
        const result = new Array<number>(helper.to - helper.from + 1).fill(0);
        Calculate.getData(this.getLNumbers(helper.mode), helper.method).forEach(num => result[num - helper.from]++);
        return result;
    }

    //회차별 계산된 결과(LottoCal)를 종합.
    gatherLineCount(mode:number = this.mode): number[] {
        return Analyze.posCount$10(this.getLNumbers(mode));
    }

    gatherSum$10(mode:number = this.mode):number[] {
        const helper:Helper = {
            method:Calculate.sum$10,
            from:0, to:24, mode
        };
        return this.gatherHelper(helper);
    }

    gatherOddCount(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.sum,
            from:0, to:6, mode
        };
        return this.gatherHelper(helper);
    }
    gather$3Count(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.$3Count,
            from:0, to:6, mode
        };
        return this.gatherHelper(helper);
    }

    gatherAC(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.AC,
            from:0, to:10, mode
        };
        return this.gatherHelper(helper);
    }

    gatherDiffMaxMinData(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.AC,
            from:5, to:44, mode
        };
        return this.gatherHelper(helper);
    }

    gatherCarry(mode:number = this.mode): number[] {
        return Analyze.carry(this.getLNumbers(mode).reverse());
    }

    gatherFrequencyPercent(mode: number = this.mode): number[] {
        return Analyze.frequencyCount(this.getLNumbers(mode)).map(value => value / this.getTotalSize());
    }

    gatherHowLongNone() { //HData[]
        return Analyze.howLongNone(this.getLData());
    }

    gatherHarmony(mode: number = this.mode) { //HarmonyData[]
        return Analyze.harmony(this.getLData(mode));
    }
}