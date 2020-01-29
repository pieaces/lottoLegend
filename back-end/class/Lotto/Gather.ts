import Calculate from '../Statistics/Calculate'
import Analyze from '../Analyze/Analyze'
import Base, {LData, Mode} from './Base'
import ExpectationMixIn, {Params} from './ExpectationMixin'

interface Helper extends Params{
    method: (numbers: number[])=> number;
}

export default class Gather extends ExpectationMixIn(Base) {
    constructor(data: LData[], mode: Mode) {
        super(data);
        this.mode = mode;
    }

    private gatherHelper(helper:Helper):number[] {
        const result = new Array<number>(helper.to-helper.from+1).fill(0);
        Calculate.getData(this.getLNumbers(helper.mode), helper.method).forEach(value =>{
            if(helper.from <= value && value <= helper.to){
                result[value-helper.from]++;
            }
        });

        return result;
    }

    gatherExcludedLineCount(params:Params = {from:0, to:5, mode: this.mode}): number[] {
        const helper:Helper = {
            method:Calculate.excludedLineCount,
            from:params.from || 0, to:params.to || 5, mode:params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
    //회차별 계산된 결과(LottoCal)를 종합.
    gatherLineCount(params:Params = {mode: this.mode}): number[] {
        return Analyze.posCount$10(this.getLNumbers(params.mode));
    }

    gatherEmergedRoundForOne(one:number, mode:Mode=this.mode): number[] {
        return Analyze.emergedRoundForOne(this.getLData(mode), one);
    }
    gatherIntervalForOne(one:number, mode:Mode=this.mode): number[] {
        return Analyze.intervalForOne(this.getLNumbers(mode), one);
    }

    gatherLowCount(params:Params={from:0, to:6, mode: this.mode}): number[] {
        const helper:Helper = {
            method:Calculate.lowCount,
            from:params.from || 0, to:params.to || 6, mode: params.mode || this.mode

        };
        return this.gatherHelper(helper);
    }

    gatherSum$10(params:Params = {from:0, to:24, mode:this.mode}): number[] {
        const helper:Helper = {
            method:Calculate.sum$10,
            from:params.from || 0, to:params.to || 24, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
    gatherSum$1(from:number, to:number, mode:Mode = this.mode):number[] {
        const helper:Helper = {
            method:Calculate.sum$1,
            from:2, to:52, mode
        };
        return this.gatherHelper(helper);
    }
/*
    gatherSum(from:number, to:number, mode:number = this.mode):number[] {
        const helper:Helper = {
            method:Calculate.sum,
            from, to, mode
        };
        return this.gatherHelper(helper);
    }
*/
    gatherSum55(params:Params = {from:21, to:255, mode: this.mode}):number[] {//21~255
        const result = new Array<number>(Math.floor((params.to-params.from)/10)+1).fill(0);
        Calculate.getData(this.getLNumbers(params.mode), Calculate.sum).forEach(value =>{
            if(params.from <= value && value <= params.to){
                result[Math.floor((value-params.from)/10)]++;
            }
        });

        return result;
    }

    gatherOddCount(params:Params = {from:0, to:6, mode:this.mode}): number[] {
        let helper: Helper = {
            method: Calculate.oddCount,
            from:params.from || 0, to:params.to || 6, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
    gatherPrimeCount(params:Params = {from:0, to:6, mode:this.mode}): number[] {
        let helper: Helper = {
            method: Calculate.primeCount,
            from:params.from || 0, to:params.to || 6, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }
    gather$3Count(params:Params = {from:0, to:6, mode:this.mode}): number[] {
        let helper: Helper = {
            method: Calculate.$3Count,
            from:params.from || 0, to:params.to || 6, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }

    gatherAC(params:Params = {from:0, to:10, mode:this.mode}): number[] {
        let helper: Helper = {
            method: Calculate.AC,
            from:params.from || 0, to:params.to || 10, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }

    gatherDiffMaxMinData(params:Params = {from:5, to:44, mode:this.mode}): number[] {
        let helper: Helper = {
            method: Calculate.diffMaxMin,
            from:params.from || 5, to:params.to || 44, mode: params.mode || this.mode
        };
        return this.gatherHelper(helper);
    }

    gatherConsecutiveExist(mode:Mode = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.consecutiveExist,
            from:0, to:1, mode
        };
        return this.gatherHelper(helper);
    }
    gatherCarryCount(params:Params = {mode:this.mode}): number[] {
        return Analyze.carryCount(this.getLNumbers(params.mode).reverse());
    }

    gatherFrequencyPercent(mode: Mode = this.mode): number[] {
        return Analyze.frequencyCount(this.getLNumbers(mode)).map(value => value / this.getTotalSize());
    }

    gatherHowLongNone() { //HData[]
        return Analyze.howLongNone(this.getLData());
    }

    gatherHarmony(mode: Mode = this.mode) { //HarmonyData[]
        return Analyze.harmony(this.getLData(mode));
    }
}