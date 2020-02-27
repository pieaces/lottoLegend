import Base from "./Base";
import Calculate from "../Calculate";

import { LottoNumber } from "../../interface";
import { GeneratorOption, Range } from "../../interface";
import constraintLowCount from '../../data/lowCount'
import constraintSum from '../../data/sum'
import constraintSumNotExcluded from '../../data/sum_notExcluded'

export default class Confirmer extends Base {
    constructor(option: GeneratorOption) {
        super(option);
    }
    protected checkOddCount(numbers: LottoNumber[]): boolean {
        const oddCount = Calculate.oddCount(numbers);
        return this.option.oddCount.from <= oddCount && oddCount <= this.option.oddCount.to;
    }
    protected checkPrimeCount(numbers: LottoNumber[]): boolean {
        const primeCount = Calculate.primeCount(numbers);
        return this.option.primeCount.from <= primeCount && primeCount <= this.option.primeCount.to;
    }
    protected check$3Count(numbers: LottoNumber[]): boolean {
        const $3Count = Calculate.$3Count(numbers);
        return this.option.$3Count.from <= $3Count && $3Count <= this.option.$3Count.to;
    }
    protected checkSum$10(numbers: LottoNumber[]): boolean {
        const sum$10 = Calculate.sum$10(numbers);
        return this.option.sum$10.from <= sum$10 && sum$10 <= this.option.sum$10.to;
    }
    protected checkSum(numbers: LottoNumber[]): boolean {
        const sum = Calculate.sum(numbers);
        return this.option.sum.from <= sum && sum <= this.option.sum.to;
    }
    protected checkDiffMinMax(numbers: LottoNumber[]): boolean {
        const diffMaxMin = Calculate.diffMaxMin(numbers);
        return this.option.diffMaxMin.from <= diffMaxMin && diffMaxMin <= this.option.diffMaxMin.to;
    }
    protected checkAC(numbers: LottoNumber[]): boolean {
        const AC = Calculate.AC(numbers);
        return this.option.AC.from <= AC && AC <= this.option.AC.to;
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
