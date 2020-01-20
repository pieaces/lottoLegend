//계산: 일차원 데이터 => 영차원 데이터
export default class Calculate {
    private constructor() { }

    public static getData(numsArray: Array<number[]>, method: (numbers: number[]) => number) {
        return numsArray.map(numbers => method(numbers));
    }

    static exceptedLineCount(numbers: number[]): number {
        const SIZE = 5;
        const set = new Set<number>();

        numbers.forEach(num => {
            set.add(Math.floor(num / 10));
        });

        return SIZE - set.size;
    }

    static oddCount(numbers: number[]): number {
        let count = 0;
        numbers.forEach(value => {
            if (value % 2 === 1) count++;
        });
        return count;
    }
    static $3Count(numbers: number[]): number {
        let count = 0;
        numbers.forEach(value => {
            if(value % 3 === 0) count++;
        });
        return count;
    }

    static sum(numbers: number[]): number {
        return numbers.reduce((acc, cur) => acc + cur, 0);
    }
    static sum$10(numbers: number[]): number {
        return numbers.reduce((acc, cur) => acc + Math.floor(cur / 10), 0);
    }

    static min(numbers: number[]): number {
        return Math.min(...numbers);
    }
    static max(numbers: number[]): number {
        return Math.max(...numbers);
    }

    static diffMaxMin(numbers: number[]): number {
        return this.max(numbers) - this.min(numbers);
    }

    static AC(numbers: number[]): number {
        const set = new Set<number>();
        const copy:number[] = [];
        numbers.forEach(value => copy.push(value));
        copy.sort((a, b) => b-a).forEach((bigValue, index, array) => array.slice(index + 1).forEach(smallValue => set.add(bigValue - smallValue)));
        return set.size - (numbers.length - 1);
    }
}