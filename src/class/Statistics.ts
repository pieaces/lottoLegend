import Calculate, {Position} from './Calculate'
export interface Stats{
    mean:number;
    stdev:number;
}
export default class Statistics {
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

    
    private static posNumCount(numsArray: Array<number[]>, pos: Position): number[] {
        const result:number[] = new Array<number>(pos).fill(0);
        numsArray.forEach(numbers => {
            let temp:number[];
            switch(pos){
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
    static AC(numsArray: Array<number[]>): Stats {
        const data:number[] = numsArray.map(numbers => Calculate.AC(numbers));
        return this.getStats(data);
    }
}