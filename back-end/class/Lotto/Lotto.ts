import Statistics, { Stats } from '../Statistics/Statistics'
import Calculate from '../Statistics/Calculate'
import Analyze from '../Analyze/Analyze'
import Gather from './Gather'
import { LData } from './Base'
export default class Lotto extends Gather {
    constructor(data: LData[], mode: number = data.length) {
        super(data, mode);
    }

    private getStats(method: (numbers: number[]) => number, mode = this.mode): Stats {
        return Statistics.getStats(Calculate.getData(this.getLNumbers(mode), method))
    }
    statsExceptedLineCount(mode: number = this.mode): Stats {
        return this.getStats(Calculate.excludedLineCount, mode);
    }

    statsSum$10(mode: number = this.mode): Stats {
        return this.getStats(Calculate.sum$10, mode);
    }
    statsSum$1(mode: number = this.mode): Stats {
        return this.getStats(Calculate.sum$1, mode);
    }
    statsSum(mode: number = this.mode): Stats {
        return this.getStats(Calculate.sum, mode);
    }

    statsLowCountStats(mode:number = this.mode): Stats {
        return this.getStats(Calculate.lowCount, mode);
    }
    statsOddCount(mode: number = this.mode): Stats {
        return this.getStats(Calculate.oddCount, mode);
    }
    statsPrimeCount(mode: number = this.mode): Stats {
        return this.getStats(Calculate.primeCount, mode);
    }
    stats$3Count(mode: number = this.mode): Stats {
        return this.getStats(Calculate.$3Count, mode);
    }

    statsAC(mode: number = this.mode): Stats {
        return this.getStats(Calculate.AC, mode);
    }

    statsDiffMaxMin(mode: number = this.mode): Stats {
        return this.getStats(Calculate.diffMaxMin, mode);
    }

    statsConsecutiveExistStats(mode:number = this.mode): Stats {
        return this.getStats(Calculate.consecutiveExist, mode);
    }
    statsCarryCount(mode: number = this.mode): Stats {
        return Statistics.getStats(Analyze.carryCount(this.getLNumbers(mode)));
    }

    statsInterval(mode: number = this.mode): Array<Stats> {
        return Analyze.interval(this.getLNumbers(mode)).map(item => Statistics.getStats(item));
    }
}