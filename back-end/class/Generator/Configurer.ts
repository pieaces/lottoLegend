import Base, { LottoNumber, ZeroToFour, ZeroToSix, Range } from "./Base"

export default class GeneratorConfigure extends Base {
    constructor(){super();}

    setInclude(includeNumbers: LottoNumber[]): void {
        this.includeNumbers = includeNumbers;
    }
    setExclude(excludeNumbers: LottoNumber[]): void {
        this.excludeNumbers = excludeNumbers;
    }

    addInclude(includeNumbers: LottoNumber[]): void {
        this.includeNumbers.push(...includeNumbers);
    }
    addExclude(excludeNumbers: LottoNumber[]): void {
        this.excludeNumbers.push(...excludeNumbers);
    }

    setExceptedLines(exceptedLines: ZeroToFour[]): void {
        this.exceptedLines = exceptedLines;
    }

    setConsecutiveExclude(check: boolean): void{
        this.consecutiveExclude = check;
    }
    setLowCount(lowCount: ZeroToSix): void {
        this.lowCount = lowCount;
    }

    setOddCount(oddCount: ZeroToSix): void {
        this.oddCount = oddCount;
    }

    setPrimeCount(primeCount: ZeroToSix): void {
        this.primeCount = primeCount;
    }

    set$3Count($3Count: ZeroToSix): void {
        this.$3Count = $3Count;
    }

    setSum$10(sum$10: Range): void {
        this.sum$10 = sum$10;
    }

    setSum(sum: Range): void {
        this.sum = sum;
    }

    setDiffMaxMin(diffMaxMin: Range): void {
        this.diffMaxMin = diffMaxMin;
    }
    setAC(AC: Range): void {
        this.AC = AC;
    }
}