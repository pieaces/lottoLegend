import ChartBase from "../Chart/Charts";
import LineSlide from "../Slide/LineSlide";
import makeClickable from "../Slide/makeClickable";

const leftLineBtn: HTMLElement = document.querySelector('#func1-left-line-chart-btn');
const rightLineBtn: HTMLElement = document.querySelector('#func1-right-line-chart-btn');
const lineNum = document.querySelectorAll<HTMLElement>('.func1-chart-line-num > div');
const lineCanvas: HTMLCanvasElement = document.querySelector('#func1-chart-line');
const main21: HTMLElement = document.querySelector('.func1-main-2-1');


const option = {
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.5)',
                    lineWidth: 1
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.5)',
                    lineWidth: 1
                }
            }
        ]
    },
    legend: {
        display: false
    },


}
const dataBox = {
    labels: null,
    datasets: [
        {

            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(199, 54, 44)',
            data: null,
            fill: false
        },
        {

            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(14,99,132)',
            data: null,
            fill: false
        }
    ]
};
const lineInstance = new ChartBase('line', lineCanvas, dataBox, option);
const lineSlide = new LineSlide(lineInstance, leftLineBtn, rightLineBtn, lineNum, main21);
makeClickable(lineSlide);

export default lineSlide