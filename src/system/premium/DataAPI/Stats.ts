import { getAuthAPI } from '../../../amplify/api'
import Swal from 'sweetalert2';
export interface Params {
    from?: number;
    to?: number;
    list?: number[];
}
export default class Data {
    [x: string]: any;

    async getData(method: string, params: Params) {
        let queryParams: any = {};
        if (params) {
            if (typeof params.from === 'number' && typeof params.to === 'number') {
                queryParams = {
                    from: params.from, to: params.to
                };
            }
            else if (params.list) {
                queryParams = {
                    list: JSON.stringify(params.list)
                }
            }
        }
        queryParams.method = method;
        const url = `/stats/mass`;
        const result = await getAuthAPI(url, queryParams);
        if (result.error) {
            Swal.fire({
                title: '제한',
                text: result.message,
                icon: 'error',
                timer: 3000,
                footer: '3초 뒤 결제페이지로 이동합니다.'
            }).then(() => {
                location.href = '/main.html';
            });
        } else {
            this[method] = result.data;
            if (result.total) this.total = result.total;
            if (result.winNums) this.winNums = result.winNums
        }
    }
}