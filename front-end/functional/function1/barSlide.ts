import BarSlide from "../Slide/BarSlide";
import makeClickable from "../Slide/makeClickable";
import ChartBase from "../Chart/Charts";

const leftBarBtn: HTMLElement = document.querySelector('#func1-left-bar-chart-btn');
const rightBarBtn: HTMLElement = document.querySelector('#func1-right-bar-chart-btn');
const barNum = document.querySelectorAll('.func1-chart-bar-num > div');
const barCanvas: HTMLCanvasElement = document.querySelector('#func1-chart-bar');
const main22: HTMLElement = document.querySelector('.func1-main-2-2');

const dataBox = {
    labels: null,
    datasets: [
        {
            backgroundColor: 'rgba(91, 81,255, 0.2)',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(14,99,132)',
            data: null
        }
    ]
};
const option = {
    legend: { display: false }
}
const barInstance = new ChartBase('bar', barCanvas, dataBox, option);
const barSlide = new BarSlide(barInstance, leftBarBtn, rightBarBtn, barNum, main22);
makeClickable(barSlide);

export default barSlide;