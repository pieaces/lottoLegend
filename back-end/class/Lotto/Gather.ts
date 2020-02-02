import Calculate from '../Calculate'
import Analyze from '../Analyze'
import Expectation, { Params } from './Expectation'
import { LottoNumber } from '../Generator/Base';

interface Helper extends Params {
    method: (numbers: number[]) => number;
}
interface AnalyzeHelper extends Params {
    method: (...something: any) => number[];
    one: LottoNumber;
}
export default class Gather extends Expectation {
    private gatherHelper(helper: Helper): number[] {
        const result = new Array<number>(helper.to - helper.from + 1).fill(0);
        Calculate.getData(this.getLNumbers(helper.mode), helper.method).forEach(value => {
            if (helper.from <= value && value <= helper.to) {
                result[value - helper.from]++;
            }
        });

        return result;
    }
    private gatherAnalzeHelper(helper: AnalyzeHelper): number[] {
        const temp = helper.method(this.getLNumbers(helper.mode), helper.one);
        const from = helper.from || 1, to = helper.to || 12;

        const result: number[] = new Array<number>(to - from + 1).fill(0);

        temp.forEach(value => {
            if (from <= value && value <= to)
                result[value - from]++;
        });
        return result;
    }

    gatherExcludedLineCount(params: Params = { from: 0, to: 4, mode: this.mode }): number[] {
        const helper: Helper = {
            method: Calculate.excludedLineCount,
            from: params.from || 0, to: params.to || 4, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
    //회차별 계산된 결과(LottoCal)를 종합.
    gatherLineCount(params: Params = { mode: this.mode }): number[] {
        return Analyze.posCount$10(this.getLNumbers(params.mode));
    }

    gatherEmergedRoundForOne(one: LottoNumber, mode = this.mode): number[] {
        return Analyze.emergedRoundForOne(this.getLData(mode), one);
    }
    gatherEmergedBooleanForOne(one: LottoNumber, mode = this.mode): boolean[] {
        return Analyze.emergedBooleanForOne(this.getLNumbers(mode), one);
    }
    gatherIntervalForOne(one: LottoNumber, params: Params = { from: 1, to: 12, mode: this.mode }): number[] {
        const analyzeHelper: AnalyzeHelper = {
            method: Analyze.intervalForOne,
            one,
            from: params.from || 1, to: params.to || 12, mode: params.mode || this.mode
        }

        return this.gatherAnalzeHelper(analyzeHelper);
    }
    gatherHowLongNone() { //HData[]
        return Analyze.howLongNone(this.getLData());
    }
    gatherFrequency(mode = this.mode): number[] {
        return Analyze.frequencyCount(this.getLNumbers(mode));
    }
    gatherHarmony(mode = this.mode) { //HarmonyData[]
        return Analyze.harmony(this.getLData(mode));
    }

    gatherCarryCount(params: Params = { mode: this.mode }): number[] {
        const carryCounts = Analyze.carryCount(this.getLNumbers(params.mode).reverse());

        const result = new Array<number>(7).fill(0);
        carryCounts.forEach(value => {
            result[value]++;
        });

        return result;
    }

    gatherLowCount(params: Params = { from: 0, to: 6, mode: this.mode }): number[] {
        const helper: Helper = {
            method: Calculate.lowCount,
            from: params.from || 0, to: params.to || 6, mode: params.mode || this.mode

        };
        return this.gatherHelper(helper);
    }
    gatherSum(params: Params = { from: 21, to: 255, mode: this.mode }): number[] {
        const helper: Helper = {
            method: Calculate.sum,
            from: params.from || 21, to: params.to || 255, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
    private gatherSumVersion(version:55|77, params: Params = { from: 21, to: 255, mode: this.mode }): number[] {
        let pack:number;
        if(version === 55) pack = 20;
        else if(version === 77) pack = 10;

        const from = params.from || 21;
        const to = params.to || 255;
        const result = new Array<number>(Math.floor((to - from) / pack) + 1).fill(0);
        Calculate.getData(this.getLNumbers(params.mode), Calculate.sum).forEach(value => {
            if (from <= value && value <= to) {
                result[Math.floor((value - from) / pack)]++;
            }
        });

        return result;
    }
    gatherSum55(params: Params = { from: 21, to: 255, mode: this.mode }): number[] {//21~255
        return this.gatherSumVersion(55);
    }
    gatherSum77(params: Params = { from: 21, to: 255, mode: this.mode }): number[] {//21~255
        return this.gatherSumVersion(77);
    }

    gatherOddCount(params: Params = { from: 0, to: 6, mode: this.mode }): number[] {
        let helper: Helper = {
            method: Calculate.oddCount,
            from: params.from || 0, to: params.to || 6, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
    gatherPrimeCount(params: Params = { from: 0, to: 6, mode: this.mode }): number[] {
        let helper: Helper = {
            method: Calculate.primeCount,
            from: params.from || 0, to: params.to || 6, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
    gather$3Count(params: Params = { from: 0, to: 6, mode: this.mode }): number[] {
        let helper: Helper = {
            method: Calculate.$3Count,
            from: params.from || 0, to: params.to || 6, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }

    gatherSum$10(params: Params = { from: 0, to: 24, mode: this.mode }): number[] {
        const helper: Helper = {
            method: Calculate.sum$10,
            from: params.from || 0, to: params.to || 24, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
    gatherSum$1(from: number, to: number, mode = this.mode): number[] {
        const helper: Helper = {
            method: Calculate.sum$1,
            from: 2, to: 52, mode
        };
        return this.gatherHelper(helper);
    }

    gatherDiffMaxMinData(params: Params = { from: 5, to: 44, mode: this.mode }): number[] {
        let helper: Helper = {
            method: Calculate.diffMaxMin,
            from: params.from || 5, to: params.to || 44, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }

    gatherAC(params: Params = { from: 0, to: 10, mode: this.mode }): number[] {
        let helper: Helper = {
            method: Calculate.AC,
            from: params.from || 0, to: params.to || 10, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }

    gatherConsecutiveExist(params: Params = { mode: this.mode }): number[] {
        const helper: Helper = {
            method: Calculate.consecutiveExist,
            from: params.from || 0, to: params.to || 1, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
}