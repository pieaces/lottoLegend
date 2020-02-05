import Lotto from "../Lotto";

import { Method } from "../../interface/LottoDB";
import { Stats } from "../../interface/Statistics";
import { Params, Mode } from "../../interface/Lotto";
interface MethodMap {
    ideal: (params: Params) => number[];
    actual: (params: Params) => number[];
    stats?: (mode:Mode) => Stats;
}

export default class LottoMap extends Lotto{
    methodMap = new Map<Method, MethodMap>([
        [
            Method.excludedLineCount, {
                ideal: this.expectedExcludedLineCount,
                actual: this.gatherExcludedLineCount,
                stats: this.statsExcludedLineCount
            }
        ],
        [
            Method.lineCount, {
                ideal: this.expectedLineCount,
                actual: this.gatherLineCount,
            }
        ],
        [
            Method.carryCount, {
                ideal: this.expectedCarryCount,
                actual: this.gatherCarryCount,
                stats: this.statsCarryCount
            }
        ],
        [
            Method.lowCount, {
                ideal: this.expectedLowCount,
                actual: this.gatherLowCount,
                stats: this.statsLowCountStats
            }
        ],
        [
            Method.sum, {
                ideal: this.expectedSum,
                actual: this.gatherSum,
                stats: this.statsSum
            }
        ],
        [
            Method.sum55, {
                ideal: this.expectedSum55,
                actual: this.gatherSum55,
                stats: this.statsSum
            }
        ],
        [
            Method.sum77, {
                ideal: this.expectedSum77,
                actual: this.gatherSum77,
                stats: this.statsSum
            }
        ],
        [
            Method.oddCount, {
                ideal: this.expectedOddCount,
                actual: this.gatherOddCount,
                stats: this.statsOddCount
            }
        ],
        [
            Method.primeCount, {
                ideal: this.expectedPrimeCount,
                actual: this.gatherPrimeCount,
                stats: this.statsPrimeCount
            }
        ],
        [
            Method.$3Count, {
                ideal: this.expected$3Count,
                actual: this.gather$3Count,
                stats: this.stats$3Count
            }
        ],
        [
            Method.sum$10, {
                ideal: this.expectedSum$10,
                actual: this.gatherSum$10,
                stats: this.statsSum$10
            }
        ],
        [
            Method.diffMaxMin, {
                ideal: this.expectedDiffMaxMinData,
                actual: this.gatherDiffMaxMinData,
                stats: this.statsDiffMaxMin
            }
        ],
        [
            Method.AC, {
                ideal: this.expectedAC,
                actual: this.gatherAC,
                stats: this.statsAC
            }
        ],
        [
            Method.consecutiveExist, {
                ideal: this.expectedConsecutiveExist,
                actual: this.gatherConsecutiveExist,
                stats: this.statsConsecutiveExistStats
            }
        ],
    ]);
}