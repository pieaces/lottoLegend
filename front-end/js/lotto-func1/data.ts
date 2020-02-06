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
  excludedLines: number[];
  excludedNumbers: number[];
  includedNumbers: number[];
  lowCount: number;
  sum: Range;
  oddCount: Range;
  primeCount: Range;
  $3Count: Range;
  sum$10: Range;
  diffMaxMin: Range;
  AC: Range;
  consecutiveExist: boolean;

  async getData(method: string, params: Params) {
    const headers = {
      'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k' //API KEY
    };
    let url = `https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/stats/${method}`;
    if (params) {
      if (params.from & params.to) url += `?from=${params.from}&to=${params.to}`;
      else if (params.list) url += `?list=${encodeURI(JSON.stringify(params.list))}`
    }
    const fetchResult = await fetch(url, { method: 'GET', headers });
    const data = JSON.parse(await fetchResult.text());
    return data;
  }
}