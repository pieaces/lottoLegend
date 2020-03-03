
import ChartBase from './functional/Chart/Charts';
const stackCanvas: HTMLCanvasElement = document.querySelector('.stack-chart');
const stackDataBox = {
    labels: ['January'],
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
    title: {
        display: true,
        text: '구간별 당첨횟수'
    },
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

const stackInstance = new ChartBase('bar', stackCanvas, stackDataBox, stackOption);
stackInstance.create();