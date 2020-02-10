import ChartBase from "../Chart/Charts";

const canvas: HTMLCanvasElement = document.querySelector('.func2-chart-bar');
const dataBox = {
    labels: ['예측값', '실제값'],
    datasets: [
        {
            label: 'Ice Cream Sales ',
            fill: true,
            backgroundColor: ['moccasin', 'saddlebrown'],
            data: null
        }
    ]
};
const option = {
    legend: { display: false },
};

const barInstance = new ChartBase('bar', canvas, dataBox, option);
export default barInstance;