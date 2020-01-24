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
    protected sum: Range;
    protected sum$10: Range;
    protected diffMaxMin: Range;
    protected AC: Range;
    protected includeNumbers: LottoNumber[] = [];
    protected excludeNumbers: LottoNumber[] = [];
    protected consecutiveExclude: boolean = false;
    protected constructor() {}
}