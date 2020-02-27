import ChartBase from "../Chart/Charts";

const canvas: HTMLCanvasElement = document.querySelector('.func2-chart-bar');
const dataBox = {
    labels: ['실제값', '예측값'],
    datasets: [
        {
            fill: true,
            backgroundColor: ['rgb(199, 54, 44)', 'rgb(14,99,132)'],
            data: null
        }
    ]
};
const option = {
    legend: { display: false },
    scales: {
        yAxes: [{
            ticks: {
            }
        }]
    },
    title: {
        display: true,
        text: '번호별 출현횟수',
        fontSize: 12
    }
};

const barInstance = new ChartBase('bar', canvas, dataBox, option);
export default barInstance;