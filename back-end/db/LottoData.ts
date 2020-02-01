import Lotto from "../class/Lotto/Lotto";
import { Mode, LData } from "../class/Lotto/Base";
import { InterMethod, Method } from "../class/Lotto/Inter";

interface RawData {
    $12: number[];
    $24: number[];
    $48: number[];
    $192: number[];
}
interface AllData {
    ideal: RawData;    
    actual: RawData;
    coef: number[];
    inter: number[];
}

export default class LottoData extends Lotto {
    constructor(data: LData[], mode: Mode = data.length) {
        super(data, mode);
    }

    private processHelper(interMethod: InterMethod): AllData {
        const ideal: RawData = {
            $12: interMethod.ideal.bind(this)({ mode: 12 }),
            $24: interMethod.ideal.bind(this)({ mode: 24 }),
            $48: interMethod.ideal.bind(this)({ mode: 48 }),
            $192: interMethod.ideal.bind(this)({ mode: 192 }),
        };
        const actual: RawData = {
            $12: interMethod.actual.bind(this)({ mode: 12 }),
            $24: interMethod.actual.bind(this)({ mode: 24 }),
            $48: interMethod.actual.bind(this)({ mode: 48 }),
            $192: interMethod.actual.bind(this)({ mode: 192 }),
        };
        const coef = this.coefHelper({mode:-12}, interMethod);
        const inter = this.interHelper({mode:-12}, interMethod);

        return { ideal, actual,coef, inter };
    }

    processExcludedLineCount(): AllData{
        return this.processHelper(this.interMap.get(Method.excludedLineCount));
    }
    processLineCount(): AllData{
        return this.processHelper(this.interMap.get(Method.lineCount));
    }
    processCarryCount(): AllData{
        return this.processHelper(this.interMap.get(Method.carryCount));
    }
    processLowCount(): AllData{
        return this.processHelper(this.interMap.get(Method.lowCount));
    }
    processSum55(): AllData{
        return this.processHelper(this.interMap.get(Method.sum));
    }
    processOddCount(): AllData{
        return this.processHelper(this.interMap.get(Method.oddCount));
    }
    processPrimeCount(): AllData{
        return this.processHelper(this.interMap.get(Method.primeCount));
    }
    process$3Count(): AllData{
        return this.processHelper(this.interMap.get(Method.$3Count));
    }
    processSum$10(): AllData{
        return this.processHelper(this.interMap.get(Method.sum$10));
    }
    processDiffMaxMin(): AllData{
        return this.processHelper(this.interMap.get(Method.diffMaxMin));
    }
    processAC(): AllData{
        return this.processHelper(this.interMap.get(Method.AC));
    }
    processConsecutiveExist(): AllData{
        return this.processHelper(this.interMap.get(Method.consecutiveExist));
    }
}