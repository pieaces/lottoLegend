import { Z_ASCII } from "zlib";
import { isMainThread } from "worker_threads";

const lottos = require('./lotto.json');
const ROUND_MAX = lottos.length;

class Calculate {
    private constructor() { }

    static oddCount(numbers: number[]): number {
        let count = 0;
        numbers.forEach(value => {
            if (value % 2 === 1) count++;
        });
        return count;
    }

    static sum(numbers: number[]): number {
        return numbers.reduce((acc, cur) => acc + cur, 0);
    }
    static ratio$1(numbers: number[]): number[] {
        const COUNT = 10;
        const result: number[] = new Array<number>(COUNT).fill(0);
        numbers.forEach((value) => result[value % 10]++);
        return result.map((value, index) => {
            if (index > 5) return value * (5 / 4);
            else return value;
        });
    };

    static ratio$10(numbers: number[]): number[] {
        const COUNT = 5;
        const result: number[] = new Array<number>(COUNT).fill(0);
        numbers.forEach((value) => result[Math.floor(value / 10)]++);
        result[0] *= 10 / 9;
        result[4] *= 10 / 6;
        return result;
    };

    static min(numbers: number[]): number{
        return Math.min(...numbers);
    }
    static max(numbers:number[]): number {
        return Math.max(...numbers);
    }

    static diffMaxMin(numbers: number[]): number {
        return this.max(numbers) - this.min(numbers);
    }

    static howLongNone(): number[] {
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
        const SIZE = 45;
        const COUNT = 6;
        const results = new Array<number>(SIZE).fill(-1);

        const lottoNumbers = lottos.map((lotto: { numbers: number[] }) => lotto.numbers);
        for (let i = 0; i < lottoNumbers.length; i++) {
            for (let j = 0; j < COUNT; j++) {
                const num = lottoNumbers[i][j];
                if (results[num - 1] === -1) results[num - 1] = i;
            }
            if (isChecked(results)) break;
        }
        return results;
    }

    static harmony(numsArray: Array<number[]>): HarmonyData[] {
        interface Data {
            count: number;
            round: number;
        }
        const harmonyHash = (numsArray: Array<number[]>): Array<Data[]> => {
            const SIZE = 45;
            const COUNT = 6;
            const result: Array<Data[]> = [];
            for (let i = 1; i < SIZE; i++){
                const temp:Data[] = [];
                for(let j=0; j<SIZE-i; j++) temp.push({count:0, round:0});
                result.push(temp);
            }
            numsArray.forEach((numbers, index) => {
                for (let i = 0; i < COUNT; i++) {
                    for (let j = i + 1; j < COUNT; j++) {
                        const [row, col] = [numbers[i] - 1, numbers[j] - numbers[i] - 1];
                        result[row][col].count++;
                        if(result[row][col].round === 0) result[row][col].round = ROUND_MAX - index;
                    }
                }
            });
            return result;
        };

        const hash: Array<Data[]> = harmonyHash(numsArray);
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
}

enum Position{$1 = 10, $10 = 5};
class Statistics {
    private constructor() { }

    private static getStats(data:number[]): Stats{
        const N = data.length;
        if(N === 1) return {mean:data[0], stdev:0};
        const stats = data.reduce((acc, value, index)=>{
            const delta = value - acc.mean;
            acc.mean += delta/(index+1);
            acc.stdev += delta*(value-acc.mean);
            return acc;
        }, {mean:0, stdev:0});
        stats.stdev = Math.sqrt(stats.stdev / (N - 1));
        return stats;
    }

    static oddCount(numsArray: Array<number[]>): Stats {
        const data:number[] = numsArray.map(numbers => Calculate.oddCount(numbers));
        return this.getStats(data);
    }

    static sum(numsArray: Array<number[]>): Stats {
        const data:number[] = numsArray.map(numbers => Calculate.sum(numbers));
        return this.getStats(data);
    }

    
    private static posNumCount(numsArray: Array<number[]>, COUNT: Position): number[] {
        const result:number[] = new Array<number>(COUNT).fill(0);
        numsArray.forEach(numbers => {
            let temp:number[];
            switch(COUNT){
                case Position.$1: temp = Calculate.ratio$1(numbers);
                    break;
                case Position.$10:temp = Calculate.ratio$10(numbers);
                    break;
            }
            temp.forEach((value, index) => result[index] += value);
        });
        return result;
    }

    static posCount$1(numsArray: Array<number[]>): number[] {
        return this.posNumCount(numsArray, Position.$1);
    }
    static posCount$10(numsArray: Array<number[]>): number[] {
        return this.posNumCount(numsArray, Position.$10);
    }

    static min(numsArray: Array<number[]>): Stats{
        const data:number[] = numsArray.map(numbers => Calculate.min(numbers));
        return this.getStats(data);
    }
    static max(numsArray: Array<number[]>): Stats{
        const data:number[] = numsArray.map(numbers => Calculate.max(numbers));
        return this.getStats(data);
    }
    static diffMaxMin(numsArray: Array<number[]>): Stats{
        const data:number[] = numsArray.map(numbers => Calculate.max(numbers) - Calculate.min(numbers));
        return this.getStats(data);
    }
}

export enum Mode { $ALL, $1 = 1, $2 = 2, $4 = 4, $12 = 12, $24 = 24, $48 = 48, $96 = 96, $192 = 192, $384 = 384, $768 = 768 };
export interface HarmonyData{
    count:number;
    first:number;
    second:number;
    round:number;
}
export interface Stats{
    mean:number;
    stdev:number;
}
export default class LottoStat {
    static readonly COUNT: number = 6;
    public readonly MODE: Mode;
    private readonly data: Array<number[]> = [];

    constructor(mode: Mode) {
        this.MODE = mode;
        let _lottos: [];

        //lotto 번호는 반드시 내림차순으로 받아올 것. 이유: 최근 ~회차를 slice(0,~)으로 받아오기 때문.
        switch (mode) {
            case Mode.$ALL: _lottos = lottos;
                break;
            default: _lottos = lottos.slice(0, mode);
        }

        _lottos.forEach((lotto: any) => this.push(lotto.numbers));
    }

    getData(): Array<number[]> {
        return this.data;
    }

    push(numbers: Array<number>): void {
        if (numbers.length !== LottoStat.COUNT) throw new SyntaxError(`The length of data element has to be ${LottoStat.COUNT}`);
        this.data.push(numbers);
    }

    oddCount(): Stats {
        return Statistics.oddCount(this.data);
    }

    sum(): Stats {
        return Statistics.sum(this.data);
    }

    posCount$1(): number[] {
        return Statistics.posCount$1(this.data);
    }
    posCount$10(): number[] {
        return Statistics.posCount$10(this.data);
    }

    howLongNone(): number[] {
        return Calculate.howLongNone();
    }

    harmony(): HarmonyData[] {
        return Calculate.harmony(this.data);
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
}