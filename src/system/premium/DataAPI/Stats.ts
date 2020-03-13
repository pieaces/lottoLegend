import  {getUnAuthAPI} from '../../../amplify/api'
export interface Params {
    from?: number;
    to?: number;
    list?: number[];
}
export default class Data {
    [x: string]: any;

    async getData(method: string, params: Params) {
        let queryParams:any = {};
        if (params) {
            if (typeof params.from === 'number' && typeof params.to === 'number') {
                queryParams = {
                    from:params.from, to:params.to
                };
            }
            else if (params.list) {
                queryParams = {
                    list:JSON.stringify(params.list)
                }
            }
        }
        queryParams.method = method;
        const url = `/stats/mass`;
        const result = await getUnAuthAPI(url, queryParams);
        this[method] = result.data;
        if (result.total) this.total = result.total;
        if (result.winNums) this.winNums = result.winNums
    }
}