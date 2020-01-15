export enum Position{$1 = 10, $10 = 5};
export default class Calculate {
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
        const result: number[] = new Array<number>(Position.$1).fill(0);
        numbers.forEach((value) => result[value % 10]++);
        return result.map((value, index) => {
            if (index > 5) return value * (5 / 4);
            else return value;
        });
    };

    static ratio$10(numbers: number[]): number[] {
        const result: number[] = new Array<number>(Position.$10).fill(0);
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

    static AC(numbers: number[]): number {
        const set = new Set<number>();
        numbers.reverse().forEach((bigValue, index, array) => array.slice(index + 1).forEach(smallValue => set.add(bigValue - smallValue)));
        return set.size - (numbers.length - 1);
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

    static frequencyCount(numsArray: Array<number[]>): number[] {
        const SIZE = 45;
        const result = new Array<number>();

        for(let i=0; i<numsArray.length; i++){
            for(let j=0; j<numsArray[i].length; j++){
                const index = numsArray[i][j]-1;
                result[index] = result[index] ? ++result[index] : 1;
            }
        }

        for(let i=0; i<SIZE; i++)
            if(!result[i]) result[i] = 0;
        
        return result;
    }
}