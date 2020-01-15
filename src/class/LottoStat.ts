import Statistics, {Stats} from './Statistics'
import {List} from 'immutable';
import Calculate from './Calculate';

interface LottoData{
    round: number;
    date: string;
    bonusNum: number;
    numbers: number[]
}

class Lotto{
    private static instance: Lotto;
    private readonly data:List<LottoData>;
    public readonly SIZE:number;

    private constructor(){
        this.data = List<LottoData>(require('../lotto.json'));
        this.SIZE = this.data.size;
    }

    public static getInstance(): Lotto {
        if (!Lotto.instance) Lotto.instance = new Lotto();

        return Lotto.instance;
    }

    public getData(size:number=this.SIZE):LottoData[]{
        return this.data.toJS().slice(0, size);
    }
    public getNumbers(size:number = this.SIZE): Array<number[]>{
        return this.data.map<number[]>(item => item.numbers).toJS().slice(0, size);
    }
}

interface HarmonyData{
    count:number;
    first:number;
    second:number;
    round:number;
}
export default class LottoStat {
    static readonly COUNT: number = 6;
    static readonly BALL_NUMBER: number = 45;
    static allLotto:Lotto = Lotto.getInstance();
    private readonly data: Array<number[]> = [];
    private SIZE:number = 0;
    constructor() {}

    getSize():number {
        return this.SIZE;
    }

    push(numbers: Array<number>): void {
        if (numbers.length !== LottoStat.COUNT) throw new SyntaxError(`The length of data element has to be ${LottoStat.COUNT}`);
        this.data.push(numbers);
        this.SIZE++;
    }
    setData(numsArray: Array<number[]>){
        numsArray.forEach(numbers => this.push(numbers));
        this.SIZE = numsArray.length;
    }
    
    oddCount(): Stats {
        return Statistics.oddCount(this.data);
    }

    sum(): Stats {
        return Statistics.sum(this.data);
    }

    posCount$1(): number[] {
        return Calculate.posCount$1(this.data);
    }
    posCount$10(): number[] {
        return Calculate.posCount$10(this.data);
    }

    howLongNone(): number[] {
        const isChecked = (numbers: number[]): boolean => {
            let check: boolean = true;
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] === -1) {
                    check = false;
                    break;
                }
            }
            return check;
        }
        const results = new Array<number>(LottoStat.BALL_NUMBER).fill(-1);

        const allLotto:Array<number[]> = LottoStat.allLotto.getNumbers();
        for (let i = 0; i < LottoStat.allLotto.SIZE; i++) {
            for (let j = 0; j < LottoStat.COUNT; j++) {
                const num = allLotto[i][j];
                if (results[num - 1] === -1) results[num - 1] = i;
            }
            if (isChecked(results)) break;
        }
        return results;
    }

    harmony(): HarmonyData[] {
        interface Data {
            count: number;
            round: number;
        }
        const harmonyHash = (numsArray: Array<number[]>): Array<Data[]> => {
            const result: Array<Data[]> = [];
            for (let i = 1; i < LottoStat.BALL_NUMBER; i++){
                const temp:Data[] = [];
                for(let j=0; j<LottoStat.BALL_NUMBER-i; j++) temp.push({count:0, round:0});
                result.push(temp);
            }
            numsArray.forEach((numbers, index) => {
                for (let i = 0; i < LottoStat.COUNT; i++) {
                    for (let j = i + 1; j < LottoStat.COUNT; j++) {
                        const [row, col] = [numbers[i] - 1, numbers[j] - numbers[i] - 1];
                        result[row][col].count++;
                        if(result[row][col].round === 0) result[row][col].round = LottoStat.allLotto.SIZE - index;
                    }
                }
            });
            return result;
        };

        const hash: Array<Data[]> = harmonyHash(this.data);
        const result:HarmonyData[] = [];
        for(let i=0; i<hash.length; i++){
            for(let j=0; j<hash[i].length; j++){
                result.push({
                    count:hash[i][j].count,
                    first:i+1,
                    second:i+j+2,
                    round:hash[i][j].round
                });
            }
        }

        return result.sort((a, b)=> {
            return b.count - a.count !== 0 ? b.count - a.count : b.round - a.round;
        });
    }

    min(): Stats{
        return Statistics.min(this.data);
    }
    max(): Stats{
        return Statistics.max(this.data);
    }
    diffMaxMin(): Stats {
        return Statistics.diffMaxMin(this.data);
    }

    AC(): Stats {
        return Statistics.AC(this.data);
    }

    frequencyPercent(): number[] {
        return Calculate.frequencyCount(this.data).map(value => value/this.getSize()*100);
    }
}