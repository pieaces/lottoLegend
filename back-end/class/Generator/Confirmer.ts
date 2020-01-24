import { LottoNumber, Range } from "./Base";
import Configurer from './Configurer'
import Calculate from "../Statistics/Calculate";

const constraintSum = require('../../json/Generator/sum_compressed.json');

export default class Confirmer extends Configurer {
    protected checkOddCount(numbers: LottoNumber[]): boolean {
        return Calculate.oddCount(numbers) === this.oddCount;
    }
    protected checkPrimeCount(numbers: LottoNumber[]): boolean {
        return Calculate.primeCount(numbers) === this.primeCount;
    }
    protected check$3Count(numbers: LottoNumber[]): boolean {
        return Calculate.$3Count(numbers) === this.$3Count;
    }
    protected checkSum$10(numbers: LottoNumber[]): boolean {
        const sum$10 = Calculate.sum$10(numbers);
        return this.sum$10.from <= sum$10 && sum$10 <= this.sum$10.to;
    }
    protected checkSum(numbers: LottoNumber[]): boolean {
        const sum = Calculate.sum(numbers);
        return this.sum.from <= sum && sum <= this.sum.to;
    }
    protected checkDiffMinMax(numbers: LottoNumber[]): boolean {
        const diffMaxMin = Calculate.diffMaxMin(numbers);
        return this.diffMaxMin.from <= diffMaxMin && diffMaxMin <= this.diffMaxMin.to;
    }
    protected checkAC(numbers: LottoNumber[]): boolean {
        const AC = Calculate.AC(numbers);
        return this.AC.from <= AC && AC <= this.AC.to;
    }
    protected checkConsecutiveExist(numbers: LottoNumber[]): boolean {
        return Calculate.consecutiveExist(numbers) === 1 //1일경우 존재함. 0일경우 존재하지않음.
    }
    protected checkExceptedLines(numbers: LottoNumber[]): boolean {
            const set = new Set<number>();
            for(let i = 0; i<numbers.length; i++){
                set.add(Math.floor(numbers[i]/10));
            }
            for(let i=0; i<this.exceptedLines.length; i++){
                set.add(this.exceptedLines[i]);
            }
            return set.size === 5;
    }
    constraintSum():Range{
        const range = constraintSum[this.lowCount.toString() + this.exceptedLines.join('')];
        return {from:range[0], to:range[1]};
    }
}
