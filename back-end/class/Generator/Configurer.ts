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

    setLowCount(lowCount: ZeroToSix): void {
        this.lowCount = lowCount;
    }

    setOddCount(oddCount: ZeroToSix): void {
        this.oddCount = oddCount;
        this.onOddCount(true);
    }

    setPrimeCount(primeCount: ZeroToSix): void {
        this.primeCount = primeCount;
        this.onPrimeCount(true);
    }

    set$3Count($3Count: ZeroToSix): void {
        this.$3Count = $3Count;
        this.on$3Count(true);
    }

    setSum$10(sum$10: Range): void {
        this.sum$10 = sum$10;
        this.onSum$10(true);
    }

    setSum(sum: Range): void {
        this.sum = sum;
        this.onSum(true);
    }

    setDiffMaxMin(diffMaxMin: Range): void {
        this.diffMaxMin = diffMaxMin;
        this.onDiffMaxMin(true);
    }
    setAC(AC: Range): void {
        this.AC = AC;
        this.onAC(true);
    }
}