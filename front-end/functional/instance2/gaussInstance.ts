import ChartBase from "../Chart/Charts";

const canvas: HTMLCanvasElement = document.querySelector('.func2-chart-gauss');
const dataBox = {
    datasets: [
        {
            steppedLine: true,
            borderColor: '#3E3D55',
            borderWidth: 3,
            fill: false,
            data: null,
            pointBackgroundColor: "#00C8FF"
        }
    ]
};
const option = {
    responsive: true,
    legend: { display: false },
    title: {
        display: true,
        text: '회차별 출현여부',
        fontSize:14
    }
};

const gaussInstance = new ChartBase('line', canvas, dataBox, option);
gaussInstance.create();
export default gaussInstance;