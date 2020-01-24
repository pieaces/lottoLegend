import { ZeroToFour, LottoNumber } from './Base'
import Calculate from '../Statistics/Calculate'
import Confirmer from './Confirmer';
import Lotto from '../Lotto/Lotto';

export default class Generator extends Confirmer {
    protected generatedNumbers: Array<LottoNumber[]> = [];
    sumSet: Set<LottoNumber> = new Set<LottoNumber>();
    constructor() { super(); }

    getGeneratedNumbers(): Array<LottoNumber[]> {
        return this.generatedNumbers;
    }

    generate(): void {
        const list: LottoNumber[] = [];

        let highIndex = -1;
        for (let i = 1; i <= 45; i++) {
            const notExistExcept: boolean = this.exceptedLines ? this.exceptedLines.indexOf(<ZeroToFour>Math.floor((i) / 10)) === -1 : true;
            const notExistExclude = this.excludeNumbers.indexOf(<LottoNumber>(i)) === -1
            const notExistInclude = this.includeNumbers.indexOf((i) as LottoNumber) === -1
            if (notExistExcept && notExistExclude && notExistInclude) {
                if (highIndex === -1 && i >= 23) highIndex = list.length;
                list.push(i as LottoNumber);
            }
        }

        const LIST_SIZE = list.length;
        const INCLUDE_SIZE = this.includeNumbers.length;
        const BOX_SIZE = 6 - INCLUDE_SIZE;
        const LOW_COUNT = this.lowCount ? this.lowCount - Calculate.lowCount(this.includeNumbers) : -1;

        const indexBox = new Array<number>(BOX_SIZE); //list의 index를 value로 취함.
        const indexDnb = new Array<number>(BOX_SIZE);
        const indexUpb = new Array<number>(BOX_SIZE);

        let moveBox: () => void;
        if (LOW_COUNT >= 0) {
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

            for (let i = 0; i < LOW_COUNT; i++) {
                indexUpb[i] = highIndex - (LOW_COUNT - i);
            }
            for (let i = LOW_COUNT; i < BOX_SIZE; i++) {
                indexUpb[i] = LIST_SIZE - (BOX_SIZE - i);
            }
            moveBox = (): void => {
                for (let i = BOX_SIZE - 2; i >= 0; i--) {
                    if (indexBox[i] < indexUpb[i]) {
                        indexBox[i]++;
                        if (i >= LOW_COUNT) {
                            for (let j = i + 1; j < BOX_SIZE; j++) {
                                indexBox[j] = indexBox[j - 1] + 1;
                            }
                            break;
                        } else {
                            for (let j = i + 1; j < LOW_COUNT; j++) {
                                indexBox[j] = indexBox[j - 1] + 1;
                            }
                            for (let j = LOW_COUNT; j < BOX_SIZE; j++) {
                                indexBox[j] = indexDnb[j];
                            }
                            break;
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < BOX_SIZE; i++) {
                indexBox[i] = i;
                indexUpb[i] = LIST_SIZE - (BOX_SIZE - i);
            }
            moveBox = (): void => {
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
        }

        const result: Array<LottoNumber[]> = [];
        while (true) {
            const box: LottoNumber[] = [];

            for (let i = 0; i < INCLUDE_SIZE; i++) box[i] = this.includeNumbers[i];
            for (let i = INCLUDE_SIZE; i < INCLUDE_SIZE + BOX_SIZE; i++) box[i] = list[indexBox[i - INCLUDE_SIZE]] as LottoNumber

            if (1 < 1) {
            } else if (this.sum && !this.checkSum(box)) {
            } else if (this.oddCount && !this.checkOddCount(box)) {
            } else if (this.primeCount && !this.checkPrimeCount(box)) {
            } else if (this.$3Count && !this.check$3Count(box)) {
            } else if (this.diffMaxMin && !this.checkDiffMinMax(box)) {
            } else if (this.sum$10 && !this.checkSum$10(box)) {
            } else if (this.exceptedLines && !this.checkExceptedLines(box)) {
            } else if (this.AC && !this.checkAC(box)) {
            } else if (this.consecutiveExclude && this.checkConsecutiveExist(box.sort((a, b) => a - b))) {//제외하라고 했는데, 연속번호 존재하면 여기서 걸림. +여기서 정렬은 배열을 바꿈
            } else {//모든 조건상황에서도 참이었을 때,
                result.push(box);
                this.sumSet.add(Calculate.sum(box) as LottoNumber);
            }

            if (indexBox[0] === indexUpb[0] && this.lowCount &&indexBox[this.lowCount] === indexUpb[this.lowCount] || indexBox[0] === indexUpb[0] && !this.lowCount) break;
            else {
                indexBox[BOX_SIZE - 1]++;
                if (indexBox[BOX_SIZE - 1] > indexUpb[BOX_SIZE - 1]) moveBox();
            }
        }

        this.generatedNumbers = result;
    }
}