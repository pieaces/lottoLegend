import stats, { Params } from "./stats";
import Generator from "./Generator";

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
const infoFront = '현재 필터에서 가능한 모든 ';
const infoBack = '하나 또는 범위를 선택해주세요.';
export default class DataAPI {
    static instance: DataAPI = null;
    private generator = new Generator();

    public numbersData: any[];
    public filteredCount: number;
    readonly filterList = ["전멸구간 개수", "전멸구간 선택", "이월수 개수", "이월수 선택", "고정수", "제외수", "저값 개수", "번호 합계", "홀수 개수", "소수 개수", "3배수 개수", "첫수 합", "고저 차", "AC", "연속수 포함여부"]
    private static readonly optionList = [null, 'excludedLines', null, null, 'includedNumbers', 'excludedNumbers', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
    private static readonly dataList = ['excludedLineCount', 'excludedLine', 'carryCount', 'excludeInclude', 'excludeInclude', 'excludeInclude', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
    private rangeList: Array<string[] | number[]> = [[0, 1, 2, 3, 4], ['1~', '10~', '20~', '30~', '40~'], [0,1,2,3], null, null, null,
    [2,3,4], compartNumbers({ from:101, to:177 }, 10),
    [0,1,2,3,4],[0,1,2,3],[0,1,2,3,4],
    [8,9,10,12,13,14,15], compartNumbers({from:20, to:41}, 2),
    [5,6,7,8,9,10], ['제외', '포함']
];
    readonly infoList = ['전멸구간 개수를 선택해주세요.', '전멸구간 번호대를 선택해주세요', '전회차에서 이월될 개수를 선택해주세요.', '전회차에서 이월될 수를 선택해주세요(나머지는 자동으로 제외됩니다.)',
        '고정시킬 수를 선택해주세요.(생략가능)', '제외될 수를 선택해주세요.(생략가능)', '저값 개수를 선택해주세요.',
        infoFront + '번호합계입니다. ' + infoBack,
        infoFront + '홀수개수입니다. ' + infoBack,
        infoFront + '소수개수입니다. ' + infoBack,
        infoFront + '3배수개수입니다. ' + infoBack,
        infoFront + '첫수합(십의자리 합)입니다. ' + infoBack,
        infoFront + '고저차(가장 큰값 - 작은값)입니다. ' + infoBack,
        infoFront + 'AC(Arithmetic Complexity' + infoBack,
        '연속번호 포함여부를 선택해주세요.',
    ]
    private current: number = 0;
    private stats = stats;
    public readonly SIZE: number = this.filterList.length;

    static getInstance() {
        if (DataAPI.instance == null) {
            DataAPI.instance = new DataAPI();
        }
        return DataAPI.instance;
    }
    public getTOTAL(): number { return 903; }
    public getWinNums(): number[][] { return [[2,15,16,21,22,28],[7,19,23,24,36,39],[5,18,20,23,30,34]] }
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
        }
    }

    private async getGen(): Promise<void> {
        const { count, numbers } = await this.generator.generate();
        if (count){
            this.filteredCount = count;
        }
        if (numbers) this.numbersData = numbers;
    }

    async forward(optionData: any = undefined): Promise<void> {
        if (0 <= this.current && this.current < DataAPI.dataList.length) {
            if(optionData){
                const option = DataAPI.optionList[this.current];
                this.generator.option[option] = optionData;
            }
            if (this.current >= 6) {
                await this.getGen();
            }
            this.current++;
        }
    }

    public getStats() {
        return this.stats[DataAPI.dataList[this.current]];
    }
    public getStats2() {
        return this.stats['excludeInclude'];
    }
}