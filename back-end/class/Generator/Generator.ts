import GeneratorBase, { ZeroToFour, ZeroToSix, LottoNumber, Range } from './GeneratorBase'
import Calculate from '../Statistics/Calculate'

export default class Generator extends GeneratorBase{
    constructor(){super();}
    generate(): Array<LottoNumber[]> {
        const list: number[] = [];
        for (let i = 0; i < 45; i++) {
            const existExcept = this.exceptedLines.indexOf(<ZeroToFour>Math.floor((i + 1) / 10));
            if (existExcept === -1 && this.excludeNumber.indexOf(<LottoNumber>(i+1)) === -1 && this.includeNumber.indexOf((i+1) as LottoNumber) === -1) {
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
        const box:number[] = [];
        this.includeNumber.forEach(value => box.push(value));
        while (true) {
            //조건체크 후 실행
            for(let i =INCLUDE_SIZE; i<INCLUDE_SIZE+BOX_SIZE; i++){
                box[i] = list[indexBox[i-1]]
            }

            if (Calculate.oddCount(box) !== this.oddCount) {
            } else if (Calculate.$3Count(box) !== this.$3Count) {
            } else if (Calculate.lowCount(box) !== this.lowCount) {
            } else if (!(this.sum$10.from <= Calculate.sum$10(box) && Calculate.sum$10(box) <= this.sum$10.to)) {
            } else if (!(this.diffMaxMin.from <= Calculate.diffMaxMin(box) && Calculate.diffMaxMin(box) <= this.diffMaxMin.to)) {
            } else if (!(this.ac.from <= Calculate.AC(box) && Calculate.AC(box) <= this.ac.to)) {
            } else {//모든 조건상황에서도 참이었을 때,
                result.push(box);
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