import { GeneratorOption, ZeroToFour, LottoNumber } from './Base'
import Calculate from '../Statistics/Calculate'
import Check from './Check';

export default class Generator extends Check {
    protected generatedNumbers: Array<LottoNumber[]> = [];
    numberSet: Set<LottoNumber> = new Set<LottoNumber>();
    constructor(option: GeneratorOption) { super(option); }

    getGeneratedNumbers(): Array<LottoNumber[]> {
        return this.generatedNumbers;
    }

    generate(): void {
        const list: LottoNumber[] = [];

        let highIndex = -1;
        for (let i = 1; i <= 45; i++) {
            const notExistExcept: boolean = this.option.exceptedLines ? this.option.exceptedLines.indexOf(<ZeroToFour>Math.floor((i) / 10)) === -1 : true;
            const notExistExclude = this.option.excludeNumbers ? this.option.excludeNumbers.indexOf(<LottoNumber>(i)) === -1 : true;
            const notExistInclude = this.option.includeNumbers ? this.option.includeNumbers.indexOf((i) as LottoNumber) === -1 : true;
            if (notExistExcept && notExistExclude && notExistInclude) {
                if (highIndex === -1 && i >= 23) highIndex = list.length;
                list.push(i as LottoNumber);
            }
        }

        const LIST_SIZE = list.length;
        const INCLUDE_SIZE = this.option.includeNumbers ? this.option.includeNumbers.length : 0;
        const BOX_SIZE = 6 - INCLUDE_SIZE;
        const LOW_COUNT = this.option.includeNumbers ? this.option.lowCount - Calculate.lowCount(this.option.includeNumbers) : this.option.lowCount;

        const indexBox = new Array<number>(BOX_SIZE); //list의 index를 value로 취함.
        const indexDnb = new Array<number>(BOX_SIZE);
        const indexUpb = new Array<number>(BOX_SIZE);

        let moveBox: () => void;

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

        const result: Array<LottoNumber[]> = [];
        while (true) {
            const box: LottoNumber[] = [];

            for (let i = 0; i < INCLUDE_SIZE; i++) box[i] = this.option.includeNumbers[i];
            for (let i = INCLUDE_SIZE; i < INCLUDE_SIZE + BOX_SIZE; i++) box[i] = list[indexBox[i - INCLUDE_SIZE]] as LottoNumber

            if (1 < 1) {
            } else if (this.option.sum && !this.checkSum(box)) {
            } else if (this.option.oddCount && !this.checkOddCount(box)) {
            } else if (this.option.primeCount && !this.checkPrimeCount(box)) {
            } else if (this.option.$3Count && !this.check$3Count(box)) {
            } else if (this.option.diffMaxMin && !this.checkDiffMinMax(box)) {
            } else if (this.option.sum$10 && !this.checkSum$10(box)) {
            } else if (this.option.exceptedLines && !this.checkExceptedLines(box)) {
            } else if (this.option.AC && !this.checkAC(box)) {
            } else if (this.option.consecutiveExclude && this.checkConsecutiveExist(box.sort((a, b) => a - b))) {//제외하라고 했는데, 연속번호 존재하면 여기서 걸림. +여기서 정렬은 배열을 바꿈
            } else {//모든 조건상황에서도 참이었을 때,
                result.push(box);
                this.numberSet.add(Calculate.sum(box) as LottoNumber);
            }

            if (indexBox[0] === indexUpb[0] && indexBox[this.option.lowCount]) break;
            else {
                indexBox[BOX_SIZE - 1]++;
                if (indexBox[BOX_SIZE - 1] > indexUpb[BOX_SIZE - 1]) moveBox();
            }
        }

        this.generatedNumbers = result;
    }
}