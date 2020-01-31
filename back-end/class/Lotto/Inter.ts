import Gather from "./Gather";
import { Params } from './Expectation'

interface InterData {
    actual: number[];
    ideal: number[];
}

export default class Inter extends Gather {
    private interHelper(params: Params, methodActual: (params: Params) => number[], methodIdeal: (params: Params) => number[]): number[] {
        const interData: InterData = {
            actual: methodActual.bind(this)(params),
            ideal: methodIdeal.bind(this)(params)
        };

        return interData.actual.map((value, index) => value - interData.ideal[index]);
    }

    interExcludedLineCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherExcludedLineCount,
            this.expectedExcludedLineCount
        );
    }

    interLineCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherLineCount,
            this.expectedLineCount
        );
    }

    interLowCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherLowCount,
            this.expectedLowCount
        );
    }

    interSum(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherSum,
            this.expectedSum
        );
    }

    interOddCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherOddCount,
            this.expectedOddCount
        );
    }

    interPrimeCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherPrimeCount,
            this.expectedPrimeCount
        );
    }

    inter$3Count(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gather$3Count,
            this.expected$3Count
        );
    }

    interSum$10(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherSum$10,
            this.expectedSum$10
        );
    }


    interDiffMaxMin(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherDiffMaxMinData,
            this.expectedDiffMaxMinData
        );
    }

    interAC(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherAC,
            this.expectedAC
        );
    }

    interConsecutiveExist(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.gatherConsecutiveExist,
            this.expectedConsecutiveExist
        );
    }
}