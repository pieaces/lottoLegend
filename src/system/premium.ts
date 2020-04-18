makeLoading();
import configure from '../amplify/configure'
import DataAPI from "./premium/DataAPI";
import Layout, { IDataAPI } from './premium/Layout'
import Swal from 'sweetalert2';
import { isLogedIn } from '../amplify/auth';
import { onlyUserAlert, makeLoading, removeLoading } from '../functions';
configure();

const COOKIE_NAME = 'instruction';
const COOKIE_VALUE = 'false';
isLogedIn().then(value => {
    if (value) {
        DataAPI.getInstance().init().then(() => {
            const layout = new Layout(DataAPI.getInstance() as IDataAPI);
            layout.init();
            if (getCookie(COOKIE_NAME) === COOKIE_VALUE) {
                setCookie(COOKIE_NAME, COOKIE_VALUE, 7);
            } else {
                Swal.fire({
                    title: '환영합니다',
                    text: "시스템에 대해 알고 싶으시면, 하단링크를 클릭하세요",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '확인',
                    cancelButtonText: '그만보기',
                    footer: '<a href="/introduce/system.html">베르누이 분석 시스템</a>'
                }).then(result => {
                    if (!result.value) setCookie(COOKIE_NAME, COOKIE_VALUE, 14);
                });
            }
        });
        removeLoading();
    }else onlyUserAlert();
})


function getCookie(name:string) {
    const _value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    if(_value){
        setCookie(name, _value[2], 14);
        return _value[2];
    }
    return null;
};
function setCookie(name:string, value:any, date:number) {
    const _date = new Date();
    _date.setTime(_date.getTime() + date * 60 * 60 * 24 * 1000);
    document.cookie = `${name}=${value};expires=${_date.toUTCString()};path=/system/premium.html`;
};