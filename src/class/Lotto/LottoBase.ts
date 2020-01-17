import {List} from 'immutable';
export interface LData{
    round: number;
    date: string;
    bonusNum: number;
    numbers: number[]
}
//로또 전회차
export default class LottoBase{
    private SIZE:number;
    public static readonly BALL_NUM:number = 45;

    private data:List<LData>;

    protected constructor(data:LData[]){
        this.data = List<LData>(data);
        this.SIZE = this.data.size;
    }

    public getSize():number{
        return this.SIZE;
    }
    public getData(size:number=this.SIZE):LData[]{
        return this.data.toJS().slice(0, size);
    }
    public getNumbers(size:number = this.SIZE): Array<number[]>{
        return this.data.map<number[]>(item => item.numbers).toJS().slice(0, size);
    }
}