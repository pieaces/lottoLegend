import configure from './amplify/configure'
import DataAPI from "./functional/DataAPI";
import barInstance from "./functional/statistics/barInstance"
import lineSlide from "./functional/instance1/lineSlide"
const loading = document.querySelector('.loading');

configure();
async function execute() {
    loading.classList.remove('none');
    await DataAPI.getInstance().init();
    lineSlide.setData();
    lineSlide.setText();
    lineSlide.init();
    barInstance.update();
    loading.classList.add('none');
}

execute();