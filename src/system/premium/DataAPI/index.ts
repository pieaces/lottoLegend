import Stats, { Params } from "./Stats";
import Generator from "./Generator";
import Swal from "sweetalert2";
const constraintLowCount = require('./json/lowCount_compressed.json');
const constraintSum = require('./json/sum_compressed.json');
const constraintSumNotExcluded = require('./json/sum_notExcluded.json');

function numbersToParams(numbers: number[] = []): Params {
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
    if (param.to - param.from >= PACK) {
        const result: string[] = [];
        let temp: number;
        for (let i = param.from; i <= param.to - PACK; i += PACK) {
            result.push(i + '~' + (i + PACK - 1));
            temp = i + PACK;
        }
        if (temp === param.to) result.push(temp.toString());
        else result.push(temp + '~' + param.to);
        return result;
    } else return [`${param.from}~${param.to}`];
}
function paramToNumbers(params: Params): number[] {
    if (typeof params.from === 'number' && typeof params.to === 'number') {
        const temp = [];
        for (let i = params.from; i <= params.to; i++) temp.push(i);
        return temp;
    } else if (params.list) {
        return params.list;
    }
}
const infoFront = '현재 필터에서 가능한 모든 ';
const infoBack = '하나 또는 범위를 선택해주세요.';
export default class DataAPI {
    static instance: DataAPI = null;
    public numbersData: any[];
    public filteredCount: number;
    readonly filterList = ["전멸구간 개수", "전멸구간 선택", "이월수 개수", "이월수 선택", "고정수", "제외수", "저값 개수", "번호 합계", "홀수 개수", "소수 개수", "3배수 개수", "첫수 합", "고저 차", "AC", "연속수 포함여부"]
    private static readonly dataList = ['excludedLineCount', 'excludedLine', 'carryCount', 'excludeInclude', 'excludeInclude', 'excludeInclude', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
    private static readonly optionList = [null, 'excludedLines', null, null, 'includedNumbers', 'excludedNumbers', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
    private rangeList: Array<string[] | number[]> = [[0, 1, 2, 3], ['1~', '10~', '20~', '30~', '40~'], null, null, null, null];
    readonly infoList = ['전멸구간 개수를 선택해주세요.', '', '전회차에서 이월될 개수를 선택해주세요.', '',
        '고정시킬 수를 선택해주세요.(생략가능)', '제외될 수를 선택해주세요.(생략가능)', '저값 개수를 선택해주세요.',
        infoFront + '번호합계입니다. ' + infoBack,
        infoFront + '홀수개수입니다. ' + infoBack,
        infoFront + '소수개수입니다. ' + infoBack,
        infoFront + '3배수개수입니다. ' + infoBack,
        infoFront + '첫수합(십의자리 합)입니다. ' + infoBack,
        infoFront + '고저차(가장 큰값 - 작은값)입니다. ' + infoBack,
        infoFront + 'AC(Arithmetic Complexity' + infoBack,
        '연속번호 포함여부를 선택해주세요.',
    ];
    private current: number = 0;
    private stats = new Stats();
    private generator = new Generator();
    public readonly SIZE: number = this.filterList.length;

    static getInstance() {
        if (DataAPI.instance == null) {
            DataAPI.instance = new DataAPI();
        }
        return DataAPI.instance;
    }
    public getTOTAL(): number { return this.stats.total; }
    public getWinNums(): number[][] { return this.stats.winNums; }
    public getLabels(num = this.current): Array<string | number> {
        return this.rangeList[num];
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

    private async setStats(): Promise<void> {
        let params: Params;
        if (this.current === 2) {
            let count = 0;
            this.getWinNums()[0].forEach(num => {
                if (this.generator.option.excludedLines.some(item => item === Math.floor((num - 1) / 10))) {
                    count++;
                }
            })
            const temp: number[] = [];
            let to = 6 - count > 3 ? 3 : 6 - count;
            for (let i = 0; i <= to; i++) {
                temp.push(i);
            }
            this.rangeList[this.current] = temp;
        } else if (this.current <= 5) params = {};
        else if (this.current === 6) {
            let range: number[];
            if (this.generator.option.excludedLines) {
                range = constraintLowCount[this.generator.option.excludedLines.join('')];
            } else {
                range = [0, 6];
            }
            const lowCount = [getLowCount(this.generator.option.includedNumbers), 6 - this.generator.option.includedNumbers.length];//포함수의, 나머지
            const choices = makeChoice({include:this.generator.option.includedNumbers, exclude:this.generator.option.excludedNumbers, excludedLines:this.generator.option.excludedLines})
            const _min = getHighCount(choices);
            const _max = getLowCount(choices);

            const max = lowCount[0] + (_max < lowCount[1] ? _max : lowCount[1]);
            const min = (max - _min) > lowCount[0] ? max - _min : lowCount[0];
            console.log(_min, lowCount[0]);
            console.log(min, max);
            this.rangeList[this.current] = paramToNumbers({ from: range[0], to: range[1] }).filter(one => min <= one && one <= max);
            if(this.rangeList[this.current].length === 0){
                Swal.fire({
                    title:'현재까지의 조건을 만족하는 경우가 없습니다',
                    text:'되돌아가서 재설정해주시기 바랍니다',
                    icon:'warning'
                });
                document.getElementById('func1-chart-bubble').style.visibility= 'hidden';
            }
        } else if (this.current === 7) {
            if (this.generator.option.includedNumbers.length === 0) {
                let range: any;
                if (this.generator.option.excludedLines) range = constraintSum[this.generator.option.lowCount.toString() + this.generator.option.excludedLines.join('')];
                else range = constraintSumNotExcluded[this.generator.option.lowCount.toString()];
                params = { from: range[0], to: range[1] };
                this.rangeList[this.current] = compartNumbers(params, 10);
            } else {
                params = { from: <number>this.rangeList[this.current][0], to: <number>this.rangeList[this.current][1] };
                this.rangeList[this.current] = compartNumbers(params, 10);
            }
        } else {
            params = numbersToParams(this.rangeList[this.current] as number[]);
            if (this.current === 12) {
                const range = this.rangeList[this.current];
                if (range.length > 7) {
                    params = { from: range[0] as number, to: range[range.length - 1] as number };
                    this.rangeList[this.current] = compartNumbers(params, 2);
                }
            }
            else if (this.current === this.SIZE - 1) {
                if (this.rangeList[this.current] && this.rangeList[this.current].length === 2) {
                    this.rangeList[this.current] = ['제외', '포함'];
                } else if (this.rangeList[this.current] && this.rangeList[this.current].length === 1) {
                    if (this.rangeList[this.current][1]) {
                        this.rangeList[this.current] = ['포함'];
                    } else {
                        this.rangeList[this.current] = ['제외'];
                    }
                } else {
                    this.rangeList[this.current] = [];
                }
            }
        }
        await this.stats.getData(DataAPI.dataList[this.current], params);
        if(this.current === 6) {
            const list = ['$12', '$24', '$48', '$192', 'all', 'latest'];
            for(const one of list){
                this.stats[DataAPI.dataList[6]].ideal[one] = this.stats[DataAPI.dataList[6]].ideal[one].filter((one, index) => this.rangeList[this.current].some(num => num === index));
                this.stats[DataAPI.dataList[6]].actual[one] = this.stats[DataAPI.dataList[6]].actual[one].filter((one, index) => this.rangeList[this.current].some(num => num === index));                
            }
        }
    }

    private async getGen(): Promise<void> {
        const { count, range, numbers } = await this.generator.generate();
        if (count){
            this.filteredCount = count;
            this.rangeList[this.current + 1] = range;
        }
        if (numbers) this.numbersData = numbers;
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
            delete this.generator.option[DataAPI.optionList[this.current--]];
        }
    }
    async forward(optionData: any = undefined): Promise<void> {
        if (0 <= this.current && this.current < DataAPI.dataList.length) {
            const option = DataAPI.optionList[this.current];
            if (option) {
                this.generator.option[option] = optionData;
            }
            if (this.current >= 7 || this.current === 6 && (this.generator.option.includedNumbers.length !== 0)) {
                await this.getGen();
            }
            this.current++;
            if (this.current <= DataAPI.dataList.length - 1) {
                    await this.setStats();
            }
        }
    }

    async init() {
        this.current = 0;
        await this.setStats();
        await this.stats.getData(DataAPI.dataList[3], {});
    }

    public getStats() {
        return this.stats[DataAPI.dataList[this.current]];
    }
    public getStats2() {
        return this.stats['excludeInclude'];
    }
}

function makeChoice(param:{include:number[], exclude:number[], excludedLines:number[]}){
    const numbers = [];
    for(let i = 1; i <= 45; i++){
        if(!param.excludedLines.some(item => item === Math.floor((i-1)/10))) numbers.push(i);
    }
    return numbers.filter(num => !param.include.some(item => item === num) && ! param.exclude.some(item => item === num));
}

function getLowCount(numbers:number[]){
    return numbers.filter(num => num < 23).length;
}
function getHighCount(numbers:number[]){
    return numbers.filter(num => num >= 23).length;
}