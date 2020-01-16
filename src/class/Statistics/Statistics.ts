import Calculate from './Calculate'
export interface Stats{
    mean:number;
    stdev:number;
}
//통계: 일차원 데이터 => 객체 데이터
export default class Statistics {
    private constructor() { }

    public static get(data:number[]): Stats{
        const N = data.length;
        if(N === 0) return null;
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
        return Statistics.get(data);
    }

    static sum(numsArray: Array<number[]>): Stats {
        const data:number[] = numsArray.map(numbers => Calculate.sum(numbers));
        return Statistics.get(data);
    }

    static min(numsArray: Array<number[]>): Stats{
        const data:number[] = numsArray.map(numbers => Calculate.min(numbers));
        return Statistics.get(data);
    }
    static max(numsArray: Array<number[]>): Stats{
        const data:number[] = numsArray.map(numbers => Calculate.max(numbers));
        return Statistics.get(data);
    }
    static diffMaxMin(numsArray: Array<number[]>): Stats{
        const data:number[] = numsArray.map(numbers => Calculate.max(numbers) - Calculate.min(numbers));
        return Statistics.get(data);
    }

    static AC(numsArray: Array<number[]>): Stats {
        const data:number[] = numsArray.map(numbers => Calculate.AC(numbers));
        return Statistics.get(data);
    }
}