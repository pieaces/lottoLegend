import Statistics, {Stats} from './Statistics/Statistics'
import Analyze from './Analyze/Analyze'
import Lotto from './Lotto'

export default class LottoStat extends Lotto{
    public mode:number;
    constructor(mode:number = Lotto.getInstance().SIZE) {
        super();
        this.mode = mode;
    }

    setMode(mode:number){
        this.mode = mode;
    }
    oddCount(mode:number = this.mode): Stats {
        return Statistics.oddCount(this.getNumbers(mode));
    }

    sum(mode:number = this.mode): Stats {
        return Statistics.sum(this.getNumbers(mode));
    }

    posCount$1(mode:number = this.mode): number[] {
        return Analyze.posCount$1(this.getNumbers(mode));
    }
    posCount$10(mode:number = this.mode): number[] {
        return Analyze.posCount$10(this.getNumbers(mode));    
    }

    min(mode:number = this.mode): Stats{
        return Statistics.min(this.getNumbers(mode));
    }
    max(mode:number = this.mode): Stats{
        return Statistics.max(this.getNumbers(mode));
    }
    diffMaxMin(mode:number = this.mode): Stats {
        return Statistics.diffMaxMin(this.getNumbers(mode));
    }

    AC(mode:number = this.mode): Stats {
        return Statistics.AC(this.getNumbers(mode));
    }

    interval(mode:number = this.mode):Stats[] {
        return Analyze.interval(this.getNumbers(mode)).map(item =>Statistics.get(item));
    }
    frequencyPercent(mode:number = this.mode): number[] {
        return Analyze.frequencyCount(this.getNumbers(mode)).map(value => value/this.SIZE*100);
    }

    static howLongNone(){
        return Analyze.howLongNone(Lotto.getInstance().getData());
    }

    harmony(mode:number = this.mode){
        return Analyze.harmony(this.getData(mode));
    }
}