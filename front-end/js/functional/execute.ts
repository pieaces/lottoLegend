import DataAPI from "./DataAPI";
import Layout from './Layout'

const loading = document.querySelector<HTMLElement>('.loading');
const layout = new Layout();
async function execute() {
    loading.classList.remove('none');
    await DataAPI.getInstance().init();
    layout.init();
    loading.classList.add('none');
}
execute();