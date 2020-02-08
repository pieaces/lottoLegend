import Stats, { Params } from "./Stats";
import Generator from "./Generator";
const constraintLowCount = require('./json/lowCount_compressed.json');
const constraintSum = require('./json/sum_compressed.json');
const constraintSumNotExcluded = require('./json/sum_notExcluded.json');

function numbersToParams(numbers: number[]): Params {
    let flag = true;
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] - 1 !== numbers[i - 1]) {
            flag = false;
            break;
        }
    }
    if (flag) {
        return { from: numbers[0], to: numbers[numbers.length - 1] };
    } else {
        return { list: numbers };
    }
}
function compartNumbers(param: Params, PACK: number): string[] {
    const result: string[] = [];
    let temp: number;
    for (let i = param.from; i < param.to; i += PACK) {
        result.push(i + '~' + (i + 9));
        temp = i;
    }
    if (temp === param.to) result.push(temp.toString());
    else result.push(temp + '~' + param.to);
    return result;
}
function paramToNumbers(params: Params): number[] {
    if (params.from && params.to) {
        const temp = [];
        for (let i = params.from; i <= params.to; i++) temp.push(i);
        return temp;
    } else if (params.list) {
        return params.list;
    }
}
export default class DataAPI {
    static instance:DataAPI = null;
    public count: number;
    public numbers: number[];
    private numberList = ["1-1", "1-2", "2", "3-1", "3-2", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    private statsList = ['excludedLineCount', 'lineCount', 'carryCount', 'excludeInclude', 'excludeInclude', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
    private optionList = [null, 'excludedLines', null, 'excludedNumbers', 'includedNumbers', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
    private rangeList: Array<string[] | number[]> = [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6], null, null];
    private current: number = 0;
    private stats: Stats = new Stats();
    private generator: Generator = new Generator();

    private constructor() { }
    static getInstance() {
        if (DataAPI.instance == null) DataAPI.instance = new DataAPI();
        return DataAPI.instance;
    }
    public getLabels(): Array<string | number> {
        return this.rangeList[this.current];
    }
    public getFilterName(): string {
        return this.numberList[this.current];
    }
    public getCurrent() { return this.current }
    public getRange() {
        return this.rangeList[this.current];
    }

    private async setStats(): Promise<void> {
        let params: Params;
        if (this.current <= 4) params = {};
        else if (this.current === 5) {
            let range: number[];
            if (this.generator.option.excludedLines) {
                range = constraintLowCount[this.generator.option.excludedLines.join('')];
            } else {
                range = [0, 6];
            }
            params = { from: range[0], to: range[1] };
            this.rangeList[this.current] = paramToNumbers({ from: range[0], to: range[1] });
        } else if (this.current === 6) {
            if (this.generator.option.excludedLines) {
                const range = constraintSum[this.generator.option.lowCount.toString() + this.generator.option.excludedLines.join('')];
                params = { from: range[0], to: range[1] };
                this.rangeList[this.current] = compartNumbers(params, 10);
            }
            else {
                const range = constraintSumNotExcluded[this.generator.option.lowCount.toString()];
                params = { from: range[0], to: range[1] };
            }
        }
        else {
            params = numbersToParams(this.rangeList[this.current] as number[]);
        }
        await this.stats.getData(this.statsList[this.current], params);
    }

    private async getGen(): Promise<void> {
        const { count, range, numbers } = await this.generator.generate();
        this.rangeList[this.current + 1] = range;
        this.count = count;

        if (numbers) console.log(numbers);
    }

    leap(page: number): void {
        const count = this.current - page;
        if (count > 0 && page >= 0) {
            for (let i = 0; i < count; i++) {
                this.backward();
            }
        }
    }
    backward(): void {
        if (this.current > 0) {
            console.log(this.optionList[this.current]);
            delete this.generator.option[this.optionList[this.current--]];
        }
    }
    async forward(optionData: any = undefined): Promise<void> {
        if (0 <= this.current && this.current < this.statsList.length) {
            const option = this.optionList[this.current];
            if (option) {
                this.generator.option[option] = optionData;
            }
            if (this.current >= 6) {
                await this.getGen();
            }
            if (this.current < this.statsList.length - 1) {
                this.current++;
                if (!this.stats[this.statsList[this.current]]) {
                    await this.setStats();
                }
            }
        }
    }

    async init() {
        this.current = 0;
        await this.setStats();
    }

    public getStats() {
        return this.stats[this.statsList[this.current]];
    }
}