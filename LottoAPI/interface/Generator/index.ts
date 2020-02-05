import { LottoNumber } from "../Lotto";

export type ZeroToFour = 0 | 1 | 2 | 3 | 4;
export type ZeroToSix = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Range = { from: number, to: number };
export type CountRange = {from: ZeroToSix, to:ZeroToSix};

export interface GeneratorOption{
    excludedLines?: ZeroToFour[];
    includedNumbers?: LottoNumber[];
    excludedNumbers?: LottoNumber[];
    lowCount?: ZeroToSix;
    sum?: Range;
    oddCount?: CountRange;
    primeCount?: CountRange;
    $3Count?: CountRange;
    sum$10?: Range;
    diffMaxMin?: Range;
    AC?: Range;
    consecutiveExist?: boolean;
}