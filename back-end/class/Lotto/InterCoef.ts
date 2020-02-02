import Inter, { InterMethod, Method } from "./Inter";
import { Params } from './Expectation'

export default class InterCoef extends Inter {
    private CoefHelper(params: Params, interMethod: InterMethod):number[] {
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

    CoefExcludedLineCount(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.excludedLineCount)
        );
    }

    CoefLineCount(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.lineCount)
        );
    }

    CoefCarryCount(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.carryCount)
        );
    }

    CoefLowCount(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.lowCount)
        );
    }

    CoefSum55(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.sum55)
        );
    }

    CoefOddCount(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.oddCount)
        );
    }

    CoefPrimeCount(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.primeCount)
        );
    }

    Coef$3Count(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.$3Count)

        );
    }

    CoefSum$10(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.sum$10)
        );
    }

    CoefDiffMaxMin(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.diffMaxMin)
        );
    }

    CoefAC(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.AC)
        );
    }

    CoefConsecutiveExist(params: Params = {}): number[] {
        return this.CoefHelper(
            params,
            this.interMap.get(Method.consecutiveExist)
        );
    }
}