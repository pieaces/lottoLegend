
import ChartBase from './functional/Chart/Charts';

const loading = document.querySelector('.loading');

const stackCanvas: HTMLCanvasElement = document.querySelector('.stack-chart');
const stackDataBox = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: 'red',
        data: [
            1, 2, 3, 4, 5, 6
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
