import Statistics, {Stats} from '../Statistics/Statistics'
import Analyze from '../Analyze/Analyze'
import LottoData from './LottoData'
import {LData} from './LottoBase'
export default class LottoStat extends LottoData{
    constructor(data:LData[], mode:number = data.length) {
        super(data, mode);
    }

    oddCountStats(mode:number = this.mode): Stats {
        return Statistics.getStats(this.oddCountData(mode));
    }

    sumStats(mode:number = this.mode): Stats {
        return Statistics.getStats(this.sumData(mode));
    }

    minStats(mode:number = this.mode): Stats{
        return Statistics.getStats(this.minData(mode));
    }
    maxStats(mode:number = this.mode): Stats{
        return Statistics.getStats(this.maxData(mode));
    }
    diffMaxMinStats(mode:number = this.mode): Stats {
        return Statistics.getStats(this.diffMaxMinData(mode));
    }

    acStats(mode:number = this.mode): Stats {
        return Statistics.getStats(this.acData(mode));
    }

    intervalStats(mode:number = this.mode):Stats[] {
        return Analyze.interval(this.getNumbers(mode)).map(item =>Statistics.getStats(item));
    }
}