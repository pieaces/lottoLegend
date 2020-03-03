import configure from './amplify/configure'
import ChartBase from './functional/Chart/Charts';
import { getUnAuthAPI } from './amplify/api';
import { getQueryStringObject, rangeMake, getStaticsName } from './functions';
const loading = document.querySelector('.loading');
const labels = require('./functional/DataAPI/json/labels.json');
configure();
const method = getQueryStringObject().method;
const lineCanvas: HTMLCanvasElement = document.querySelector('#func1-chart-line');
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
const barCanvas: HTMLCanvasElement = document.querySelector('#func1-chart-bar');
const barDataBox = {

    labels: null,
    datasets: [
        {
            backgroundColor: '#00B2EA',
            data: null
        }
    ]
};
const barOption: Chart.ChartOptions = {
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    maintainAspectRatio: false,
    legend: { display: false },
};

loading.classList.remove('none');
getUnAuthAPI('/stats/piece/' + method)
    .then(data => {
        console.log(data);
        mean.textContent = Number(data.stats.mean).toFixed(2);
        $68.textContent = rangeMake(data.stats);
        $95.textContent = rangeMake(data.stats, 2);
        loading.classList.add('none');
        lineDataBox.datasets[0].data = data.ideal.all;
        lineDataBox.datasets[1].data = data.actual.all;
        const lineInstance = new ChartBase('line', lineCanvas, lineDataBox, lineOption);
        lineInstance.create();

        const barLabels = [];
        for (let i = data.total - 49; i <= data.total; i++) barLabels.push(i);
        barDataBox.labels = barLabels;
        barDataBox.datasets[0].data = data.piece
        const barInstance = new ChartBase('bar', barCanvas, barDataBox, barOption);
        barInstance.create();
    });


