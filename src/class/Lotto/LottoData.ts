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
        const SIZE = 7//0~6;
        const result = new Array<number>(SIZE).fill(0);
        this.oddCountData().forEach(num => result[num]++);
        
        return result;
    }
    gatherSumData(): number[] {
        const SIZE = 235//21~255
        const result = new Array<number>(SIZE).fill(0);
        this.oddCountData().forEach(num => result[num-21]++);
        
        return result;    }

    gatherMinData(): number[]{
        const SIZE = 40//1~40;
        const result = new Array<number>(SIZE).fill(0);
        this.minData().forEach(num => result[num-1]++);
        
        return result;    }
    gatherMaxData(): number[]{
        const SIZE = 40//6~45;
        const result = new Array<number>(SIZE).fill(0);
        this.maxData().forEach(num => result[num-6]++);
        
        return result;    }
    gatherDiffMaxMinData(): number[] {
        const SIZE = 40//6~45;
        const result = new Array<number>(SIZE).fill(0);
        this.diffMaxMinData().forEach(num => result[num-6]++);
        
        return result;    }

    gatherACData(): number[] {
        const SIZE = 11//0~11;
        const result = new Array<number>(SIZE).fill(0);
        this.acData().forEach(num => result[num]++);
        
        return result;    }

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