import Base from "./Base";
import Calculate from "../Calculate";

import { LottoNumber, ZeroToSix } from "../../../interface/Generator";
import { GeneratorOption, Range } from "../../../interface/Generator";
import constraintLowCount from '../../data/lowCount'
import constraintSum from '../../data/sum'
import constraintSumNotExcluded from '../../data/sum_notExcluded'

export default class Confirmer extends Base {
    constructor(option: GeneratorOption) {
        super(option);
    }
    protected checkOddCount(numbers: LottoNumber[]): boolean {
        const oddCount = Calculate.oddCount(numbers);
        return this.option.oddCount.indexOf(oddCount as ZeroToSix) !== -1;
    }
    protected checkPrimeCount(numbers: LottoNumber[]): boolean {
        const primeCount = Calculate.primeCount(numbers);
        return this.option.primeCount.indexOf(primeCount as ZeroToSix) !== -1;
    }
    protected check$3Count(numbers: LottoNumber[]): boolean {
        const $3Count = Calculate.$3Count(numbers);
        return this.option.$3Count.indexOf($3Count as ZeroToSix) !== -1;
    }
    protected checkSum$10(numbers: LottoNumber[]): boolean {
        const sum$10 = Calculate.sum$10(numbers);
        return this.option.sum$10.indexOf(sum$10 as ZeroToSix) !== -1;
    }
    protected checkSum(numbers: LottoNumber[]): boolean {
        const sum = Calculate.sum(numbers);
        for(let i =0; i<this.option.sum.length; i++){
            if(this.option.sum[i].from <= sum && sum <= this.option.sum[i].to) return true;
        }
        return false;
    }
    protected checkDiffMinMax(numbers: LottoNumber[]): boolean {
        const diffMaxMin = Calculate.diffMaxMin(numbers);
        return this.option.diffMaxMin.indexOf(diffMaxMin as ZeroToSix) !== -1;
    }
    protected checkAC(numbers: LottoNumber[]): boolean {
        const AC = Calculate.AC(numbers);
        return this.option.AC.indexOf(AC as ZeroToSix) !== -1;
    }
    protected checkConsecutiveExist(numbers: LottoNumber[]): boolean {
        return Calculate.consecutiveExist(numbers) === 1 //1일경우 존재함. 0일경우 존재하지않음.
    }
    protected checkExceptedLines(numbers: LottoNumber[]): boolean {
        const set = new Set<number>();
        for (let i = 0; i < numbers.length; i++) {
            set.add(Math.floor(numbers[i] / 10));
        }
        for (let i = 0; i < this.option.excludedLines.length; i++) {
            set.add(this.option.excludedLines[i]);
        }
        return set.size === 5;
    }
    constraintLowCount(): Range {
        const range = constraintLowCount[this.option.excludedLines.join('')];
        return { from: range[0], to: range[1] };
    }
    constraintSum(): Range {
        if (this.option.excludedLines) {
            const range = constraintSum[this.option.lowCount.toString() + this.option.excludedLines.join('')];
            return { from: range[0], to: range[1] };
        } else {
            const range = constraintSumNotExcluded[this.option.lowCount.toString()];
            return { from: range[0], to: range[1] };
        }
    }
}
