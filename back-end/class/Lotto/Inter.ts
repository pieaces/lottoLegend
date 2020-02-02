import Gather from "./Gather";
import { Params } from './Expectation'

export interface InterData {
    ideal: number[];
    actual: number[];
}
export interface InterMethod {
    ideal: (params: Params) => number[];
    actual: (params: Params) => number[];
}
export enum Method1 {
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
    consecutiveExist = "consecutiveExist"
}

export default class Inter extends Gather{
    interMap = new Map<Method1, InterMethod>([
        [
            Method1.excludedLineCount, {
                ideal: this.expectedExcludedLineCount,
                actual: this.gatherExcludedLineCount,
            }
        ],
        [
            Method1.lineCount, {
                ideal: this.expectedLineCount,
                actual: this.gatherLineCount
            }
        ],
        [
            Method1.carryCount, {
                ideal: this.expectedCarryCount,
                actual: this.gatherCarryCount
            }
        ],
        [
            Method1.lowCount, {
                ideal: this.expectedLowCount,
                actual: this.gatherLowCount
            }
        ],
        [
            Method1.sum, {
                ideal: this.expectedSum,
                actual: this.gatherSum
            }
        ],
        [
            Method1.oddCount, {
                ideal: this.expectedOddCount,
                actual: this.gatherOddCount
            }
        ],
        [
            Method1.primeCount, {
                ideal: this.expectedPrimeCount,
                actual: this.gatherPrimeCount
            }
        ],
        [
            Method1.$3Count, {
                ideal: this.expected$3Count,
                actual: this.gather$3Count
            }
        ],
        [
            Method1.sum$10, {
                ideal: this.expectedSum$10,
                actual: this.gatherSum$10
            }
        ],
        [
            Method1.diffMaxMin, {
                ideal: this.expectedDiffMaxMinData,
                actual: this.gatherDiffMaxMinData
            }
        ],
        [
            Method1.AC, {
                ideal: this.expectedAC,
                actual: this.gatherAC
            }
        ],
        [
            Method1.consecutiveExist, {
                ideal: this.expectedConsecutiveExist,
                actual: this.gatherConsecutiveExist
            }
        ],
    ]);
}