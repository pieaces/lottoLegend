import configure from './amplify/configure'
import DataAPI from "./functional/DataAPI";
import Layout from './functional/Layout'

configure();
const loading = document.querySelector<HTMLElement>('.loading');
const layout = new Layout();
async function execute() {
    loading.classList.remove('none');
    await DataAPI.getInstance().init();
    layout.init();
    loading.classList.add('none');
}
execute();