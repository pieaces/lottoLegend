/*
1. 제외할 공색(0,1,2,3,4) 중 택
2. 저값(0~6) 값
3. 홀수갯수(0~6) 값
4. 소수갯수(0~6) 값
5. 3의배수 갯수(0~6) 값
6. 십의자리 합(0~24) 범위
7. 번호합 (21~255) 범위
8. 고저차(5~44) 범위
9. AC값(0~10) 값 or 범위
10 이월갯수(0~6) 값 => 포함할 수 선택 나머지 제외.
11. 번호빈도 => 미출현번호, 차가운수 '포함할 수'
12. 번호빈도 => 뜨거운 수 최근 출현빈도, 번호간격, '제외할 수'
*/
import Calculate from '../Statistics/Calculate'
import { Range } from 'immutable';

export type ZeroToFour = 0 | 1 | 2 | 3 | 4;
export type ZeroToSix = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type LottoNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45;
export type Range = { from: number, to: number };

export default class GeneratorBase {
    protected exceptedLines: ZeroToFour[] = [2];
    protected lowCount: ZeroToSix = 3;
    protected oddCount: ZeroToSix = 3;
    protected primeCount: ZeroToSix = 2;
    protected $3Count: ZeroToSix = 2;
    protected sum$10: Range = { from: 9, to: 15 };
    protected sum: Range;
    protected diffMaxMin: Range = { from: 25, to: 40 };
    protected AC: Range = { from: 7, to: 9 };
    protected includeNumber: LottoNumber[] = [];
    protected excludeNumber: LottoNumber[] = [];
    private capableNumbers: LottoNumber[] = [];

    constructor() { }

    getCapableNumbers(): LottoNumber[] {
        return this.capableNumbers;
    }
    setInclude(includeNumber: LottoNumber[]): boolean {
        includeNumber.forEach(value => {
            if (this.capableNumbers.indexOf(value) === -1) {
                console.log('!');
                return false;
            }
        })
        if (Calculate.oddCount(includeNumber) > this.oddCount) {
            console.log('!!');
            return false;
        }
        if (Calculate.primeCount(includeNumber) > this.primeCount) {
            console.log('!!!');

            return false;
        }
        if (Calculate.$3Count(includeNumber) > this.$3Count) {
            console.log('!!!!');
            return false;
        }
        if (this.sum$10.to <= Calculate.sum$10(includeNumber)) {
            console.log('!!!!!');
            return false;
        }
        this.includeNumber = includeNumber;
        return true;
    }
    setExclude(excludeNumber: LottoNumber[]): boolean {
        const copy: LottoNumber[] = [];
        this.capableNumbers.forEach((value, i) => copy[i] = value);

        excludeNumber.forEach(value => {
            const index = this.capableNumbers.indexOf(value);
            if (index === -1) {
                this.capableNumbers = copy;
                return false;
            }
            this.capableNumbers.splice(index, 1);
        });
        if (Calculate.oddCount(this.capableNumbers) < this.oddCount) {
            this.capableNumbers = copy;
            return false;
        }
        if (Calculate.primeCount(this.capableNumbers) < this.primeCount) {
            this.capableNumbers = copy;
            return false;
        }
        if (Calculate.$3Count(this.capableNumbers) < this.$3Count) {
            this.capableNumbers = copy;
            return false;
        }
        if (Calculate.sum$10(this.capableNumbers) < this.sum$10.from) {
            this.capableNumbers = copy;
            return false;
        }
        if (Calculate.sum(this.capableNumbers) < this.sum.from) {
            this.capableNumbers = copy;
            return false;
        }
        this.excludeNumber = excludeNumber;
        return true;
    }
    setExceptedLines(exceptedLines: ZeroToFour[]): boolean {
        this.exceptedLines = exceptedLines;

        this.capableNumbers = [];
        for (let i = 1; i <= 45; i++) {
            const existExcept = exceptedLines.indexOf(<ZeroToFour>Math.floor(i / 10));
            if (existExcept === -1) {
                this.capableNumbers.push(i as LottoNumber);
            }
        }

        return true;
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

        const constraint: number[] = require('../../json/sum$10.json')[this.lowCount.toString() + this.exceptedLines.join('')];

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
        const constraint: number[] = require('../../json/sum_compressed.json')[this.lowCount.toString() + this.exceptedLines.join('')];
        if (sum.from <= constraint[1] && sum.to >= constraint[0]) {
            this.sum = sum;
            return true;
        }
        return false;
    }

    setDiffMaxMin(diffMaxMin: Range): boolean {
        if (this.capableNumbers.length === 0) return false;

        const constraint: number[] = require('../../json/diffMaxMin_compressed.json')[this.lowCount.toString() + this.exceptedLines.join('')];

        if (diffMaxMin.from <= constraint[1] && diffMaxMin.to >= constraint[0]) {
            this.diffMaxMin = diffMaxMin;
            return true;
        }
        return false;
    }
    setAC(AC: Range): boolean {
        if (this.capableNumbers.length === 0) return false;

        const constraint: number[] = require('../../json/AC_compressed.json')[this.lowCount.toString() + this.exceptedLines.join('')];

        if (AC.from <= constraint[1] && AC.to >= constraint[0]) {
            this.AC = AC;
            return true;
        }

        return false;
    }
}

const gen = new GeneratorBase();
gen.setExceptedLines([0, 1, 2]);
console.log(gen.setLowCount(0));