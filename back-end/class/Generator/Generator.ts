import { ZeroToFour, LottoNumber } from './Base'
import Calculate from '../Statistics/Calculate'
import GeneratorConfigure from './Configure';

export default class Generator extends GeneratorConfigure {
    protected generatedNumbers: Array<LottoNumber[]> = [];
    constructor() { super(); }

    getGeneratedNumbers(): Array<LottoNumber[]> {
        return this.generatedNumbers;
    }
    private checkOddCount(numbers: number[]): boolean {
        return Calculate.oddCount(numbers) === this.oddCount;
    }
    private checkPrimeCount(numbers: number[]): boolean {
        return Calculate.primeCount(numbers) === this.primeCount;
    }
    private check$3Count(numbers: number[]): boolean {
        return Calculate.$3Count(numbers) === this.$3Count;
    }
    private checkSum$10(numbers: number[]): boolean {
        const sum$10 = Calculate.sum$10(numbers);
        return this.sum$10.from <= sum$10 && sum$10 <= this.sum$10.to;
    }
    private checkSum(numbers: number[]): boolean {
        const sum = Calculate.sum(numbers);
        return this.sum.from <= sum && sum <= this.sum.to;
    }
    private checkDiffMinMax(numbers: number[]): boolean {
        const diffMaxMin = Calculate.diffMaxMin(numbers);
        return this.diffMaxMin.from <= diffMaxMin && diffMaxMin <= this.diffMaxMin.to;
    }
    private checkAC(numbers: number[]): boolean {
        const AC = Calculate.AC(numbers);
        return this.AC.from <= AC && AC <= this.AC.to;
    }
    private checkConsecutiveExist(numbers: number[]): boolean {
        return Calculate.consecutiveExist(numbers) === 1 //1일경우 존재함. 0일경우 존재하지않음.
    }
    //include:[1,3], exclude:[3,6,0]
    //[1,3,5,9,11,12,15,29,13,14,28,3,4]
    generate(): void {
        const list: number[] = [];

        let highIndex = -1;
        for (let i = 1; i <= 45; i++) {
            const notExistExcept: boolean = this.exceptedLines.indexOf(<ZeroToFour>Math.floor((i) / 10)) === -1;
            const notExistExclude = this.excludeNumbers.indexOf(<LottoNumber>(i)) === -1
            const notExistInclude = this.includeNumbers.indexOf((i) as LottoNumber) === -1
            if (notExistExcept && notExistExclude && notExistInclude) {
                if (highIndex === -1 && i >= 23) highIndex = list.length;
                list.push(i);
            }
        }
        const LIST_SIZE = list.length;
        const INCLUDE_SIZE = this.includeNumbers.length;
        const BOX_SIZE = 6 - INCLUDE_SIZE;
        const LOW_COUNT = this.lowCount - Calculate.lowCount(this.includeNumbers);

        const indexBox = new Array<number>(BOX_SIZE); //list의 index를 value로 취함.
        const indexDnb = new Array<number>(BOX_SIZE);
        const indexUpb = new Array<number>(BOX_SIZE);

        for (let i = 0; i < LOW_COUNT; i++) {
            indexUpb[i] = highIndex - (LOW_COUNT - i);
        }
        for (let i = LOW_COUNT; i < BOX_SIZE; i++) {
            indexUpb[i] = LIST_SIZE - (BOX_SIZE - i);
        }

        for (let i = 0; i < LOW_COUNT; i++) {
            indexBox[i] = i;
            indexDnb[i] = i;
        }
        indexBox[LOW_COUNT] = highIndex;
        indexDnb[LOW_COUNT] = highIndex;
        for (let i = LOW_COUNT + 1; i < BOX_SIZE; i++) {
            indexBox[i] = indexBox[i - 1] + 1;
            indexDnb[i] = indexBox[i];
        }

        const moveBox = (): void => {
            for (let i = BOX_SIZE - 2; i >= 0; i--) {
                if (indexBox[i] < indexUpb[i]) {
                    indexBox[i]++;
                    if (i >= LOW_COUNT) {
                        for (let j = i + 1; j < BOX_SIZE; j++) {
                            indexBox[j] = indexBox[j - 1] + 1;
                        }
                        break;
                    }else{
                        for (let j = i + 1; j < LOW_COUNT; j++) {
                            indexBox[j] = indexBox[j - 1] + 1;
                        }
                        for(let j = LOW_COUNT; j<BOX_SIZE; j++){
                            indexBox[j] = indexDnb[j];
                        }
                        break;
                    }
                }
            }
        }

        while (true) {
            const box: LottoNumber[] = [];

            for (let i = 0; i < INCLUDE_SIZE; i++) box[i] = this.includeNumbers[i];
            for (let i = INCLUDE_SIZE; i < INCLUDE_SIZE + BOX_SIZE; i++) box[i] = list[indexBox[i - INCLUDE_SIZE]] as LottoNumber


            if (1 < 1) {
            } else if (!this.checkSum(box)) {
                
            } else if (!this.checkOddCount(box)) {
            } else if (!this.checkPrimeCount(box)) {
            } else if (!this.check$3Count(box)) {
            } else if (!this.checkDiffMinMax(box)) {
            } else if (!this.checkSum$10(box)) {
            } else if (!this.checkAC(box)) {
            } else if (!this.stautsConsecutive && this.checkConsecutiveExist(box.sort((a,b)=>a-b))) {//제외하라고 했는데, 연속번호 존재하면 여기서 걸림. +여기서 정렬은 배열을 바꿈
            } else {//모든 조건상황에서도 참이었을 때,
                this.generatedNumbers.push(box);
            }

            if (indexBox[0] === indexUpb[0]) break;
            else {
                indexBox[BOX_SIZE - 1]++;
                if (indexBox[BOX_SIZE - 1] > indexUpb[BOX_SIZE - 1]) moveBox();
            }
        }
    }
}