interface Params {
  from?: number;
  to?: number;
  list?: number[];
}
interface Range {
  from: number;
  to: number;
}

class Stats {
  [x: string]: any;

  async getData(method: string, params: Params) {
    const headers = {
      'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k' //API KEY
    };
    let url = `https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/stats/${method}`;
    console.log(url);
    if (params) {
      if (params.from & params.to)
        url += `?from=${params.from}&to=${params.to}`;
      else if (params.list)
        url += `?list=${encodeURI(JSON.stringify(params.list))}`;
    }
    const fetchResult = await fetch(url, { method: 'GET', headers });
    const data = JSON.parse(await fetchResult.text());
    this[method] = data.data;
    if (!this.total) this.total = data.total;
  }
}

interface GeneratorOption {
  excludedLines?: number[];
  excludedNumbers?: number[];
  includedNumbers?: number[];
  lowCount?: number;
  sum?: Range;
  oddCount?: Range;
  primeCount?: Range;
  $3Count?: Range;
  sum$10?: Range;
  diffMaxMin?: Range;
  AC?: Range;
  consecutiveExist?: boolean;

  excludedLineCount?: number;
  carryCount?: number;
}

class Generator {
  option: GeneratorOption = {};

  async generate() {
    const headers = {
      'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k',
      'Content-Type': 'application/json'
    };
    const clone = JSON.parse(JSON.stringify(this.option));
    delete clone.excludedLineCount;
    delete clone.carryCount;

    const url = 'https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/numbers/generator';
    console.log(url);
    const fetchResult = await fetch(
      url, //API 주소
      {
        headers,
        method: 'POST',
        body: JSON.stringify(clone)
      }
    );

    const data = JSON.parse(await fetchResult.text());
    return data;
  }
}

const constraintLowCount = require('../../json/lowCount_compressed.json');
const constraintSum = require('../../json/sum_compressed.json');
const constraintSumNotExcluded = require('../../json/sum_notExcluded.json');

function numbersToParams(numbers: number[]): Params {
  let flag = true;
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] - 1 !== numbers[i - 1]) {
      flag = false; break;
    }
  }
  if (flag) {
    return { from: numbers[0], to: numbers[numbers.length - 1] };
  } else {
    return { list: numbers };
  }
}

function numbersToPack(numbers: number[], PACK: number): number[] {
  return numbers.reduce((acc, cur, index) => {
    if (index % PACK === 0) {
      acc.push(cur);
    } else {
      acc[acc.length - 1] += cur;
    }
    return acc;
  }, []);
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
class Filter {
  public count: number;
  public numbers: number[];
  private numberList = ["1-1", "1-2", "2", "3-1", "3-2", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  private statsList = ['excludedLineCount', 'lineCount', 'carryCount', 'excludeInclude', 'excludeInclude', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
  private optionList = [null, 'excludedLines', null, 'excludedNumbers', 'includedNumbers', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
  private rangeList = [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6], null, null];
  private current: number = 0;
  private stats: Stats = new Stats();
  private generator: Generator = new Generator();

  public getLabel():number[]{
    return this.rangeList[this.current];
  }
  public getFilterName():string{
    return this.numberList[this.current];
  }

  private async setStats(): Promise<void> {
    console.log(this.current);
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
    }
    else if (this.current === 6) {
      if (this.generator.option.excludedLines) {
        const range = constraintSum[this.generator.option.lowCount.toString() + this.generator.option.excludedLines.join('')];
        params = { from: range[0], to: range[1] };
        this.rangeList[this.current] = numbersToPack(paramToNumbers(params), 10);
      }
      else {
        const range = constraintSumNotExcluded[this.generator.option.lowCount.toString()];
        params = { from: range[0], to: range[1] };
      }
    }
    else {
      params = numbersToParams(this.rangeList[this.current]);
    }
    await this.stats.getData(this.statsList[this.current], params);
    console.log(params);
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
        console.log('i', i);
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
    console.log('forward', this.current);
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
