
import configure from './amplify/configure'
import ChartBase from './functional/Chart/Charts';
import { getUnAuthAPI } from './amplify/api';

configure();
const stackCanvas: HTMLCanvasElement = document.querySelector('.stack-chart');
const stackDataBox = {
    labels: ['구간별 당첨횟수'],
    datasets: [
        {
            label: '1번대',
            backgroundColor: '#FBC400',
            data: [
                150
            ]
        },
        {
            label: '10번대',
            backgroundColor: '#69C8F2',
            data: [
                160
            ]
        },
        {
            label: '20번대',
            backgroundColor: '#FF7272',
            data: [
                140
            ]
        },
        {
            label: '30번대',
            backgroundColor: '#AAAAAA',
            data: [
                150
            ]
        },
        {
            label: '40번대',
            backgroundColor: '#B0D840',
            data: [
                110
            ]
        }
    ]

};

const stackOption: Chart.ChartOptions = {
    legend: { display: false },
    tooltips: {
        mode: 'index',
        intersect: false
    },
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            stacked: true,
        }],
        yAxes: [{
            stacked: true
        }]
    }
}

const winBox = document.querySelector<HTMLElement>('.win-num-box');
getUnAuthAPI('/numbers/win/' + 900)
    .then(data => {
        for (let i = 0; i < 6; i++) {
            const num = document.createElement('div');
            num.classList.add('win-num');
            num.textContent = data.numbers[i];
            winBox.appendChild(num);
        }
        const plus = document.createElement('div');
        plus.classList.add('plus');
        plus.textContent = '+';
        winBox.appendChild(plus);
        const bonus = document.createElement('div');
        bonus.classList.add('win-num');
        bonus.textContent = data.bonusNum;
        winBox.appendChild(bonus);
    });
const stackInstance = new ChartBase('bar', stackCanvas, stackDataBox, stackOption);
stackInstance.create();