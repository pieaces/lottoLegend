import configure from './amplify/configure'
import DataAPI from "./functional/DataAPI";
import lineSlide from "./functional/instance1/lineSlide"
import ChartBase from './functional/Chart/Charts';
const loading = document.querySelector('.loading');

configure();

const canvas: HTMLCanvasElement = document.querySelector('#func1-chart-bar');
const dataBox = {
    labels: null,
    datasets: [
        {
            backgroundColor: '#00B2EA',
            data: null
        }
    ]
};
const option = {
    legend: { display: false },
    title: {
        display: true,
        text: '번호별 출현횟수',
        fontSize: 12
    }
};

loading.classList.remove('none');
DataAPI.getInstance().init().then(() => {
    lineSlide.setData();
    lineSlide.setText();
    lineSlide.init();
    const barInstance = new ChartBase('bar', canvas, dataBox, option);
    barInstance.create();
    loading.classList.add('none');
});