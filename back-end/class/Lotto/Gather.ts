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

    gatherExcludedLineCount(mode:number = this.mode): number[] {
        const helper:Helper = {
            method:Calculate.excludedLineCount,
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

    gatherSum$10(numbers:number[], mode: number = this.mode): number[] {
        let helper: Helper = {
                method: Calculate.sum$10,
                from:0, to:24, mode
            };
        const temp:number[] = this.gatherHelper(helper);
        const result:number[] = [];
        numbers.forEach(value => {
            result.push(temp[value]);
        })

        return result;
    }
    gatherSum$1(from:number, to:number, mode:number = this.mode):number[] {
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
    gatherSum55(from:number, to:number, mode:number = this.mode):number[] {//21~255
        const result = new Array<number>(Math.floor((to-from)/10)+1).fill(0);
        Calculate.getData(this.getLNumbers(mode), Calculate.sum).forEach(value =>{
            if(from <= value && value <= to){
                result[Math.floor((value-from)/10)]++;
            }
        });

        return result;
    }

    gatherOddCount(numbers:number[], mode:number = this.mode): number[] {
        let helper: Helper = {
            method: Calculate.oddCount,
            from: 0, to: 6, mode
        };
        const temp: number[] = this.gatherHelper(helper);
        const result: number[] = [];
        numbers.forEach(value => {
            result.push(temp[value]);
        })

        return result;
    }
    gatherPrimeCount(numbers:number[], mode:number = this.mode): number[] {
        let helper: Helper = {
            method: Calculate.primeCount,
            from: 0, to: 6, mode
        };
        const temp: number[] = this.gatherHelper(helper);
        const result: number[] = [];
        numbers.forEach(value => {
            result.push(temp[value]);
        })

        return result;
    }
    gather$3Count(numbers:number[], mode:number = this.mode): number[] {
        let helper: Helper = {
            method: Calculate.$3Count,
            from: 0, to: 6, mode
        };
        const temp: number[] = this.gatherHelper(helper);
        const result: number[] = [];
        numbers.forEach(value => {
            result.push(temp[value]);
        })

        return result;
    }

    gatherAC(numbers:number[], mode:number = this.mode): number[] {
        let helper: Helper = {
            method: Calculate.AC,
            from: 0, to: 10, mode
        };
        const temp: number[] = this.gatherHelper(helper);
        const result: number[] = [];
        numbers.forEach(value => {
            result.push(temp[value]);
        })

        return result;
    }

    gatherDiffMaxMinData(from:number, to:number, mode:number = this.mode): number[] {
        const result = new Array<number>(Math.floor((to-from)/3)+1).fill(0);
        Calculate.getData(this.getLNumbers(mode), Calculate.diffMaxMin).forEach(value =>{
            if(from <= value && value <= to){
                result[Math.floor((value-from)/3)]++;
            }
        });

        return result;
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