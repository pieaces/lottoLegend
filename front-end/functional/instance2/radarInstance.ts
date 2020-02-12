import ChartBase from "../Chart/Charts";

const canvas: HTMLCanvasElement = document.querySelector('.func2-chart-radar');
const dataBox = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
        {
            fill: true,
            borderWidth: 1,
            borderColor: '#72B992',
            pointBorderColor: '#72B992',
            pointBackgroundColor: 'white',
            data: null
        }
    ]
};
const option = {
    responsive: false,
    title: {
        display: false
    },
    legend: {
        display: false
    }
};

const radarInstance = new ChartBase('radar', canvas, dataBox, option);
export default radarInstance;