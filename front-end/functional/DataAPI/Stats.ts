export interface Params {
    from?: number;
    to?: number;
    list?: number[];
}
export default class Data {
    [x: string]: any;

    async getData(method: string, params: Params) {
        const headers = {
            'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k' //API KEY
        };
        let url = `https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/stats/${method}`;
        if (params) {
            if (typeof params.from === 'number' && typeof params.to === 'number') {
                url += `?from=${params.from}&to=${params.to}`;
            }
            else if (params.list) {
                url += `?list=${encodeURI(JSON.stringify(params.list))}`;
            }
        }
        console.log(url);
        const fetchResult = await fetch(url, { method: 'GET', headers });
        const data = JSON.parse(await fetchResult.text());
        this[method] = data.data;
        console.log(data.data);
        if (!this.total) this.total = data.total;
    }
}