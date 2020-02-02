import Lotto from "../../class/Lotto/Lotto";
import { Method1 } from "../../class/Lotto/Inter";
import { LottoNumber } from "../../class/Generator/Base";

export enum Method2{
    emergence = "emergence",
    interval = "interval",
    howLongNone = "howLongNone",
    frequency = "frequency"
}

export interface LottoDate{
    round: number;
    date: string;
}
export interface Assembly {
    $12: number[];
    $24: number[];
    $48: number[];
    $192: number[];
    all: number[];
    latest: number[];
}
export interface ProcessedData {
    ideal: Assembly;
    actual: Assembly;
    coef: number[];
}

export default class LottoProcessor extends Lotto {
    processHelper(method: Method1): ProcessedData {
        const interMethod = this.interMap.get(method);

        const ideal: Assembly = {
            $12: interMethod.ideal.bind(this)({ mode: 12 }),
            $24: interMethod.ideal.bind(this)({ mode: 24 }),
            $48: interMethod.ideal.bind(this)({ mode: 48 }),
            $192: interMethod.ideal.bind(this)({ mode: 192 }),
            all: interMethod.ideal.bind(this)({}),
            latest: interMethod.ideal.bind(this)({ mode: -12 })
        };
        const actual: Assembly = {
            $12: interMethod.actual.bind(this)({ mode: 12 }),
            $24: interMethod.actual.bind(this)({ mode: 24 }),
            $48: interMethod.actual.bind(this)({ mode: 48 }),
            $192: interMethod.actual.bind(this)({ mode: 192 }),
            all: interMethod.actual.bind(this)({}),
            latest: interMethod.actual.bind(this)({ mode: -12 })
        };
        const coef = this.coefHelper({ mode: -12 }, interMethod);

        return { ideal, actual, coef };
    }

    processExcludedLineCount(): ProcessedData {
        return this.processHelper(Method1.excludedLineCount);
    }
    processLineCount(): ProcessedData {
        return this.processHelper(Method1.lineCount);
    }
    processCarryCount(): ProcessedData {
        return this.processHelper(Method1.carryCount);
    }
    processEmergedStatusForOne(one:LottoNumber): boolean[] {
        return this.gatherEmergedBooleanForOne(one, -12);
    }
    processIntervalForOne(one:LottoNumber): number[] {
        return this.gatherIntervalForOne(one);
    }
    processHowLongNone(): LottoDate[] {
        return this.gatherHowLongNone();
    }
    processFrequency(): number[] {
        return this.gatherFrequency();
    }
    processLowCount(): ProcessedData {
        return this.processHelper(Method1.lowCount);
    }
    processSum(): ProcessedData {
        return this.processHelper(Method1.sum);
    }
    processOddCount(): ProcessedData {
        return this.processHelper(Method1.oddCount);
    }
    processPrimeCount(): ProcessedData {
        return this.processHelper(Method1.primeCount);
    }
    process$3Count(): ProcessedData {
        return this.processHelper(Method1.$3Count);
    }
    processSum$10(): ProcessedData {
        return this.processHelper(Method1.sum$10);
    }
    processDiffMaxMin(): ProcessedData {
        return this.processHelper(Method1.diffMaxMin);
    }
    processAC(): ProcessedData {
        return this.processHelper(Method1.AC);
    }
    processConsecutiveExist(): ProcessedData {
        return this.processHelper(Method1.consecutiveExist);
    }
}