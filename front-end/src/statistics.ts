import configure from './amplify/configure'
import ChartBase from './functional/Chart/Charts';
import { getUnAuthAPI } from './amplify/api';
import { getQueryStringObject } from './functions';
const loading = document.querySelector('.loading');
const labels = require('./functional/DataAPI/json/labels.json');
configure();
const method = getQueryStringObject().method;
const lineCanvas: HTMLCanvasElement = document.querySelector('#func1-chart-line');
const lineOption: Chart.ChartOptions = {
    responsive: true,
    tooltips: {
        mode: 'index',
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
const lineDataBox = {
    labels: labels[method],
    datasets: [
        {
            label: '예상',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(14,99,132)',
            data: null,
            fill: false
        },
        {
            label: '실제',
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
const barOption = {
    legend: { display: false },
    title: {
        display: true,
        text: '번호별 출현횟수',
        fontSize: 12
    }
};

loading.classList.remove('none');
getUnAuthAPI('/stats/piece/' + method)
    .then(result => {
        console.log(result);
        const data = result.data;
        loading.classList.add('none');
        lineDataBox.datasets[0].data = data.ideal.all;
        lineDataBox.datasets[1].data = data.actual.all;
        const lineInstance = new ChartBase('line', lineCanvas, lineDataBox, lineOption);
        lineInstance.create();

        const barLabels = [];
        for(let i=result.total; i>result.total-50; i--) barLabels.push(i);
        barDataBox.labels = barLabels;
        barDataBox.datasets[0].data = data.piece
        const barInstance = new ChartBase('bar', barCanvas, barDataBox, barOption);
        barInstance.create();
    });