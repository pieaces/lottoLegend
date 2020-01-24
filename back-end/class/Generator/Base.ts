import { Range } from 'immutable';

export type ZeroToFour = 0 | 1 | 2 | 3 | 4;
export type ZeroToSix = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type LottoNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45;
export type Range = { from: number, to: number };

export default class Base {
    protected exceptedLines: ZeroToFour[];
    protected lowCount: ZeroToSix;
    protected oddCount: ZeroToSix;
    protected primeCount: ZeroToSix;
    protected $3Count: ZeroToSix;
    protected sum: Range = {from:21, to:255};
    protected sum$10: Range = {from:0, to:24};
    protected diffMaxMin: Range = {from: 5, to: 44};
    protected AC: Range = {from:0, to:10};
    protected includeNumbers: LottoNumber[] = [];
    protected excludeNumbers: LottoNumber[] = [];
    //
    protected stautsConsecutive: boolean = false;
    protected statusSum:boolean = false;
    protected statusSum$10:boolean = false;
    protected statusDiffMaxMin:boolean = false;
    protected statusOddCount:boolean = false;
    protected statusPrimeCount:boolean = false;
    protected status$3Count:boolean = false;
    protected statusAC:boolean = false;
    protected constructor() {}

    onConsecutiveExclude(check: boolean=true): void {
        this.stautsConsecutive = check;
    }
    onSum(check: boolean=true): void {
        this.statusSum = check;
    }
    onSum$10(check: boolean=true): void {
        this.statusSum$10 = check;
    }
    onDiffMaxMin(check: boolean=true): void {
        this.statusDiffMaxMin = check;
    }
    onAC(check: boolean=true): void {
        this.statusAC = check;
    }
    onOddCount(check: boolean=true): void {
        this.statusOddCount = check;
    }
    onPrimeCount(check: boolean=true): void {
        this.statusPrimeCount = check;
    }
    on$3Count(check: boolean=true): void {
        this.status$3Count = check;
    }
}