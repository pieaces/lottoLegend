interface Params {
  from?: number;
  to?: number;
  list?: number[];
}
interface Range {
  from: number;
  to: number;
}
enum Method {
  excludedLineCount = 'excludedLineCount',
  lineCount = 'lineCount',
  carryCount = 'carryCount',
  excludeInclude = 'excludeInclude',
  lowCount = 'lowCount',
  sum = 'sum',
  oddCount = 'oddCount',
  primeCount = 'primeCount',
  $3Count = '$3Count',
  sum$10 = 'sum$10',
  diffMaxMin = 'diffMaxMin',
  AC = 'AC',
  consecutiveExist = 'consecutiveExist'
}

class Stats {
  [x: string]: any;

  async getData(method: Method, params: Params) {
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
  excludedLineCount?: number;
  excludedLines?: number[];
  carryCount?: number;
  includedNumbers?: number[];
  excludedNumbers?: number[];
  lowCount?: number;
  sum?: Range;
  oddCount?: Range;
  primeCount?: Range;
  $3Count?: Range;
  sum$10?: Range;
  diffMaxMin?: Range;
  AC?: Range;
  consecutiveExist?: boolean;
  current: string;
}

class Generator {
  option: GeneratorOption;

  constructor(){
    this.option = {
      current: "excludedLineCount"
    };
  }
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

const stats = new Stats();
const generator = new Generator();
