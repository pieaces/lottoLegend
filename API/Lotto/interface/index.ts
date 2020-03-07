export type LottoNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45;
export type ZeroToFour = 0 | 1 | 2 | 3 | 4;
export type ZeroToSix = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Range = { from: number, to: number };
export type CountRange = {from: ZeroToSix, to:ZeroToSix};

export interface GeneratorOption{
    excludedLines?: ZeroToFour[];
    includedNumbers?: LottoNumber[];
    excludedNumbers?: LottoNumber[];
    lowCount?: ZeroToSix;
    sum?: Range[];
    oddCount?: ZeroToSix[];
    primeCount?: ZeroToSix[];
    $3Count?: ZeroToSix[];
    sum$10?: number[];
    diffMaxMin?: number[];
    AC?: number[];
    consecutiveExist?: boolean;
}