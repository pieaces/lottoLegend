import Statistics, { Stats } from '../Statistics/Statistics'
import Calculate from '../Statistics/Calculate'
import Analyze from '../Analyze/Analyze'
import Gather from './Gather'
import { LData, Mode } from './Base'
export default class Lotto extends Gather {
    constructor(data: LData[], mode: Mode = data.length) {
        super(data, mode);
    }

    private getStats(method: (numbers: number[]) => number, mode:Mode = this.mode): Stats {
        return Statistics.getStats(Calculate.getData(this.getLNumbers(mode), method))
    }
    statsExceptedLineCount(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.excludedLineCount, mode);
    }

    statsSum$10(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.sum$10, mode);
    }
    statsSum$1(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.sum$1, mode);
    }
    statsSum(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.sum, mode);
    }

    statsLowCountStats(mode:Mode = this.mode): Stats {
        return this.getStats(Calculate.lowCount, mode);
    }
    statsOddCount(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.oddCount, mode);
    }
    statsPrimeCount(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.primeCount, mode);
    }
    stats$3Count(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.$3Count, mode);
    }

    statsAC(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.AC, mode);
    }

    statsDiffMaxMin(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.diffMaxMin, mode);
    }

    statsConsecutiveExistStats(mode:Mode = this.mode): Stats {
        return this.getStats(Calculate.consecutiveExist, mode);
    }
    statsCarryCount(mode: Mode = this.mode): Stats {
        return Statistics.getStats(Analyze.carryCount(this.getLNumbers(mode)));
    }

    statsInterval(mode: Mode = this.mode): Array<Stats> {
        return Analyze.interval(this.getLNumbers(mode)).map(item => Statistics.getStats(item));
    }
}