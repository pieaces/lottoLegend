import configure from '../amplify/configure'
import DataAPI from "./experience/index";
import Layout, { IDataAPI } from './premium/Layout'
import Swal from 'sweetalert2';
import { removeLoading, makeLoading } from '../functions';

configure();

makeLoading();
Swal.fire({
    title:'체험하기 설명',
    text:'베르누이 분석툴의 기능을 체험할 수 있습니다.',
    icon:'info'
});
document.getElementById('swal2-content').innerHTML = '베르누이 분석툴의 기능을 체험할 수 있습니다.<br>단, 모든 데이터는 과거의 데이터입니다.<br><span style="font-weight:bold;">기능만 체험해주세요.</span>'
const layout = new Layout(DataAPI.getInstance() as IDataAPI);
layout.init();
removeLoading();