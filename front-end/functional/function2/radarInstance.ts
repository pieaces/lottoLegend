import { ChartBase } from "../functional/Slide/Charts";

const canvas:HTMLCanvasElement = document.querySelector('.chart-func2-radar');
const dataBox = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
        {
            fill: true,
            borderWidth: 1,
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgba(179,181,198,1)',
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