import InterCoef from "./InterCoef";
import { InterData, InterMethod, Method1 } from "./Inter";
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
            this.interMap.get(Method1.excludedLineCount)
        );
    }

    interLineCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.lineCount)
        );
    }

    interCarryCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.carryCount)
        );
    }

    interLowCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.lowCount)
        );
    }

    interSum(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.sum)
        );
    }

    interOddCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.oddCount)
        );
    }

    interPrimeCount(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.primeCount)
        );
    }

    inter$3Count(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.$3Count)

        );
    }

    interSum$10(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.sum$10)
        );
    }

    interDiffMaxMin(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.diffMaxMin)
        );
    }

    interAC(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.AC)
        );
    }

    interConsecutiveExist(params: Params = {}): number[] {
        return this.interHelper(
            params,
            this.interMap.get(Method1.consecutiveExist)
        );
    }
}