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

    const url =
      'https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/numbers/generator';
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

const constraintLowCount = {
  "0": [1, 4],
  "1": [1, 4],
  "2": [2, 4],
  "3": [2, 5],
  "4": [2, 5],
  "12": [1, 4],
  "13": [1, 5],
  "14": [1, 5],
  "23": [2, 5],
  "24": [2, 5],
  "34": [2, 6],
  "123": [1, 5],
  "124": [1, 5],
  "134": [1, 6],
  "234": [6, 6],
  "1234": [6, 6],
  "": [2, 4],
  "0234": [6, 6],
  "034": [1, 6],
  "024": [1, 5],
  "023": [1, 5],
  "04": [1, 5],
  "03": [1, 5],
  "02": [1, 4],
  "0134": [0, 3],
  "014": [0, 3],
  "013": [0, 3],
  "01": [0, 3],
  "0124": [0, 0],
  "012": [0, 0],
  "0123": [0, 0]
};
const constraintSum = {
  "2": [128, 185],
  "3": [106, 178],
  "4": [103, 155],
  "10": [152, 219],
  "11": [143, 209],
  "20": [138, 212],
  "21": [120, 202],
  "22": [144, 199],
  "23": [123, 189],
  "24": [113, 171],
  "30": [126, 190],
  "31": [99, 180],
  "32": [114, 174],
  "33": [100, 182],
  "34": [90, 164],
  "40": [123, 166],
  "41": [96, 156],
  "42": [86, 147],
  "43": [79, 160],
  "44": [69, 148],
  "53": [76, 136],
  "54": [66, 130],
  "101": [162, 235],
  "102": [176, 232],
  "103": [148, 222],
  "104": [138, 198],
  "112": [167, 222],
  "113": [139, 212],
  "114": [129, 188],
  "201": [158, 214],
  "202": [154, 208],
  "203": [133, 215],
  "204": [123, 191],
  "212": [136, 188],
  "213": [115, 205],
  "214": [105, 181],
  "223": [177, 202],
  "224": [137, 178],
  "234": [109, 138],
  "301": [156, 191],
  "302": [134, 182],
  "303": [120, 194],
  "304": [110, 176],
  "312": [107, 152],
  "313": [93, 184],
  "314": [83, 166],
  "323": [136, 178],
  "324": [106, 160],
  "334": [85, 134],
  "402": [116, 154],
  "403": [109, 171],
  "404": [99, 159],
  "412": [80, 114],
  "413": [73, 161],
  "414": [63, 149],
  "423": [97, 152],
  "424": [77, 140],
  "434": [63, 128],
  "503": [106, 145],
  "504": [96, 139],
  "513": [70, 125],
  "514": [60, 119],
  "523": [60, 124],
  "524": [50, 118],
  "534": [43, 120],
  "634": [40, 109],
  "1013": [158, 237],
  "1014": [148, 207],
  "1023": [220, 234],
  "1024": [170, 204],
  "1034": [135, 154],
  "1123": [211, 224],
  "1124": [161, 194],
  "1134": [126, 144],
  "2013": [153, 217],
  "2014": [143, 193],
  "2023": [187, 211],
  "2024": [147, 187],
  "2034": [119, 151],
  "2123": [169, 191],
  "2124": [129, 167],
  "2134": [101, 141],
  "3013": [150, 195],
  "3014": [140, 177],
  "3023": [156, 186],
  "3024": [126, 168],
  "3034": [105, 146],
  "3123": [129, 156],
  "3124": [99, 138],
  "3134": [78, 136],
  "4023": [127, 159],
  "4024": [107, 147],
  "4034": [93, 139],
  "4123": [91, 119],
  "4124": [71, 107],
  "4134": [57, 129],
  "5023": [100, 130],
  "5024": [90, 124],
  "5034": [83, 129],
  "5123": [55, 80],
  "5124": [45, 74],
  "5134": [38, 109],
  "6034": [80, 117],
  "6134": [35, 87],
  "6234": [25, 94],
  "10134": [145, 157],
  "20134": [139, 153],
  "30134": [135, 147],
  "60234": [75, 99],
  "61234": [21, 39],
  "00134": [153, 159],
  "0014": [155, 214],
  "0013": [165, 244],
  "001": [168, 242],
  "00124": [195, 219],
  "0012": [200, 254],
  "00123": [255, 255]
};
const constraintSumNotExcluded = {
  "0": [153, 255],
  "1": [126, 237],
  "2": [101, 217],
  "3": [78, 195],
  "4": [57, 171],
  "5": [38, 145],
  "6": [21, 117]
};

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
class Filter {
  public count: number;
  public numbers: number[];
  private numberList = ["1-1", "1-2", "2", "3-1", "3-2", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  private statsList = ['excludedLineCount', 'lineCount', 'carryCount', 'excludeInclude', 'excludeInclude', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
  private optionList = [null, 'excludedLines', null, 'excludedNumbers', 'includedNumbers', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist']
  private rangeList: Array<string[] | number[]> = [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6], null, null];
  private current: number = 0;
  private stats: Stats = new Stats();
  private generator: Generator = new Generator();
  private nextBtn:HTMLElement;

  constructor(nextBtn:HTMLElement){
    this.nextBtn = nextBtn;
    this.nextBtn.addEventListener('click', () =>{
      
    })
  }

  public getLabel(): Array<string | number> {
    return this.rangeList[this.current];
  }
  public getFilterName(): string {
    return this.numberList[this.current];
  }

  private async setStats(): Promise<void> {
    console.log(this.current);
    let params: Params;
    if (this.current <= 4) params = {};
    else if (this.current === 5) {
      let range: number[];
      if (this.generator.option.excludedLines) {
        range =
          constraintLowCount[this.generator.option.excludedLines.join('')];
      } else {
        range = [0, 6];
      }
      params = { from: range[0], to: range[1] };
      this.rangeList[this.current] = paramToNumbers({
        from: range[0],
        to: range[1]
      });
    } else if (this.current === 6) {
      if (this.generator.option.excludedLines) {
        const range =
          constraintSum[
          this.generator.option.lowCount.toString() +
          this.generator.option.excludedLines.join('')
          ];
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

/*
async function initf() {
  const filter = new Filter();
  await filter.init();
  await filter.forward();
  await filter.forward([2]);
  await filter.forward();
  await filter.forward([2, 10, 42, 44, 45]);
  console.log(filter.getStats());
  // await filter.forward();
  // await filter.forward(2);
  // await filter.forward({ from: 150, to: 180 });
  // await filter.forward({ from: 2, to: 3 });
  // await filter.forward({ from: 2, to: 3 });
  // await filter.forward({ from: 1, to: 3 });
  // await filter.forward({ from: 10, to: 14 });
  // await filter.forward({ from: 30, to: 38 });
  // await filter.forward({ from: 6, to: 8 });
  // await filter.forward(true);
  // console.log(filter.numbers);
}

initf();
*/
