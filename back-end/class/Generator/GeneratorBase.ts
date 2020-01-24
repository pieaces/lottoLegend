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
    protected sum$10: Range;
    protected sum: Range;
    protected diffMaxMin: Range;
    protected AC: Range;
    protected consecutiveExclude: boolean = false;
    protected includeNumbers: LottoNumber[] = [];
    protected excludeNumbers: LottoNumber[] = [];
    private capableNumbers: LottoNumber[] = [];

    constructor() {
        for(let i =0; i<45; i++){
            this.capableNumbers[i] = i+1 as LottoNumber;
        }
    }

    getCapableNumbers(): LottoNumber[] {
        return this.capableNumbers;
    }

    setInclude(includeNumbers: LottoNumber[]): void {
        this.includeNumbers = includeNumbers;
    }
    setExclude(excludeNumbers: LottoNumber[]): void {
        for(let i=this.capableNumbers.length-1; i>=0; i--){
            if(excludeNumbers.indexOf(this.capableNumbers[i]) !== -1) this.capableNumbers.splice(i, 1);
        }
        
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

        this.capableNumbers = [];
        for (let i = 1; i <= 45; i++) {
            const existExcept = exceptedLines.indexOf(<ZeroToFour>Math.floor(i / 10));
            if (existExcept === -1) {
                this.capableNumbers.push(i as LottoNumber);
            }
        }
    }

    setLowCount(lowCount: ZeroToSix): boolean {
        if (this.capableNumbers.length === 0) return false;

        if (Calculate.lowCount(this.capableNumbers) >= lowCount) {
            this.lowCount = lowCount;
            return true;
        } else {
            return false;
        }
    }

    setOddCount(oddCount: ZeroToSix): boolean {
        if (this.capableNumbers.length === 0) return false;

        if (Calculate.oddCount(this.capableNumbers) >= oddCount) {
            this.oddCount = oddCount;
            return true;
        } else {
            return false;
        }
    }

    setPrimeCount(primeCount: ZeroToSix): boolean {
        if (this.capableNumbers.length === 0) return false;

        if (Calculate.primeCount(this.capableNumbers) >= primeCount) {
            this.primeCount = primeCount;
            return true;
        } else {
            return false;
        }
    }

    set$3Count($3Count: ZeroToSix): boolean {
        if (this.capableNumbers.length === 0) return false;

        if (Calculate.$3Count(this.capableNumbers) >= $3Count) {
            this.$3Count = $3Count;
            return true;
        } else {
            return false;
        }
    }

    setSum$10(sum$10: Range): boolean {
        if (this.capableNumbers.length === 0) return false;

        const constraint: number[] = constraintSum$10[this.lowCount.toString() + this.exceptedLines.join('')];

        for (let i = 0; i < constraint.length; i++) {
            if (sum$10.from <= constraint[i] && constraint[i] <= sum$10.to) {
                this.sum$10 = sum$10;
                return true;
            }
        }

        return false;
    }

    setSum(sum: Range): boolean {
        if (this.capableNumbers.length === 0) return false;

        //5단위로 할 것
        const constraint: number[] = constraintSum[this.lowCount.toString() + this.exceptedLines.join('')];
        if (sum.from <= constraint[1] && sum.to >= constraint[0]) {
            this.sum = sum;
            return true;
        }
        return false;
    }

    setDiffMaxMin(diffMaxMin: Range): boolean {
        if (this.capableNumbers.length === 0) return false;

        const constraint: number[] = constraintDiffMaxMin[this.lowCount.toString() + this.exceptedLines.join('')];

        if (diffMaxMin.from <= constraint[1] && diffMaxMin.to >= constraint[0]) {
            this.diffMaxMin = diffMaxMin;
            return true;
        }
        return false;
    }
    setAC(AC: Range): boolean {
        if (this.capableNumbers.length === 0) return false;

        const constraint: number[] = constraintAC[this.lowCount.toString() + this.exceptedLines.join('')];

        if (AC.from <= constraint[1] && AC.to >= constraint[0]) {
            this.AC = AC;
            return true;
        }

        return false;
    }

    setConsecutiveExclude(check: boolean): boolean {
        this.consecutiveExclude = check;
        return true;
    }
}