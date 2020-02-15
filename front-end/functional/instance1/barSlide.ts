import BarSlide from "../Slide/BarSlide";
import makeClickable from "../Slide/makeClickable";
import ChartBase from "../Chart/Charts";

const leftBarBtn: HTMLElement = document.querySelector('#func1-left-bar-chart-btn');
const rightBarBtn: HTMLElement = document.querySelector('#func1-right-bar-chart-btn');
const barNum = document.querySelectorAll('.func1-chart-bar-num > div');
const barCanvas: HTMLCanvasElement = document.querySelector('#func1-chart-bar');

const barValueBox1 = document.querySelector<HTMLElement>('#func1-bar-filter-name');
const barValueBox2 = document.querySelector<HTMLElement>('#func1-bar-value-name');
const barTable = document.querySelector<HTMLElement>('#func1-bar-table');

const dataBox = {
    labels: null,
    datasets: [
        {
            label: '예측값(개수)',
            backgroundColor: '#00B2EA',
            data: null
        }
    ]
};
const option = {
}
const barInstance = new ChartBase('bar', barCanvas, dataBox, option);
barInstance.create();
const barSlide = new BarSlide(barInstance, leftBarBtn, rightBarBtn, barNum, barTable, barValueBox1, barValueBox2);
makeClickable(barSlide);

export default barSlide;