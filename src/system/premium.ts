import configure from '../amplify/configure'
import DataAPI from "./premium/DataAPI";
import Layout, { IDataAPI } from './premium/Layout'

configure();

const loading = document.querySelector<HTMLElement>('.loading-box');
loading.classList.remove('none');
DataAPI.getInstance().init().then(() => {
    const layout = new Layout(DataAPI.getInstance() as IDataAPI);
    layout.init();
    loading.classList.add('none');
});