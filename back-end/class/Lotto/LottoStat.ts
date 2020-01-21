import Statistics, { Stats } from '../Statistics/Statistics'
import Calculate from '../Statistics/Calculate'
import Analyze from '../Analyze/Analyze'
import LottoData from './LottoData'
import { LData } from './LottoBase'
export default class LottoStat extends LottoData {
    constructor(data: LData[], mode: number = data.length) {
        super(data, mode);
    }

    private getStats(method: (numbers: number[]) => number, mode = this.mode): Stats {
        return Statistics.getStats(Calculate.getData(this.getLNumbers(mode), method))
    }
    exceptedLineCountStats(mode: number = this.mode): Stats {
        return this.getStats(Calculate.exceptedLineCount, mode);
    }

    sum$10Stats(mode: number = this.mode): Stats {
        return this.getStats(Calculate.sum$10, mode);
    }

    lowCountStats(mode:number = this.mode): Stats {
        return this.getStats(Calculate.lowCount, mode);
    }
    oddCountStats(mode: number = this.mode): Stats {
        return this.getStats(Calculate.oddCount, mode);
    }
    $3CountStats(mode: number = this.mode): Stats {
        return this.getStats(Calculate.$3Count, mode);
    }

    acStats(mode: number = this.mode): Stats {
        return this.getStats(Calculate.AC, mode);
    }

    diffMaxMinStats(mode: number = this.mode): Stats {
        return this.getStats(Calculate.diffMaxMin, mode);
    }

    carryStats(mode: number = this.mode): Stats {
        return Statistics.getStats(Analyze.carryCount(this.getLNumbers(mode)));
    }

    intervalStats(mode: number = this.mode): Array<Stats> {
        return Analyze.interval(this.getLNumbers(mode)).map(item => Statistics.getStats(item));
    }
}