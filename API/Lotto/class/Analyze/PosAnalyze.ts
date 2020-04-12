enum PosNumber{$1 = 10, $10 = 5};
export default class PosAnalyze {
    protected constructor() {}
    private static ratio$1(numbers: number[]): number[] {
        const result: number[] = new Array<number>(PosNumber.$1).fill(0);
        numbers.forEach((value) => {
            switch(value){
                case 0: result[PosNumber.$1 - 1]++;
                break;
                default: result[(value - 1) % 10]++;
            }
        });
        /*
        return result.map((value, index) => {
            if (index > 5) return value * (5 / 4);
            else return value;
        });
        */
       return result;
    };
    private static ratio$10(numbers: number[]): number[] {
        const result: number[] = new Array<number>(PosNumber.$10).fill(0);
        numbers.forEach((value) => result[Math.floor((value-1) / 10)]++);
        //result[0] *= 10 / 9;
        //result[4] *= 10 / 6;
        return result;
    };
    private static posCount(numsArray: Array<number[]>, posNum: PosNumber): number[] {
        const SIZE = posNum;
        let method: (numbers: number[]) => number[];
        switch (posNum) {
            case PosNumber.$1: method = PosAnalyze.ratio$1;
                break;
            case PosNumber.$10: method = PosAnalyze.ratio$10;
                break;
        }
        const result: number[] = new Array<number>(SIZE).fill(0);
        numsArray.forEach(numbers => {
            const temp: number[] = method(numbers);
            temp.forEach((value, index) => result[index] += value);
        });
        return result;
    }
    static posCount$1(numsArray: Array<number[]>): number[] {
        return PosAnalyze.posCount(numsArray, PosNumber.$1);
    }
    static posCount$10(numsArray: Array<number[]>): number[] {
        return PosAnalyze.posCount(numsArray, PosNumber.$10);
    }
}