import DataAPI from "../DataAPI";
import barInstance from "./chartInstance/barInstance"
import lineSlide from "./chartInstance/lineInstance"
const loading = document.querySelector('.loading');

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

