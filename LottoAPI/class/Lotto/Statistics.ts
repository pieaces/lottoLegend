import Gather from './Gather';
import Calculate from '../Calculate'
import Statistics from '../Statistics'
import Analyze from '../Analyze'

import { LData, Mode } from '../../interface/Lotto';
import { Stats } from '../../interface/Statistics';

export default class LottoStatistics extends Gather{
    constructor(data: LData[]=[], mode: Mode = data.length) {
        super(data, mode);
    }

    private getStats(method: (numbers: number[]) => number, mode: Mode = this.mode): Stats {
        return Statistics.getStats(Calculate.getData(this.getLNumbers(mode), method))
    }
    statsExcludedLineCount(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.excludedLineCount, mode);
    }

    statsCarryCount(mode: Mode = this.mode): Stats {
        return Statistics.getStats(Analyze.carryCount(this.getLNumbers(mode)));
    }
    statsInterval(mode: Mode = this.mode): Array<Stats> {
        return Analyze.interval(this.getLNumbers(mode)).map(item => {
            const stats = Statistics.getStats(item);
            return stats;
        });
    }

    statsLowCountStats(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.lowCount, mode);
    }

    statsSum(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.sum, mode);
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

    statsSum$10(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.sum$10, mode);
    }
    statsSum$1(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.sum$1, mode);
    }

    statsDiffMaxMin(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.diffMaxMin, mode);
    }

    statsAC(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.AC, mode);
    }

    statsConsecutiveExistStats(mode: Mode = this.mode): Stats {
        return this.getStats(Calculate.consecutiveExist, mode);
    }
}