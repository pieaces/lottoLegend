import Coefficient from "./Coefficient";
import { Method } from "./Base";
import { LottoNumber } from "../Generator/Base";
import {Stats} from '../Statistics'
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
export interface DBData {
    ideal: Assembly;
    actual: Assembly;
    coef: number[];
    stats?: Stats;
}

export default class LottoProcess extends Coefficient {
    processHelper(method: Method): DBData {
        const sampleMethod = this.sampleMap.get(method);

        const ideal: Assembly = {
            $12: sampleMethod.ideal.bind(this)({ mode: 12 }),
            $24: sampleMethod.ideal.bind(this)({ mode: 24 }),
            $48: sampleMethod.ideal.bind(this)({ mode: 48 }),
            $192: sampleMethod.ideal.bind(this)({ mode: 192 }),
            all: sampleMethod.ideal.bind(this)({}),
            latest: sampleMethod.ideal.bind(this)({ mode: -12 })
        };
        const actual: Assembly = {
            $12: sampleMethod.actual.bind(this)({ mode: 12 }),
            $24: sampleMethod.actual.bind(this)({ mode: 24 }),
            $48: sampleMethod.actual.bind(this)({ mode: 48 }),
            $192: sampleMethod.actual.bind(this)({ mode: 192 }),
            all: sampleMethod.actual.bind(this)({}),
            latest: sampleMethod.actual.bind(this)({ mode: -12 })
        };
        const coef = this.coefHelper({ mode: -12 }, method);
        const stats = sampleMethod.stats && sampleMethod.stats.bind(this)(this.mode);
        return { ideal, actual, coef, stats };
    }

    processExcludedLineCount(): DBData {
        return this.processHelper(Method.excludedLineCount);
    }
    processLineCount(): DBData {
        return this.processHelper(Method.lineCount);
    }
    processCarryCount(): DBData {
        return this.processHelper(Method.carryCount);
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
    processLowCount(): DBData {
        return this.processHelper(Method.lowCount);
    }
    processSum(): DBData {
        return this.processHelper(Method.sum);
    }
    processOddCount(): DBData {
        return this.processHelper(Method.oddCount);
    }
    processPrimeCount(): DBData {
        return this.processHelper(Method.primeCount);
    }
    process$3Count(): DBData {
        return this.processHelper(Method.$3Count);
    }
    processSum$10(): DBData {
        return this.processHelper(Method.sum$10);
    }
    processDiffMaxMin(): DBData {
        return this.processHelper(Method.diffMaxMin);
    }
    processAC(): DBData {
        return this.processHelper(Method.AC);
    }
    processConsecutiveExist(): DBData {
        return this.processHelper(Method.consecutiveExist);
    }
}