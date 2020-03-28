import configure from '../amplify/configure'
import ChartBase from '../system/premium/Chart/Charts';
import LineSlide from '../system/premium/Slide/LineSlide'
import { getUnAuthAPI } from '../amplify/api';
import { getQueryStringObject, rangeMake } from '../functions';
import makeClickable from '../system/premium/Slide/makeClickable';
import { getStaticsName,mqInit } from './functions';
import { headerSign } from '../amplify/auth';


configure();
headerSign();

const labels = require('../system/premium/DataAPI/json/labels.json');
const lineNum = document.querySelectorAll<HTMLElement>('.chart-line-num > div');
const leftBtn = document.getElementById('left-line-chart-btn');
const rightBtn = document.getElementById('right-line-chart-btn');
const lineTitle = document.querySelector<HTMLElement>('.chart-title');

const method = getQueryStringObject().method;
const lineCanvas: HTMLCanvasElement = document.querySelector('#chart-line');
const mean = document.querySelector<HTMLElement>('.stats-mean-value');
const $68 = document.querySelector<HTMLElement>('.stats-68-value');
const $95 = document.querySelector<HTMLElement>('.stats-95-value');

document.querySelector<HTMLElement>('.main-title').textContent = getStaticsName(method);
const lineOption: Chart.ChartOptions = {
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    maintainAspectRatio: false,
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
const lineDataBox = {

    labels: labels[method],
    datasets: [
        {
            label: '수학적 예측값',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(14,99,132)',
            data: null,
            fill: false
        },
        {
            label: '실제 당첨값',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(199, 54, 44)',
            data: null,
            fill: false
        }
    ]
};

const barCanvas: HTMLCanvasElement = document.querySelector('#chart-bar');
const barDataBox = {

    labels: null,
    datasets: [
        {
            backgroundColor: 'rgb(14,99,132)',
            data: null
        }
    ]
};
const barOption: Chart.ChartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                min: 0
            }
        }]
    },
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    maintainAspectRatio: false,
    legend: { display: false },
};


mqInit();
getUnAuthAPI('/stats/piece', { method })
    .then(data => {
        console.log(data);
        mean.textContent = Number(data.stats.mean).toFixed(2);
        $68.textContent = rangeMake(data.stats);
        $95.textContent = rangeMake(data.stats, 2);
        const lineInstance = new ChartBase('line', lineCanvas, lineDataBox, lineOption);
        lineInstance.create();
        const lineSlide = new LineSlide(lineInstance, lineNum, leftBtn, rightBtn);
        lineSlide.init(data);
        const setText: () => void = function (this: any) {
            switch (this.current) {
                case 0: lineTitle.textContent = '1~12회차 종합';
                    break;
                case 1: lineTitle.textContent = '1~24회차 종합';
                    break;
                case 2: lineTitle.textContent = '1~48회차 종합';
                    break;
                case 3: lineTitle.textContent = '1~192회차 종합';
                    break;
                case 4: lineTitle.textContent = '전회차 종합';
                    break;
            }
        }
        makeClickable(lineSlide, setText.bind(lineSlide));

        const barLabels = [];
        for (let i = data.total - 49; i <= data.total; i++) barLabels.push(i);
        barDataBox.labels = barLabels;
        barDataBox.datasets[0].data = data.piece
        const barInstance = new ChartBase('bar', barCanvas, barDataBox, barOption);
        barInstance.create();
    });

const filterBox = document.querySelector('.filter-box');
const filterArrow = document.querySelector('.filter-arrow');
const filterListBox = document.querySelector<HTMLElement>(".filter-list");

let flag = false;

filterBox.addEventListener("click", e => {
    if (!flag) {
        filterArrow.classList.remove("fa-sort-down");
        filterArrow.classList.add("fa-sort-up");
        filterListBox.classList.remove("none");
    } else {
        filterArrow.classList.add("fa-sort-down");
        filterArrow.classList.remove("fa-sort-up");
        filterListBox.classList.add("none");
    }
    flag = !flag;

    e.stopPropagation();
});

document.addEventListener('click', () => {
    if (flag) {
        //target 다른 곳
        filterListBox.classList.add("none");
        filterArrow.classList.add("fa-sort-down");
        filterArrow.classList.remove("fa-sort-up");
        flag = false;
    }
})