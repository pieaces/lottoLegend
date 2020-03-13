import configure from '../amplify/configure'
import DataAPI from "./premium/DataAPI";
import Layout from './premium/Layout'

configure();
const loading = document.querySelector<HTMLElement>('.loading-box');

async function execute() {
    loading.classList.remove('none');
    await DataAPI.getInstance().init();
    const layout = new Layout();
    layout.init();
    loading.classList.add('none');
    loading.classList.add('filter-loading');
}
execute();
