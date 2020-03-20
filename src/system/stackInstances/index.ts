import ChartBase from '../premium/Chart/Charts';

const compartColor = ['#FBC400', '#69C8F2', '#FF7272', '#AAAAAA', '#B0D840'];

const predictCanvas: HTMLCanvasElement = document.querySelector('#predict-canvas');
const actualCanvas: HTMLCanvasElement = document.querySelector('#actual-canvas');
const latestCanvas: HTMLCanvasElement = document.querySelector('#lately-canvas');
const selectionCanvas: HTMLCanvasElement = document.querySelector('#selection-canvas');

const predictDataBox = {
    labels: ['구간별 출현횟수'],
    datasets: [
        {
            label: '1번대',
            backgroundColor: compartColor[0],
            data: [1.20]
        },
        {
            label: '10번대',
            backgroundColor: compartColor[1],
            data: [1.33]
        },
        {
            label: '20번대',
            backgroundColor: compartColor[2],
            data: [1.33]
        },
        {
            label: '30번대',
            backgroundColor: compartColor[3],
            data: [1.33]
        },
        {
            label: '40번대',
            backgroundColor: compartColor[4],
            data: [0.67]
        }
    ]
};

const actualDataBox = {
    labels: ['구간별 출현횟수'],
    datasets: [
        {
            label: '1번대',
            backgroundColor: compartColor[0],
            data: null
        },
        {
            label: '10번대',
            backgroundColor: compartColor[1],
            data: null
        },
        {
            label: '20번대',
            backgroundColor: compartColor[2],
            data: null
        },
        {
            label: '30번대',
            backgroundColor: compartColor[3],
            data: null
        },
        {
            label: '40번대',
            backgroundColor: compartColor[4],
            data: null
        }
    ]
};
const latestDataBox = {
    labels: ['구간별 출현횟수'],
    datasets: [
        {
            label: '1번대',
            backgroundColor: compartColor[0],
            data: null
        },
        {
            label: '10번대',
            backgroundColor: compartColor[1],
            data: null
        },
        {
            label: '20번대',
            backgroundColor: compartColor[2],
            data: null
        },
        {
            label: '30번대',
            backgroundColor: compartColor[3],
            data: null
        },
        {
            label: '40번대',
            backgroundColor: compartColor[4],
            data: null
        }
    ]
};
const selectionDataBox = {
    labels: ['구간별 출현횟수'],
    datasets: [
        {
            label: '1번대',
            backgroundColor: compartColor[0],
            data: null
        },
        {
            label: '10번대',
            backgroundColor: compartColor[1],
            data: null
        },
        {
            label: '20번대',
            backgroundColor: compartColor[2],
            data: null
        },
        {
            label: '30번대',
            backgroundColor: compartColor[3],
            data: null
        },
        {
            label: '40번대',
            backgroundColor: compartColor[4],
            data: null
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
            stacked: true,
            ticks:{
                min:0,
                max:6
            }
        }]
    }
};

const predictInstance = new ChartBase('bar', predictCanvas, predictDataBox, stackOption);
const actualInstance = new ChartBase('bar', actualCanvas, actualDataBox, stackOption);
const latestInstance = new ChartBase('bar', latestCanvas, latestDataBox, stackOption);
const selectionInstance = new ChartBase('bar', selectionCanvas, selectionDataBox, stackOption);
predictInstance.create();
actualInstance.create();
latestInstance.create();
selectionInstance.create();

export {predictInstance, actualInstance, latestInstance, selectionInstance};