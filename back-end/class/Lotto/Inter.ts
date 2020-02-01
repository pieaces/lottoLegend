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
export enum Method {
    excludedLineCount,
    lineCount,
    lowCount,
    sum,
    oddCount,
    primeCount,
    $3Count,
    sum$10,
    diffMaxMin,
    AC,
    consecutiveExist
}

export default class Inter extends Gather{
    interMap = new Map<Method, InterMethod>([
        [
            Method.excludedLineCount, {
                ideal: this.expectedExcludedLineCount,
                actual: this.gatherExcludedLineCount,
            }
        ],
        [
            Method.lineCount, {
                ideal: this.expectedLineCount,
                actual: this.gatherLineCount
            }
        ],
        [
            Method.lowCount, {
                ideal: this.expectedLowCount,
                actual: this.gatherLowCount
            }
        ],
        [
            Method.sum, {
                ideal: this.expectedSum,
                actual: this.gatherSum
            }
        ],
        [
            Method.oddCount, {
                ideal: this.expectedOddCount,
                actual: this.gatherOddCount
            }
        ],
        [
            Method.primeCount, {
                ideal: this.expectedPrimeCount,
                actual: this.gatherPrimeCount
            }
        ],
        [
            Method.$3Count, {
                ideal: this.expected$3Count,
                actual: this.gather$3Count
            }
        ],
        [
            Method.sum$10, {
                ideal: this.expectedSum$10,
                actual: this.gatherSum$10
            }
        ],
        [
            Method.diffMaxMin, {
                ideal: this.expectedDiffMaxMinData,
                actual: this.gatherDiffMaxMinData
            }
        ],
        [
            Method.AC, {
                ideal: this.expectedAC,
                actual: this.gatherAC
            }
        ],
        [
            Method.consecutiveExist, {
                ideal: this.expectedConsecutiveExist,
                actual: this.gatherConsecutiveExist
            }
        ],
    ]);
}