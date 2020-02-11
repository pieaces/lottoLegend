import Data, { Params } from "./Stats";
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
    public numbers: number[];
    private TOTAL:number;
    public filteredCount: number;
    private filterList = ["1-1: 전멸구간개수", "1-2: 전멸라인", "2: 이월수 개수", "3-1: 포함", "3-2: 제외", "4: 저값 개수", "5: 합계", "6: 홀수 개수", "7: 소수 개수", "8: 3배수 개수", "9: 첫수합", "10: 고저차", "11: AC", "12: 연속수 포함여부"]
    private dataList = ['excludedLineCount', 'lineCount', 'carryCount', 'excludeInclude', 'excludeInclude', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
    private optionList = [null, 'excludedLines', null, 'excludedNumbers', 'includedNumbers', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
    private rangeList: Array<string[] | number[]> = [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6], null, null];
    private current: number = 0;
    private data: Data = new Data();
    private generator: Generator = new Generator();
    public readonly SIZE:number = this.filterList.length;

    static getInstance() {
        if (DataAPI.instance == null) {
            DataAPI.instance = new DataAPI();
        }
        return DataAPI.instance;
    }
    public getTOTAL():number { return this.TOTAL;}
    public getLabels(): Array<string | number> {
        return this.rangeList[this.current];
    }
    public getFilterList(): string[] {
        return this.filterList;
    }
    public getPreviousName(): string {
        return this.filterList[this.current - 1];
    }
    public getCurrentName(): string {
        return this.filterList[this.current];
    }
    public getNextName(): string {
        return this.filterList[this.current + 1];
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
        await this.data.getData(this.dataList[this.current], params);
    }

    private async getGen(): Promise<void> {
        const { count, range, numbers } = await this.generator.generate();
        this.rangeList[this.current + 1] = range;
        if(count) this.filteredCount = count;
        if (numbers) this.numbers = numbers;
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
        if (0 <= this.current && this.current < this.dataList.length) {
            const option = this.optionList[this.current];
            if (option) {
                this.generator.option[option] = optionData;
            }
            if (this.current >= 6) {
                await this.getGen();
            }
            if (this.current < this.dataList.length - 1) {
                this.current++;
                if (!this.data[this.dataList[this.current]]) {
                    await this.setStats();
                }
            }
        }
    }

    async init() {
        this.current = 0;
        await this.setStats();
        await this.data.getData(this.dataList[3], {});
        this.TOTAL = this.data.total;
    }

    public getStats() {
        return this.data[this.dataList[this.current]];
    }
    public getStats2(){
        return this.data['excludeInclude'];
    }
}