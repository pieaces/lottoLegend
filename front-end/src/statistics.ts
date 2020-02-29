import configure from './amplify/configure'
import ChartBase from './functional/Chart/Charts';
import { getUnAuthAPI } from './amplify/api';
import { getQueryStringObject } from './functions';
const loading = document.querySelector('.loading');

configure();

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
    labels: null,
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

const table = document.getElementById('func1-line-table');
const method = getQueryStringObject().method;
loading.classList.remove('none');
getUnAuthAPI('/stats/piece/' + method)
    .then(data => {
        console.log(data);
        loading.classList.add('none');
        lineDataBox.labels = [0,1,2,3,4];
        lineDataBox.datasets[0].data = data.ideal.all;
        lineDataBox.datasets[1].data = data.actual.all;
        const lineInstance = new ChartBase('line', lineCanvas, lineDataBox, lineOption);
        lineInstance.create();

        const tableData = [];
        tableData.push([0,1,2,3,4]);
        const ideal: number[] = data.ideal.all as number[];
        const actual: number[] = data.actual.all as number[];
        tableData.push(ideal.map(num => num.toFixed(2)));
        tableData.push(actual.map(num => num.toFixed(2)));
        const percent: number[] = [];
        for (let i = 0; i < ideal.length; i++) {
            percent[i] = (actual[i] - ideal[i]) / ideal[i]*100;
        }
        tableData.push(percent.map(num => {
            if(num === -100 || num === 100) return '-';
            else return num.toFixed(2);
        }));

        for (let i = 0; i < tableData[0].length; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < tableData.length; j++) {
                const td = document.createElement('td');
                td.textContent = String(tableData[j][i]);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        barDataBox.labels = new Array(50).fill(1)
        barDataBox.datasets[0].data = data.piece
        const barInstance = new ChartBase('bar', barCanvas, barDataBox, barOption);
        barInstance.create();
    });