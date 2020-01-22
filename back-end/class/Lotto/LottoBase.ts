import {List} from 'immutable';
export interface LData{
    round: number;
    date: string;
    bonusNum: number;
    numbers: number[]
}
//로또 전회차
export default class LottoBase{
    private TOTAL_SIZE:number;
    public static readonly BALL_NUM:number = 45;

    private data:List<LData>;

    constructor(data:LData[]){
        this.data = List<LData>(data);
        this.TOTAL_SIZE = this.data.size;
    }

    public getTotalSize():number{
        return this.TOTAL_SIZE;
    }
    public getLData(mode:number=this.TOTAL_SIZE):LData[]{
        return this.data.toJS().slice(0, mode);
    }
    public getLNumbers(mode:number = this.TOTAL_SIZE): Array<number[]>{
        return this.data.map<number[]>((item: { numbers: any; }) => item.numbers).toJS().slice(0, mode);
    }
}