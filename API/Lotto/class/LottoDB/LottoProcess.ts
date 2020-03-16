import LottoMap from "./LottoMap";
import { Assembly, DBData, LottoDate, Method } from "../../interface/LottoDB";
import { LottoNumber } from "../../interface/Lotto";

export default class LottoProcess extends LottoMap {
    processHelper(method: Method): DBData {
        const sampleMethod = this.methodMap.get(method);

        const ideal: Assembly = {
            $12: sampleMethod.ideal.bind(this)({ mode: 12 }),
            $24: sampleMethod.ideal.bind(this)({ mode: 24 }),
            $48: sampleMethod.ideal.bind(this)({ mode: 48 }),
            $192: sampleMethod.ideal.bind(this)({ mode: 192 }),
            all: sampleMethod.ideal.bind(this)({}),
            latest: sampleMethod.ideal.bind(this)({ mode: -5 })
        };
        const actual: Assembly = {
            $12: sampleMethod.actual.bind(this)({ mode: 12 }),
            $24: sampleMethod.actual.bind(this)({ mode: 24 }),
            $48: sampleMethod.actual.bind(this)({ mode: 48 }),
            $192: sampleMethod.actual.bind(this)({ mode: 192 }),
            all: sampleMethod.actual.bind(this)({}),
            latest: sampleMethod.actual.bind(this)({ mode: -5 })
        };
        //const coef = this.coefHelper({ mode: -5 }, method);
        const pos = this.methodMap.get(method).ideal.bind(this)({mode:1});
        const stats = sampleMethod.stats && sampleMethod.stats.bind(this)(this.mode);
        return { ideal, actual, pos, stats };
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