/*
전회차 번호 표시 => 포함 및 제외
뜨거운 수, 차가운 수 표시 => 포함 및 제외
제외할 공색(0,1,2,3,4) 중 택
저값(0~6) 값
십의자리 합(0~24) 범위
번호합 (21~255) 범위
고저차(5~44) 범위
AC값(0~10) 값 or 범위
홀수갯수(0~6) 값
소수갯수(0~6) 값
3의배수 갯수(0~6) 값
이월갯수(0~6) 값 => 포함할 수 선택 나머지 제외.
번호빈도 => 미출현번호, 차가운수 '포함할 수'
번호빈도 => 뜨거운 수 최근 출현빈도, 번호간격, '제외할 수'
연속번호 제외여부
*/
import Calculate from '../Statistics/Calculate'
import { Range } from 'immutable';

export type ZeroToFour = 0 | 1 | 2 | 3 | 4;
export type ZeroToSix = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type LottoNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45;
export type Range = { from: number, to: number };

const constraintSum$10 = require('../../json/Generator/sum$10.json');
const constraintSum = require('../../json/Generator/sum_compressed.json');
const constraintDiffMaxMin = require('../../json/Generator/diffMaxMin_compressed.json');
const constraintAC = require('../../json/Generator/AC_compressed.json');

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