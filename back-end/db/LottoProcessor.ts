import Lotto from "../class/Lotto/Lotto";
import { Mode, LData } from "../class/Lotto/Base";
import { Method } from "../class/Lotto/Inter";

export enum Method2{
    emergence = "emergence",
    interval = "interval",
    howLongNone = "howLongNone",
    frequency = "frequency"
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
    constructor(data: LData[], mode: Mode = data.length) {
        super(data, mode);
    }

    processHelper(method: Method): ProcessedData {
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
        return this.processHelper(Method.excludedLineCount);
    }
    processLineCount(): ProcessedData {
        return this.processHelper(Method.lineCount);
    }
    processCarryCount(): ProcessedData {
        return this.processHelper(Method.carryCount);
    }
    processEmergedBooleanForOne(one:number): boolean[] {
        return this.gatherEmergedBooleanForOne(one, -12);
    }
    processIntervalForOne(one:number): number[] {
        return this.gatherIntervalForOne(one);
    }
    processHowLongNone(): { round: number, date: string }[] {
        return this.gatherHowLongNone();
    }
    processFrequency(): number[] {
        return this.gatherFrequency();
    }
    processLowCount(): ProcessedData {
        return this.processHelper(Method.lowCount);
    }
    processSum(): ProcessedData {
        return this.processHelper(Method.sum);
    }
    processOddCount(): ProcessedData {
        return this.processHelper(Method.oddCount);
    }
    processPrimeCount(): ProcessedData {
        return this.processHelper(Method.primeCount);
    }
    process$3Count(): ProcessedData {
        return this.processHelper(Method.$3Count);
    }
    processSum$10(): ProcessedData {
        return this.processHelper(Method.sum$10);
    }
    processDiffMaxMin(): ProcessedData {
        return this.processHelper(Method.diffMaxMin);
    }
    processAC(): ProcessedData {
        return this.processHelper(Method.AC);
    }
    processConsecutiveExist(): ProcessedData {
        return this.processHelper(Method.consecutiveExist);
    }
}