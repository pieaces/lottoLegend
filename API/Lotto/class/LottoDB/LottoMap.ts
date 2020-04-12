import Lotto from "../Lotto";
import { Method } from "../../interface/LottoDB";
import { Stats } from "../../interface/Statistics";
import { Params, Mode } from "../../interface/Lotto";
import Calculate from "../Calculate";
interface MethodMap {
    ideal: (params?: Params) => number[];
    actual: (params?: Params) => number[];
    stats?: (mode: Mode) => Stats;
    cal?: (numbers: number[]) => number;
}

export default class LottoMap extends Lotto{
    methodMap = new Map<Method, MethodMap>([
        [
            Method.pos$1, {
                ideal: this.expectedPos$1,
                actual: this.gatherPos$1,
            }
        ],
        [
            Method.excludedLineCount, {
                ideal: this.expectedExcludedLineCount,
                actual: this.gatherExcludedLineCount,
                stats: this.statsExcludedLineCount,
                cal: Calculate.excludedLineCount
            }
        ],
        [
            Method.excludedLine, {
                ideal: this.expectedExcludedLine,
                actual: this.gatherExcludedLine,
            }
        ],
        [
            Method.carryCount, {
                ideal: this.expectedCarryCount,
                actual: this.gatherCarryCount,
                stats: this.statsCarryCount,
            }
        ],
        [
            Method.lowCount, {
                ideal: this.expectedLowCount,
                actual: this.gatherLowCount,
                stats: this.statsLowCountStats,
                cal: Calculate.lowCount
            }
        ],
        [
            Method.sum, {
                ideal: this.expectedSum,
                actual: this.gatherSum,
                stats: this.statsSum,
                cal: Calculate.sum
            }
        ],
        [
            Method.oddCount, {
                ideal: this.expectedOddCount,
                actual: this.gatherOddCount,
                stats: this.statsOddCount,
                cal: Calculate.oddCount
            }
        ],
        [
            Method.primeCount, {
                ideal: this.expectedPrimeCount,
                actual: this.gatherPrimeCount,
                stats: this.statsPrimeCount,
                cal: Calculate.primeCount
            }
        ],
        [
            Method.$3Count, {
                ideal: this.expected$3Count,
                actual: this.gather$3Count,
                stats: this.stats$3Count,
                cal: Calculate.$3Count
            }
        ],
        [
            Method.sum$10, {
                ideal: this.expectedSum$10,
                actual: this.gatherSum$10,
                stats: this.statsSum$10,
                cal: Calculate.sum$10
            }
        ],
        [
            Method.diffMaxMin, {
                ideal: this.expectedDiffMaxMinData,
                actual: this.gatherDiffMaxMinData,
                stats: this.statsDiffMaxMin,
                cal: Calculate.diffMaxMin
            }
        ],
        [
            Method.AC, {
                ideal: this.expectedAC,
                actual: this.gatherAC,
                stats: this.statsAC,
                cal: Calculate.AC
            }
        ],
        [
            Method.consecutiveExist, {
                ideal: this.expectedConsecutiveExist,
                actual: this.gatherConsecutiveExist,
                stats: this.statsConsecutiveExistStats,
                cal: Calculate.consecutiveExist
            }
        ],
    ]);
}