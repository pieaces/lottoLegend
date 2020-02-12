import ChartBase from "../Chart/Charts";
import LineSlide from "../Slide/LineSlide";
import makeClickable from "../Slide/makeClickable";

const leftLineBtn: HTMLElement = document.querySelector('#func1-left-line-chart-btn');
const rightLineBtn: HTMLElement = document.querySelector('#func1-right-line-chart-btn');
const lineNum = document.querySelectorAll<HTMLElement>('.func1-chart-line-num > div');
const lineCanvas: HTMLCanvasElement = document.querySelector('#func1-chart-line');
const main21: HTMLElement = document.querySelector('.func1-main-2-1');


const option = {
    responsive: true,
    tooltips: {
        // mode:'index', typescript 오류 발생 
        intersect: false,
    },

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



}
/*
options: {
    responsive: true,
    title: {
        display: true,
        text: 'Chart.js Line Chart'
    },
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    hover: {
        mode: 'nearest',
        intersect: true
    }
}
};
*/
const dataBox = {
    labels: null,
    datasets: [
        {
            label: '실제값', // 추가
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(199, 54, 44)',
            data: null,
            fill: false
        },
        {
            label: '예측값', // 추가
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