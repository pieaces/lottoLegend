import configure from './amplify/configure'
import DataAPI from "./functional/DataAPI";
import Layout from './functional/Layout'

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