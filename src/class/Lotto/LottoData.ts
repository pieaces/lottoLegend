import Calculate from '../Statistics/Calculate'
import Analyze from '../Analyze/Analyze'
import LottoCal from './LottoCal'
import {LData} from './LottoBase'

export default class LottoData extends LottoCal{
    public mode:number;
    constructor(data:LData[], mode:number) {
        super(data, mode);
    }
    gatherOddCount(){
        const SIZE = 7;
        const result = new Array<number>(SIZE).fill(0);
        this.oddCountData().forEach(num => result[num]++);
        
        return result;
    }
    sumData(mode:number = this.mode): number[] {
        return Calculate.getData(this.getNumbers(mode), Calculate.sum);
    }

    minData(mode:number = this.mode): number[]{
        return Calculate.getData(this.getNumbers(mode), Calculate.min);
    }
    maxData(mode:number = this.mode): number[]{
        return Calculate.getData(this.getNumbers(mode), Calculate.max);
    }
    diffMaxMinData(mode:number = this.mode): number[] {
        return Calculate.getData(this.getNumbers(mode), Calculate.diffMaxMin);
    }

    acData(mode:number = this.mode): number[] {
        return Calculate.getData(this.getNumbers(mode), Calculate.AC);
    }

    posCount$1(mode:number = this.mode): number[] {
        return Analyze.posCount$1(this.getNumbers(mode));
    }
    posCount$10(mode:number = this.mode): number[] {
        return Analyze.posCount$10(this.getNumbers(mode));    
    }

    frequencyPercent(mode:number = this.mode): number[] {
        return Analyze.frequencyCount(this.getNumbers(mode)).map(value => value/this.getSize());
    }

    howLongNone(){ //HData[]
        return Analyze.howLongNone(this.getData());
    }

    harmony(mode:number = this.mode){ //HarmonyData[]
        return Analyze.harmony(this.getData(mode));
    }
}