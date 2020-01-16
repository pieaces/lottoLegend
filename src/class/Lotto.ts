import {List} from 'immutable';
export interface LData{
    round: number;
    date: string;
    bonusNum: number;
    numbers: number[]
}
//로또 전회차
export default class Lotto{
    private static instance: Lotto;

    public readonly SIZE:number;
    public static readonly BALL_NUM:number = 45;

    private readonly data:List<LData>;

    protected constructor(){
        this.data = List<LData>(require('../lotto.json'));
        this.SIZE = this.data.size;
    }

    public static getInstance(): Lotto {
        if (!Lotto.instance) Lotto.instance = new Lotto();

        return Lotto.instance;
    }

    public getData(size:number=this.SIZE):LData[]{
        return this.data.toJS().slice(0, size);
    }
    public getNumbers(size:number = this.SIZE): Array<number[]>{
        return this.data.map<number[]>(item => item.numbers).toJS().slice(0, size);
    }
}
