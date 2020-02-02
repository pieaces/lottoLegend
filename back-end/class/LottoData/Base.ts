import { Mode } from "../Lotto/Base";
import { Params } from '../Lotto/Expectation'
import Lotto from "../Lotto";
import {Stats} from '../Statistics'

export interface SampleData {
    ideal: number[];
    actual: number[];
    stats?: Stats;
}

export enum Method {
    excludedLineCount = "excludedLineCount",
    lineCount = "lineCount",
    carryCount = "carryCount",
    lowCount = "lowCount",
    sum = "sum",
    oddCount = "oddCount",
    primeCount = "primeCount",
    $3Count = "$3Count",
    sum$10 = "sum$10",
    diffMaxMin = "diffMaxMin",
    AC = "AC",
    consecutiveExist = "consecutiveExist",
//
    emergence = "emergence",
    interval = "interval",
    howLongNone = "howLongNone",
    frequency = "frequency"
}

interface SampleMethod {
    ideal: (params: Params) => number[];
    actual: (params: Params) => number[];
    stats?: (mode:Mode) => Stats;
}
export default class Inter extends Lotto{
    sampleMap = new Map<Method, SampleMethod>([
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