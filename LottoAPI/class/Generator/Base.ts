import { Range } from 'immutable';

export type ZeroToFour = 0 | 1 | 2 | 3 | 4;
export type ZeroToSix = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type LottoNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45;
export type Range = { from: number, to: number };
export type CountRange = {from: ZeroToSix, to:ZeroToSix};

export interface GeneratorOption{
    excludedLines?: ZeroToFour[];
    includeNumbers?: LottoNumber[];
    excludeNumbers?: LottoNumber[];
    lowCount: ZeroToSix;
    sum?: Range;
    oddCount?: CountRange;
    primeCount?: CountRange;
    $3Count?: CountRange;
    sum$10?: Range;
    diffMaxMin?: Range;
    AC?: Range;
    consecutiveExclude?: boolean;
}
export default class Base{
    option: GeneratorOption;

    constructor(option:GeneratorOption) {
        this.option = option;
    }
}