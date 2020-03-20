import Base from './Base'
import { Params, LData, Mode, isNumber, isTuple } from '../../interface/Lotto';
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
const posConsecutiveExist = require('../../json/Expectation/consecutiveExist.json');

export default class Expectation extends Base {
    public mode: Mode;

    constructor(data: LData[], mode: Mode = data.length) {
        super(data);
        this.mode = mode;
    }

    returnParams(defaultParam: Params, params: Params): { from: number, to: number, count: number } {
        const from = params.from || defaultParam.from
        const to = params.to || defaultParam.to;
        const mode = params.mode;
        let count: number;
        if (mode) {
            if (isNumber(mode)) count = mode > 0 ? mode : -mode;
            else if (isTuple(mode)) {
                if(mode[1] === 0) throw new SyntaxError("'to' !== 0");
                else if (mode[0] * mode[1] >= 0) count = (mode[1] - mode[0]) + 1;
                else if (mode[0] > 0) count = (this.getTotalSize() + mode[1] + 1) - (mode[0]) + 1;
                else if (mode[1] > 0) count = (mode[1]) - (this.getTotalSize() + mode[0] + 1) + 1;
            }
        } else count = defaultParam.mode as number;
        return { from, to, count };
    }

    expectedExcludedLineCount(params: Params = {}): number[] {
        const defaultParam = { from: 0, to: 4, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = posExcludedLineCount;
        return pos.slice(from, to + 1).map(value => value * count);
    }
    expectedLineCount(params: Params = { mode: this.mode }): number[] {//1~9, 10~19, 20~29, 30~39, 40~45
        const defaultParam = { mode: this.mode }
        const { count } = this.returnParams(defaultParam, params);

        const pos = [0.19928152769899793, 0.1651189800934554, 0.1651189800934554, 0.1651189800934554, 0.40056463672459136];
        return pos.map(value => value * count);
    }

    expectedCarryCount(params: Params = {}): number[] {
        const defaultParam = { from: 0, to: 6, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = posCarryCount;
        return pos.slice(from, to + 1).map(value => value * count);
    }
    
    expectedLowCount(params: Params = { mode: this.mode }): number[] {
        const defaultParam = { from: 0, to: 6, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = posLowCount;
        return pos.slice(from, to + 1).map(value => value * count);
    }

    expectedSum(params: Params = {}): number[] { // 21~255
        const defaultParam = { from: 21, to: 255, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = posSum;
        return pos.slice(from - 21, to - 21 + 1).map(value => value * count);
    }
    private expectedSumVersion(version:55|77, params: Params = {}){
        let pack:number;
        if(version === 55) pack = 20;
        else if(version === 77) pack = 10;

        const defaultParam = { from: 21, to: 255, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        let pos: number[] = posSum;
        const result = new Array<number>(Math.floor((to - from) / pack) + 1).fill(0);
        pos.forEach((value, index) => {
            if (from <= index + 21 && index + 21 <= to) {
                result[Math.floor((index + 21 - from) / pack)] += value;
            }
        });

        return result.map(value => value * count);
    }
    expectedSum55(params: Params = {}): number[] {
        return this.expectedSumVersion(55, params);
    }
    expectedSum77(params: Params = {}): number[] {
        return this.expectedSumVersion(77, params);
    }
    
    expectedOddCount(params: Params = {}): number[] {
        const defaultParam = { from: 0, to: 6, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = posOddCount;
        return pos.slice(from, to + 1).map(value => value * count);
    }
    expectedPrimeCount(params: Params = {}): number[] {
        const defaultParam = { from: 0, to: 6, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = posPrimeCount;
        return pos.slice(from, to + 1).map(value => value * count);
    }
    expected$3Count(params: Params = {}): number[] {
        const defaultParam = { from: 0, to: 6, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = pos$3Count;
        return pos.slice(from, to + 1).map(value => value * count);
    }

    expectedSum$10(params: Params = {}): number[] { // 0~24
        const defaultParam = { from: 0, to: 24, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = posSum$10;
        return pos.slice(from, to + 1).map(value => value * count);
    }

    expectedDiffMaxMinData(params: Params = {}): number[] { //5~44
        const defaultParam = { from: 5, to: 44, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = posDiffMaxMin;
        return pos.slice(from - 5, to - 5 + 1).map(value => value * count);
    }

    expectedAC(params: Params = {}): number[] {
        const defaultParam = { from: 0, to: 10, mode: this.mode }
        const { from, to, count } = this.returnParams(defaultParam, params)

        const pos: number[] = posAC;
        return pos.slice(from, to + 1).map(value => value * count);
    }

    expectedConsecutiveExist(params: Params = {}): number[] {
        const { count } = this.returnParams({ mode: this.mode }, params);

        const pos: number[] = posConsecutiveExist;
        return pos.map(value => value * count);
    }
}