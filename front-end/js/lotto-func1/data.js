const lottofunc1 = {
  lottoData: {
    oddCount: null
  }
};

async function setLottoOddCount() {
  let response = await getLottoOddCount();
  lottofunc1.lottoData.oddCount = response;
}

async function getLottoOddCount() {
  const headers = {
    'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k' //API KEY
  };
  const fetchResult = await fetch(
    'https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/stats/oddCount?from=0&to=6', //API 주소, querystring = name
    { method: 'GET', headers }
  );
  const data = JSON.parse(await fetchResult.text());
  return data;
}

async function init() {
  filterBoxCheck();
  await setLottoOddCount();
  chartInit();
}

init();
