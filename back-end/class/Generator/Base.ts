/*
1. 이월수 => 포함 및 제외 최소 5제외
2. 차가운 수 => 포함
3. 뜨거운 수 => 제외
4. 전멸번호 => 제외
5. 번호합(21~255) => 필터
6. 홀수갯수(0~6) => 필터
7. 소수갯수(0~6) => 필터
8. 3배수갯수(0~6) => 필터
9. 저갯수(0~6) => 필터
10. 고저차(5~44) => 필터
11. 첫수합(0~24) => 필터
12. AC(0~10) => 필터

+ 궁합수, 끝수합, 연속번호 제외여부
*/
import Calculate from '../Statistics/Calculate'
import { Range } from 'immutable';

export type ZeroToFour = 0 | 1 | 2 | 3 | 4;
export type ZeroToSix = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type LottoNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45;
export type Range = { from: number, to: number };

export default class GeneratorBase {
    protected exceptedLines: ZeroToFour[];
    protected lowCount: ZeroToSix;
    protected oddCount: ZeroToSix;
    protected primeCount: ZeroToSix;
    protected $3Count: ZeroToSix;
    protected sum$10: Range = {from:0, to:24};
    protected sum: Range = {from:21, to:255};
    protected diffMaxMin: Range = {from: 5, to: 44};
    protected AC: Range = {from:0, to:10};
    protected includeNumbers: LottoNumber[] = [];
    protected excludeNumbers: LottoNumber[] = [];
    private capableNumbers: LottoNumber[] = [];

    constructor() {
        for (let i = 0; i < 45; i++) {
            this.capableNumbers[i] = i + 1 as LottoNumber;
        }
    }

    getCapableNumbers(): LottoNumber[] {
        return this.capableNumbers;
    }

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