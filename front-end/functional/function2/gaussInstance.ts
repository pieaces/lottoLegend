import { ChartBase } from "../Slide/Charts";

const canvas: HTMLCanvasElement = document.querySelector('.func2-chart-gauss');
const dataBox = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].reverse(),
    datasets: [
        {
            steppedLine: true,
            borderColor: 'red',
            fill: false,
            data: null,
        }
    ]
};
const option = {
    responsive: true,
    legend: { display: false },
    title: {
        display: true,
        text: 'hi'
    }
};

const gaussInstance = new ChartBase('line', canvas, dataBox, option);
export default gaussInstance;