import { Mode, isNumber, isTuple } from './Base'
type Constructor<T = {}> = new (...args: any[]) => T;
const posExcludedLineCount = require('../../json/Expectation/excludedLineCount.json');
const posSum$10 = require('../../json/Expectation/sum$10.json');
const posSum = require('../../json/Expectation/sum.json');
const posPrimeCount = require('../../json/Expectation/primeCount.json');
const posOddCount = require('../../json/Expectation/oddCount.json');
const posLowCount = require('../../json/Expectation/lowCount.json');
const pos$3Count = require('../../json/Expectation/$3Count.json');
const posAC = require('../../json/Expectation/AC.json');
const posDiffMaxMin = require('../../json/Expectation/diffMaxMin.json');
const posCarryCount = require('../../json/Expectation/carryCount.json');

export interface Params {
    from?: number;
    to?: number;
    mode?: Mode;
}
const returnParams = (defaultParam: Params, params: Params): { from: number, to: number, count: number } => {
    const from = params.from || defaultParam.from
    const to = params.to || defaultParam.to;
    const mode = params.mode;
    let count: number;
    if (mode) {
        if (isNumber(mode)) count = mode > 0 ? mode : -mode;
        else if (isTuple(mode)) {
            if (mode[0] < 0 && mode[1] < mode[0]) {
                count = mode[0] - mode[1];
            } else if (mode[0] > 0 && mode[1] > mode[0]) {
                count = mode[1] - mode[0];
            }
        }
    } else count = defaultParam.mode as number;

    return { from, to, count };
}
const ExpectationMixIn = <TBase extends Constructor>(Base: TBase) =>
    class extends Base {
        public mode: Mode;
        //전체 공의 개수 중에서 해당색깔의 공의 기댓값
        expectedExcludedLineCount(params: Params = {}): number[] {
            const defaultParam = { from: 0, to: 4, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)

            const pos: number[] = posExcludedLineCount;
            return pos.slice(from, to + 1).map(value => value * count);
        }
        expectedLineCount(params:Params = {mode:this.mode}): number[] {//1~9, 10~19, 20~29, 30~39, 40~45
            const defaultParam = {mode: this.mode}
            const {count} = returnParams(defaultParam, params);

            const pos = [9 / 45, 10 / 45, 10 / 45, 10 / 45, 6 / 45];
            return pos.map(value => value * (6 * count));
        }
        //십의자리 합의 기댓값
        expectedSum$10(params: Params = {}): number[] { // 0~24
            const defaultParam = { from: 0, to: 24, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)

            const pos: number[] = posSum$10;
            return pos.slice(from, to + 1).map(value => value * count);
        }
        expectedSum(params: Params = {}): number[] { // 21~255
            const defaultParam = { from: 21, to: 255, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)

            const pos: number[] = posSum;
            return pos.slice(from - 21, to - 21 + 1).map(value => value * count);
        }
        expectedSum55(params: Params = {}): number[] {
            const defaultParam = { from: 21, to: 255, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)

            let pos: number[] = posSum;
            pos = pos.slice(from - 21, to - 21 + 1).map(value => value * count);

            const result = new Array<number>(Math.floor((to-from)/10)+1).fill(0);
            pos.forEach(value =>{
                if(from <= value && value <= to){
                    result[Math.floor((value-from)/10)]++;
                }
            });
    
            return result;
        }
        //홀수갯수의 기댓값
        expectedOddCount(params: Params = {}): number[] {
            const defaultParam = { from: 0, to: 6, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)
            
            const pos: number[] = posOddCount;
            return pos.slice(from, to + 1).map(value => value * count);
        }
        expectedPrimeCount(params: Params = {}): number[] {
            const defaultParam = { from: 0, to: 6, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)

            const pos: number[] = posPrimeCount;
            return pos.slice(from, to + 1).map(value => value * count);
        }
        expectedLowCount(params: Params = {mode: this.mode}): number[] {
            const defaultParam = { from: 0, to: 6, mode: this.mode }
            const { count } = returnParams(defaultParam, params)

            const pos: number[] = posLowCount;
            return pos.map(value => value * count);
        }
        expected$3Count(params: Params = {}): number[] {
            const defaultParam = { from: 0, to: 6, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)

            const pos: number[] = pos$3Count;
            return pos.slice(from, to + 1).map(value => value * count);
        }
        expectedAC(params: Params = {}): number[] {
            const defaultParam = { from: 0, to: 10, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)

            const pos: number[] = posAC;
            return pos.slice(from, to + 1).map(value => value * count);
        }
        expectedDiffMaxMinData(params: Params = {}): number[] { //5~44
            const defaultParam = { from: 5, to: 44, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)

            const pos: number[] = posDiffMaxMin;
            return pos.slice(from - 5, to - 5 + 1).map(value => value * count);
        }
        expectedCarryCount(params: Params = {}): number[] {
            const defaultParam = { from: 0, to: 6, mode: this.mode }
            const { from, to, count } = returnParams(defaultParam, params)

            const pos: number[] = posCarryCount;
            return pos.slice(from, to + 1).map(value => value * count);
        }
    };

export default ExpectationMixIn;