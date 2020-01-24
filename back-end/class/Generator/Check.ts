import Base, { GeneratorOption, LottoNumber, Range } from "./Base";
import Calculate from "../Statistics/Calculate";

const constraintSum = require('../../json/Generator/sum_compressed.json');

export default class Confirmer extends Base {
    constructor(option: GeneratorOption){
        super(option);
    }
    protected checkOddCount(numbers: LottoNumber[]): boolean {
        return Calculate.oddCount(numbers) === this.option.oddCount;
    }
    protected checkPrimeCount(numbers: LottoNumber[]): boolean {
        return Calculate.primeCount(numbers) === this.option.primeCount;
    }
    protected check$3Count(numbers: LottoNumber[]): boolean {
        return Calculate.$3Count(numbers) === this.option.$3Count;
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
            for(let i = 0; i<numbers.length; i++){
                set.add(Math.floor(numbers[i]/10));
            }
            for(let i=0; i<this.option.exceptedLines.length; i++){
                set.add(this.option.exceptedLines[i]);
            }
            return set.size === 5;
    }
    constraintSum():Range{
        const range = constraintSum[this.option.lowCount.toString() + this.option.exceptedLines.join('')];
        return {from:range[0], to:range[1]};
    }
}
