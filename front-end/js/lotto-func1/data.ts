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
    if (params) {
      if (params.from & params.to)
        url += `?from=${params.from}&to=${params.to}`;
      else if (params.list)
        url += `?list=${encodeURI(JSON.stringify(params.list))}`;
    }
    console.log(url);

    const fetchResult = await fetch(url, { method: 'GET', headers });
    const data = JSON.parse(await fetchResult.text());

    this[method] = data.data;
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
  option: GeneratorOption;

  async generate() {
    const headers = {
      'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k',
      'Content-Type': 'application/json'
    };
    const clone = JSON.parse(JSON.stringify(this.option));
    delete clone.excludedLineCount;
    delete clone.carryCount;

    const fetchResult = await fetch(
      'https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/numbers/generator', //API 주소
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

function compressNumbers(numbers: number[]):Params {
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
class Filter {
  private numberList = ["1-1", "1-2", "2", "3-1", "3-2", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  private statsList = ['excludedLineCount', 'lineCount', 'carryCount', 'excludeInclude', 'excludeInclude', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
  private optionList = ['excludedLineCount', 'excludedLines', 'carryCount', 'excludedNumbers', 'includedNumbers', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
  private rangeList = [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6], null, null];
  private current: number = 0;
  private stats: Stats = new Stats();
  private generator: Generator = new Generator();

  private getStats() {
    let params: Params;
    if (this.current <= 4) params = {};
    if (this.current === 5) {
      const range = constraintLowCount[this.generator.option.excludedLines.join('')];
      this.rangeList[this.current] = [];
      for (let i = range[0]; i <= range[1]; i++) this.rangeList.push(i);
      params = compressNumbers
    }
    this.stats.getData(this.statsList[this.current], params);
  }
  private getGen() {

  }
  leap(page: number): void {
    if (0 <= page && page <= 13) {
      this.current = page;
    }
  }

  forward(): void {
    if (this.current < this.numberList.length - 1) {
      this.getGen();
      this.current++;
      this.getStats();
    }
  }
  backward(): void {
    if (this.current > 0) {
      this.current--;
    }
  }

}
const stats = new Stats();
const generator = new Generator();
