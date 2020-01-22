type Constructor<T = {}> = new (...args: any[]) => T;
const posLineCount = require('../../json/Expectaiton/lineCount.json');
const posSum$10 = require('../../json/Expectaiton/sum$10.json');
const posSum = require('../../json/Expectaiton/sum.json');
const posPrimeCount = require('../../json/Expectaiton/primeCount.json');
const posOddCount = require('../../json/Expectaiton/oddCount.json');
const posLowCount = require('../../json/Expectaiton/lowCount.json');
const pos$3Count = require('../../json/Expectaiton/$3Count.json');
const posAC = require('../../json/Expectaiton/AC.json');
const posDiffMaxMin = require('../../json/Expectaiton/diffMaxMin.json');
const posCarryCount = require('../../json/Expectaiton/carrycount.json');

const ExpectationMixIn = <TBase extends Constructor>(Base: TBase) =>
    class extends Base {
        public mode: number;
        //전체 공의 개수 중에서 해당색깔의 공의 기댓값
        expectedExceptedLineCount(mode: number = this.mode): number[] {
            const pos:number[] = posLineCount;
            return pos.map(value => value * mode);
        }
        expectedLineCount(mode: number = this.mode): number[] {//1~9, 10~19, 20~29, 30~39, 40~45
            const pos = [9 / 45, 10 / 45, 10 / 45, 10 / 45, 6 / 45];
            return pos.map(value => value * (6 * mode));
        }
        //십의자리 합의 기댓값
        expectedSum$10(mode: number = this.mode): number[] { // 0~24
            const pos:number[] = posSum$10;
            return pos.map(value => value * (mode));
        }
        expectedSum(mode: number = this.mode): number[] { // 21~255
            const pos:number[] = posSum;
            return pos.map(value => value * (mode));
        }
        //홀수갯수의 기댓값
        expectedOddCount(mode: number = this.mode): number[] {
            const pos:number[] = posOddCount;
            return pos.map(value => value * (mode));
        }
        expectedPrimeCount(mode: number = this.mode): number[] {
            const pos:number[] = posPrimeCount;
            return pos.map(value => value * mode);
        }
        expectedLowCount(mode: number = this.mode): number[] {
            const pos:number[] = posLowCount;
            return pos.map(value => value * mode);
        }
        expected$3Count(mode: number = this.mode): number[] {
            const pos:number[] = pos$3Count;
            return pos.map(value => value * (mode));
        }
        expectedAC(mode: number = this.mode): number[] {
            const pos:number[] = posAC;
            return pos.map(value => value * (mode));
        }
        expectedDiffMaxMinData(mode: number = this.mode): number[] { //5~44
            const pos:number[] = posDiffMaxMin;
            return pos.map(value => value * mode);
        }
        expectedCarryCount(mode: number = this.mode): number[] {
            const pos:number[] = posCarryCount;
            return pos.map(value => value * mode);
        }
    };

export default ExpectationMixIn;