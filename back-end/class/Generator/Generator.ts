import GeneratorBase, { ZeroToFour, LottoNumber, Range } from './GeneratorBase'
import Calculate from '../Statistics/Calculate'

export default class Generator extends GeneratorBase{
    constructor(){super();}

    private checkOddCount(numbers: number[]): boolean{
        return Calculate.oddCount(numbers) === this.oddCount;
    }
    private checkPrimeCount(numbers: number[]): boolean{
        return Calculate.primeCount(numbers) === this.primeCount;
    }
    private check$3Count(numbers: number[]): boolean{
        return Calculate.$3Count(numbers) === this.$3Count;
    }
    private checkLowCount(numbers:number[]):boolean{
        return Calculate.lowCount(numbers) === this.lowCount;
    }
    private checkSum$10(numbers: number[]): boolean{
        return this.sum$10.from <= Calculate.sum$10(numbers) && Calculate.sum$10(numbers) <= this.sum$10.to;
    }
    private checkSum(numbers: number[]): boolean{
        return this.sum.from <= Calculate.sum(numbers) && Calculate.sum(numbers) <= this.sum.to;
    }
    private checkDiffMinMax(numbers: number[]): boolean{
        return this.diffMaxMin.from <= Calculate.diffMaxMin(numbers) && Calculate.diffMaxMin(numbers) <= this.diffMaxMin.to;
    }
    private checkAC(numbers: number[]): boolean{
        return this.AC.from <= Calculate.AC(numbers) && Calculate.AC(numbers) <= this.AC.to;

    }
    generate(): Array<LottoNumber[]> {
        const list: number[] = [];
        for (let i = 1; i <= 45; i++) {
            const existExcept = this.exceptedLines.indexOf(<ZeroToFour>Math.floor((i) / 10));
            if (existExcept === -1 && this.excludeNumber.indexOf(<LottoNumber>(i)) === -1 && this.includeNumber.indexOf((i) as LottoNumber) === -1) {
                list.push(i);
            }
        }
        const indexBox:number[] = []; //list의 index를 value로 취함.
        const INCLUDE_SIZE = this.includeNumber.length;
        for(let i =0; i<6-INCLUDE_SIZE; i++){
            indexBox[i]=i;
        }
        const BOX_SIZE = indexBox.length;

        const LIST_SIZE = list.length;
        const indexUpb = new Array<number>(BOX_SIZE);
        for(let i =0; i<BOX_SIZE; i++){
            indexUpb[i] = LIST_SIZE - (BOX_SIZE-i);
        }

        const moveBox = (): void => {
            for (let i = BOX_SIZE - 2; i >= 0; i--) {
                if (indexBox[i] < indexUpb[i]) {
                    indexBox[i]++;
                    for (let j = i + 1; j < BOX_SIZE; j++) {
                        indexBox[j] = indexBox[j - 1] + 1;
                    }
                    break;
                }
            }
        }
        const result: Array<number[]> = [];
        while (true) {
            const box:number[] = [];
            this.includeNumber.forEach(value => box.push(value));
            //조건체크 후 실행
            for(let i =INCLUDE_SIZE; i<INCLUDE_SIZE+BOX_SIZE; i++){
                box[i] = list[indexBox[i-INCLUDE_SIZE]]
            }

            if (!this.checkOddCount(box)) {
            }else if(!this.checkPrimeCount(box)){
            } else if (!this.check$3Count(box)) {
            } else if (!this.checkLowCount(box)) {
            } else if (!this.checkSum$10(box)) {
            } else if (!this.checkSum(box)){
            } else if (!this.checkDiffMinMax(box)) {
            } else if (!this.checkAC(box)) {
            } else {//모든 조건상황에서도 참이었을 때,
                result.push(box.sort((a,b) => a-b));
            }

            if (indexBox[0] === indexUpb[0]) break;
            else {
                indexBox[BOX_SIZE - 1]++;
                if (indexBox[BOX_SIZE - 1] > indexUpb[BOX_SIZE - 1]) moveBox();
            }
        }
        return result as Array<LottoNumber[]>;
    }
}