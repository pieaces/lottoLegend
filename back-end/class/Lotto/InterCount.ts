import InterCoef from "./InterCoef";
import { InterData, InterMethod, Method } from "./Inter";
import { Params } from './Expectation'

export default class Inter extends InterCoef {
    interHelper(params: Params, interMethod: InterMethod): number[] {
        const interData: InterData = {
            ideal: interMethod.ideal.bind(this)(params),
            actual: interMethod.actual.bind(this)(params)
        };

        return interData.ideal.map((value, index) => value - interData.actual[index]);
    }

    interExcludedLineCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.excludedLineCount)
        );
    }

    interLineCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.lineCount)
        );
    }

    interCarryCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.carryCount)
        );
    }

    interLowCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.lowCount)
        );
    }

    interSum55(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.sum55)
        );
    }

    interOddCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.oddCount)
        );
    }

    interPrimeCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.primeCount)
        );
    }

    inter$3Count(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.$3Count)

        );
    }

    interSum$10(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.sum$10)
        );
    }

    interDiffMaxMin(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.diffMaxMin)
        );
    }

    interAC(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.AC)
        );
    }

    interConsecutiveExist(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method.consecutiveExist)
        );
    }
}