import Probability from './Probability'
export interface Stats {
    mean: number;
    stdev: number;
    max: number;
    min: number;
}
//통계: 일차원 데이터 => 객체 데이터
export default class Statistics extends Probability {
    private constructor() { super(); }

    public static getStats(data: number[]): Stats {
        const N = data.length;
        if (N === 0) return null;
        if (N === 1) return { mean: data[0], stdev: 0, max: data[0], min: data[0] };
        const basicStats = data.reduce((acc, value, index) => {
            const delta = value - acc.mean;
            acc.mean += delta / (index + 1);
            acc.stdev += delta * (value - acc.mean);
            return acc;
        }, { mean: 0, stdev: 0 });
        basicStats.stdev = Math.sqrt(basicStats.stdev / (N - 1));
        
        const stats: Stats = {
            mean: basicStats.mean,
            stdev: basicStats.stdev,
            max: Math.max(...data),
            min: Math.min(...data)
        }
        return stats;
    }
}