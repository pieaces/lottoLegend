const getLotto = async () => {
    const headers: any = {
        'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k'
    };
    const fetchResult = await fetch(
        'https://9vs7kal0g8.execute-api.ap-northeast-2.amazonaws.com/dev/items',
        { method: 'GET', headers }
    );
    // Here fetch return the promise, so we need to await it again and parse according to our needs. So, the result code would be this
    const { data } = JSON.parse(await fetchResult.text());

    return data.Items.map((item: { no: { N: any; }; date: { S: any; }; bonusNum: any; numbers: { NS: any; }; }) => {
        return {
            round: Number(item.no.N),
            date: item.date.S,
            bonusNum: Number(item.bonusNum.N),
            numbers: item.numbers.NS.map((item: any) => Number(item)).sort((a: number, b: number) => a - b)
        };
    }).sort((a: { round: number; }, b: { round: number; }) => b.round - a.round);
};
export default getLotto;