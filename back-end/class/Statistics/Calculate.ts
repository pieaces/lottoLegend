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
    static primeCount(numbers:number[]): number {
        let count = 0;
        numbers.forEach(value => {
            switch(value){
                case 2: case 3: case 5: case 7:
                case 11: case 13: case 17: case 19:
                case 23: case 29: case 31: case 37:
                case 41: case 43: 
                count++;
            }
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
    static sum$1(numbers: number[]): number {
        return numbers.reduce((acc, cur) => acc + cur % 10, 0);
    }

    static min(numbers: number[]): number {
        return Math.min(...numbers);
    }
    static max(numbers: number[]): number {
        return Math.max(...numbers);
    }

    static diffMaxMin(numbers: number[]): number {
        return Calculate.max(numbers) - Calculate.min(numbers);
    }

    static AC(numbers: number[]): number {
        const set = new Set<number>();
        for(let i = 0; i<numbers.length; i++){
            for(let j=i+1; j<numbers.length; j++){
                set.add(Math.abs(numbers[j]-numbers[i]));
            }
        }
        return set.size - (numbers.length - 1);
    }

    static lowCount(numbers: number[]): number {
        let count =0;
        numbers.forEach(value => {
            if(value <23) count++;
        });
        return count;
    }

    static consecutiveExist(numbers: number[]): 0|1 {
        for(let i =1; i<numbers.length; i++){
            if(numbers[i] -1 === numbers[i-1]){
                return 1;
            }
        }
        return 0;
    }
}
