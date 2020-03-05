import configure from './amplify/configure'
import Layout3 from './functional/Layout/Layout3'
import { postAuthAPI } from './amplify/api';

configure();
const loading = document.querySelector<HTMLElement>('.loading-box');

async function execute() {
    loading.classList.remove('none');
    const dataSet = await postAuthAPI('/numbers/generator/free/a');
    console.log(dataSet);
    Layout3.makeNumBoard(dataSet);
    loading.classList.add('none');
    loading.classList.add('filter-loading');
}
execute();