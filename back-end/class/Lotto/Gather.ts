import Calculate from '../Statistics/Calculate'
import Analyze from '../Analyze/Analyze'
import Base, {LData} from './Base'
import ExpectationMixIn from './ExpectationMixin'

interface Helper{
    method: (numbers: number[])=> number;
    from: number;
    to: number;
    mode: number;
}
export default class Gather extends ExpectationMixIn(Base) {
    constructor(data: LData[], mode: number) {
        super(data);
        this.mode = mode;
    }

    private gatherHelper(helper:Helper):number[] {
        const result = new Array<number>(helper.to - helper.from + 1).fill(0);
        Calculate.getData(this.getLNumbers(helper.mode), helper.method).forEach(num => result[num - helper.from]++);
        return result;
    }

    gatherExceptedLineCount(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.exceptedLineCount,
            from:0, to:5, mode
        };
        return this.gatherHelper(helper);
    }
    //회차별 계산된 결과(LottoCal)를 종합.
    gatherLineCount(mode:number = this.mode): number[] {
        return Analyze.posCount$10(this.getLNumbers(mode));
    }

    gatherEmergedRoundForOne(one:number, mode:number=this.mode): number[] {
        return Analyze.emergedRoundForOne(this.getLData(mode), one);
    }
    gatherIntervalForOne(one:number, mode:number=this.mode): number[] {
        return Analyze.intervalForOne(this.getLNumbers(mode), one);
    }

    gatherLowCount(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.lowCount,
            from:0, to:6, mode
        };
        return this.gatherHelper(helper);
    }

    gatherSum$10(mode:number = this.mode):number[] {
        const helper:Helper = {
            method:Calculate.sum$10,
            from:0, to:24, mode
        };
        return this.gatherHelper(helper);
    }
    gatherSum$1(mode:number = this.mode):number[] {
        const helper:Helper = {
            method:Calculate.sum$1,
            from:2, to:52, mode
        };
        return this.gatherHelper(helper);
    }
    gatherSum(mode:number = this.mode):number[] {
        const helper:Helper = {
            method:Calculate.sum,
            from:21, to:255, mode
        };
        return this.gatherHelper(helper);
    }

    gatherOddCount(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.oddCount,
            from:0, to:6, mode
        };
        return this.gatherHelper(helper);
    }
    gatherPrimeCount(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.primeCount,
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
            method:Calculate.diffMaxMin,
            from:5, to:44, mode
        };
        return this.gatherHelper(helper);
    }

    gatherConsecutiveExist(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.consecutiveExist,
            from:0, to:1, mode
        };
        return this.gatherHelper(helper);
    }
    gatherCarryCount(mode:number = this.mode): number[] {
        return Analyze.carryCount(this.getLNumbers(mode).reverse());
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