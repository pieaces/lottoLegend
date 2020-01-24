import _Generator from './_Generator'
import { LottoNumber } from './GeneratorBase';
import Calculate from '../Statistics/Calculate';

export default class Generator extends _Generator {
    constructor(){super();}
    filterInclude(): void {
        const numsArray = this.generatedNumbers;
        const include = this.includeNumbers;

        const result:Array<LottoNumber[]> = [];
        if (include.length > 0) {
            for (let i = 0; i < numsArray.length; i++) {
                let check = true;
                for (let j = 0; j < include.length; j++) {
                    if (numsArray[i].indexOf(include[j]) === -1) {
                        check = false;
                        break;
                    }
                }
                if (check) result.push(numsArray[i]);
            }
            this.generatedNumbers = result;
        }
    }

    filterExclude(): void {
        const numsArray = this.generatedNumbers;
        const exclude = this.excludeNumbers;

        const result:Array<LottoNumber[]> = [];
        if (exclude.length > 0) {
            for (let i = 0; i < numsArray.length; i++) {
                let check = true;
                for (let j = 0; j < exclude.length; j++) {
                    if (numsArray[i].indexOf(exclude[j]) !== -1) {
                        check = false;
                        break;
                    }
                }
                if (check) result.push(numsArray[i]);
            }
            this.generatedNumbers = result;
        }
    }

    filterConsecutive(): void {
        const result: Array<LottoNumber[]> = [];
        this.generatedNumbers.forEach(numbers => {
            if (!(this.consecutiveExclude && Calculate.consecutiveExist(numbers) === 1)) {
                result.push(numbers);
            }
        });
        this.generatedNumbers = result;
    }
}