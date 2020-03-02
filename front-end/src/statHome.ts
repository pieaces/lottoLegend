
import ChartBase from './functional/Chart/Charts';

const loading = document.querySelector('.loading');

const stackCanvas: HTMLCanvasElement = document.querySelector('.stack-chart');
const stackDataBox = {
    labels: ['January'],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: 'red',
        data: [
            1
        ]
    }, {
        label: 'Dataset 1',
        backgroundColor: 'green',
        data: [
            1
        ]
    }, {
        label: 'Dataset 1',
        backgroundColor: 'blue',
        data: [
            1
        ]
    }]

};

const stackOption: Chart.ChartOptions = {
    title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
    },
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
stackInstance.update();

