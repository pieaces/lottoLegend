import Inter, { InterMethod, Method } from "./Inter";
import { Params } from './Expectation'

export default class InterCoef extends Inter {
    private interCoefHelper(params: Params, interMethod: InterMethod):number[] {
        const ideal:number[] = interMethod.ideal.bind(this)(params);
        const actual:number[] = interMethod.actual.bind(this)(params);
        const p:number[] = interMethod.ideal.bind(this)({ mode: 1 });

        const result = new Array<number>(actual.length);

        for (let i = 0; i < actual.length; i++) {
            if (ideal[i] >= actual[i]) {
                result[i] = (ideal[i] - actual[i]) / ideal[i];
            }
            else {
                result[i] = (ideal[i] - actual[i]) / actual[i];
            }
            result[i] *= p[i];
        }
        return result;
    }

    interCoefExcludedLineCount(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.excludedLineCount)
        );
    }

    interCoefLineCount(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.lineCount)
        );
    }

    interCoefLowCount(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.lowCount)
        );
    }

    interCoefSum(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.sum)
        );
    }

    interCoefOddCount(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.oddCount)
        );
    }

    interCoefPrimeCount(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.primeCount)
        );
    }

    interCoef$3Count(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.$3Count)

        );
    }

    interCoefSum$10(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.sum$10)
        );
    }

    interCoefDiffMaxMin(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.diffMaxMin)
        );
    }

    interCoefAC(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.AC)
        );
    }

    interCoefConsecutiveExist(params: Params = {}): number[] {
        return this.interCoefHelper(
            params,
            this.interMap.get(Method.consecutiveExist)
        );
    }
}