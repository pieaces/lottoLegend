import configure from '../amplify/configure'
import ChartBase from '../system/premium/Chart/Charts';
import LineSlide from '../system/premium/Slide/LineSlide'
import BarSlide from '../system/premium/Slide/BarSlide'
import { getUnAuthAPI } from '../amplify/api';
import { rangeMake, networkAlert, makeLoading, removeLoading, onlyUserAlert } from '../functions';
import makeClickable from '../system/premium/Slide/makeClickable';
import { getStaticsName, mqMobileInit } from './functions';
import Slide from '../system/premium/Slide';
import 'core-js/stable/array/fill'
import { insertexcludedLinesTable } from './tables';
import { isLogedIn } from '../amplify/auth';
configure();

const labels = require('../system/premium/DataAPI/json/labels.json');
const method = 'excludedLineCount';
const mean = document.querySelector<HTMLElement>('.stats-mean-value');
const $68 = document.querySelector<HTMLElement>('.stats-68-value');
const $95 = document.querySelector<HTMLElement>('.stats-95-value');
document.querySelector<HTMLElement>('#mobile-name').textContent = getStaticsName(method);
const lineCanvas: HTMLCanvasElement = document.querySelector('#chart-line');
const lineNum = document.querySelectorAll<HTMLElement>('.chart-line-num > div');
const leftBtn = document.getElementById('left-line-chart-btn');
const rightBtn = document.getElementById('right-line-chart-btn');
const lineTitle = document.querySelector<HTMLElement>('#chart-line-title');
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

const bar2Canvas: HTMLCanvasElement = document.querySelector('#chart-bar');
const bar2DataBox = {
    labels: null,
    datasets: [
        {
            backgroundColor: 'rgb(14,99,132)',
            data: null
        }
    ]
};
const bar2Option: Chart.ChartOptions = {
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

mqMobileInit();
makeLoading();
isLogedIn().then(value => {
    if (value) getUnAuthAPI('/stats/piece', { method })
        .then(data => {
            mean.textContent = Number(data.stats.mean).toFixed(2);
            $68.textContent = rangeMake(data.stats);
            $95.textContent = rangeMake(data.stats, 2);
            const lineInstance = new ChartBase('line', lineCanvas, lineDataBox, lineOption);
            lineInstance.create();
            const lineSlide = new LineSlide(lineInstance, lineNum, leftBtn, rightBtn);
            lineSlide.setData(data);
            lineSlide.init();
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

            const leftBarBtn: HTMLElement = document.querySelector('#left-bar-chart-btn');
            const rightBarBtn: HTMLElement = document.querySelector('#right-bar-chart-btn');
            const barNum = document.querySelectorAll('.chart-bar-num > div');
            const bar1Canvas: HTMLCanvasElement = document.querySelector('#chart-bar-slide');
            const barTitle = document.querySelector<HTMLElement>('#chart-bar-title');

            const bar1DataBox = {
                labels: labels[method],
                datasets: [
                    {
                        label: Slide.EXPECTED_TEXT,
                        backgroundColor: '#00B2EA',
                        data: null
                    }
                ]
            };
            const bar1Option: Chart.ChartOptions = {
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                maintainAspectRatio: false
            }
            const barInstance1 = new ChartBase('bar', bar1Canvas, bar1DataBox, bar1Option);
            barInstance1.create();
            const barSlide = new BarSlide(barInstance1, barNum, leftBarBtn, rightBarBtn);
            barSlide.setData(data);
            barSlide.init();
            const setText2: () => void = function (this: any) {
                switch (this.current) {
                    case 0: barTitle.textContent = Slide.EXPECTED_TEXT;
                        break;
                    case 1: barTitle.textContent = Slide.ACTUAL_TEXT;
                        break;
                    case 2: barTitle.textContent = '예상대비 초과비율(%)';
                        break;
                }
            }
            makeClickable(barSlide, setText2.bind(barSlide));

            const barLabels = [];
            for (let i = data.total - 49; i <= data.total; i++) barLabels.push(i);
            bar2DataBox.labels = barLabels;
            bar2DataBox.datasets[0].data = data.piece
            const barInstance2 = new ChartBase('bar', bar2Canvas, bar2DataBox, bar2Option);
            barInstance2.create();
            insertexcludedLinesTable(data);
        }).catch(() => networkAlert())
        .finally(() => removeLoading());
    else onlyUserAlert();
}).finally(() => removeLoading());