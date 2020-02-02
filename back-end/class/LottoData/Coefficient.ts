import Inter, { Method } from "./Base";
import { Params } from '../Lotto/Expectation'

export default class InterCoef extends Inter {
    coefHelper(params: Params, method: Method): number[] {
        const sampleMethod = this.sampleMap.get(method);
        const ideal: number[] = sampleMethod.ideal.bind(this)(params);
        const actual: number[] = sampleMethod.actual.bind(this)(params);
        const p: number[] = sampleMethod.ideal.bind(this)({ mode: 1 });
        const result = new Array<number>(actual.length);

        for (let i = 0; i < actual.length; i++) {
            result[i] = ideal[i] - actual[i];
            if (ideal[i] >= actual[i]) result[i] /= ideal[i];
            else result[i] /= actual[i];
            result[i] *= p[i];
        }
        return result;
    }

    CoefExcludedLineCount(params: Params = {}): number[] {
        return this.coefHelper(params, Method.excludedLineCount);
    }
    CoefLineCount(params: Params = {}): number[] {
        return this.coefHelper(params, Method.lineCount);
    }
    CoefCarryCount(params: Params = {}): number[] {
        return this.coefHelper(params, Method.carryCount);
    }
    CoefLowCount(params: Params = {}): number[] {
        return this.coefHelper(params, Method.lowCount);
    }
    CoefSum(params: Params = {}): number[] {
        return this.coefHelper(params, Method.sum);
    }
    CoefSum55(params: Params = {}): number[] {
        return this.coefHelper(params, Method.sum55);
    }
    CoefSum77(params: Params = {}): number[] {
        return this.coefHelper(params, Method.sum77);
    }
    CoefOddCount(params: Params = {}): number[] {
        return this.coefHelper(params, Method.oddCount);
    }
    CoefPrimeCount(params: Params = {}): number[] {
        return this.coefHelper(params, Method.primeCount);
    }
    Coef$3Count(params: Params = {}): number[] {
        return this.coefHelper(params, Method.$3Count);
    }
    CoefSum$10(params: Params = {}): number[] {
        return this.coefHelper(params, Method.sum$10);
    }
    CoefDiffMaxMin(params: Params = {}): number[] {
        return this.coefHelper(params, Method.diffMaxMin);
    }
    CoefAC(params: Params = {}): number[] {
        return this.coefHelper(params, Method.AC);
    }
    CoefConsecutiveExist(params: Params = {}): number[] {
        return this.coefHelper(params, Method.consecutiveExist);
    }
}