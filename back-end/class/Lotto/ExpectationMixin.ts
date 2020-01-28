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

export interface Params{
    from?:number;
    to?:number;
    mode?:number;
}
const ExpectationMixIn = <TBase extends Constructor>(Base: TBase) =>
    class extends Base {
        public mode: number;
        //전체 공의 개수 중에서 해당색깔의 공의 기댓값
        expectedExceptedLineCount(params:Params={}): number[] {
            const from = params.from || 0;
            const to = params.to || 4;
            const mode = params.mode || this.mode;
            const pos:number[] = posExcludedLineCount;
            return pos.slice(from, to+1).map(value => value * params.mode);
        }
        expectedLineCount(mode: number = this.mode): number[] {//1~9, 10~19, 20~29, 30~39, 40~45
            const pos = [9 / 45, 10 / 45, 10 / 45, 10 / 45, 6 / 45];
            return pos.map(value => value * (6 * mode));
        }
        //십의자리 합의 기댓값
        expectedSum$10(params:Params={}): number[] { // 0~24
            const from = params.from || 0;
            const to = params.to || 24;
            const mode = params.mode || this.mode;
            const pos:number[] = posSum;
            return pos.slice(from, to+1).map(value => value * params.mode);
        }
        expectedSum(params:Params={}): number[] { // 21~255
            const from = params.from || 21;
            const to = params.to || 255;
            const mode = params.mode || this.mode;
            const pos:number[] = posSum;
            return pos.slice(from-21, to-21+1).map(value => value * params.mode);
        }
        //홀수갯수의 기댓값
        expectedOddCount(params:Params={}): number[] {
            const from = params.from || 0;
            const to = params.to || 6;
            const mode = params.mode || this.mode;
            const pos:number[] = posOddCount;
            return pos.slice(from, to+1).map(value => value * params.mode);
        }
        expectedPrimeCount(params:Params={}): number[] {
            const from = params.from || 0;
            const to = params.to || 6;
            const mode = params.mode || this.mode;
            const pos:number[] = posPrimeCount;
            return pos.slice(from, to+1).map(value => value * params.mode);
        }
        expectedLowCount(params:Params={}): number[] {
            const from = params.from || 0;
            const to = params.to || 6;
            const mode = params.mode || this.mode;
            const pos:number[] = posLowCount;
            return pos.slice(from, to+1).map(value => value * params.mode);
        }
        expected$3Count(params:Params={}): number[] {
            const from = params.from || 0;
            const to = params.to || 6;
            const mode = params.mode || this.mode;
            const pos:number[] = pos$3Count;
            return pos.slice(from, to+1).map(value => value * params.mode);
        }
        expectedAC(params:Params={}): number[] {
            const from = params.from || 0;
            const to = params.to || 10;
            const mode = params.mode || this.mode;
            const pos:number[] = posAC;
            return pos.slice(from, to+1).map(value => value * params.mode);
        }
        expectedDiffMaxMinData(params:Params={}): number[] { //5~44
            const from = params.from || 5;
            const to = params.to || 44;
            const mode = params.mode || this.mode;
            const pos:number[] = posDiffMaxMin;
            return pos.slice(from-5, to-5+1).map(value => value * params.mode);
        }
        expectedCarryCount(params:Params={}): number[] {
            const from = params.from || 0;
            const to = params.to || 6;
            const mode = params.mode || this.mode;
            const pos:number[] = posCarryCount;
            return pos.slice(from, to+1).map(value => value * params.mode);
        }
    };

export default ExpectationMixIn;