import Probability from './Probability'
export interface Stats {
    mean: number;
    stdev: number;
}
//통계: 일차원 데이터 => 객체 데이터
export default class Statistics extends Probability {
    private constructor() { super(); }

    public static getStats(data: number[]): Stats {
        const N = data.length;
        if (N === 0) return null;
        if (N === 1) return { mean: data[0], stdev: 0 };
        const stats = data.reduce((acc, value, index) => {
            const delta = value - acc.mean;
            acc.mean += delta / (index + 1);
            acc.stdev += delta * (value - acc.mean);
            return acc;
        }, { mean: 0, stdev: 0 });
        stats.stdev = Math.sqrt(stats.stdev / (N - 1));
        return stats;
    }

    public static pqc(cases: number, prob: number): number[] { //p^(k)q^(n-k)C(n,k)
        const discreteProb = (n: number, prob:number, k:number):number => Math.pow(prob, k) * Math.pow(1 - prob, n-k) * this.C(n, k);
        
        const result:number[] = [];
        for(let num=0; num<=cases; num++) result.push(discreteProb(cases, prob, num));

        return result;
    }
}