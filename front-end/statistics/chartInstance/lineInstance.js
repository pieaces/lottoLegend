import ChartBase from "../../functional/Chart/Charts";

const canvas = document.querySelector('#func1-chart-line');


const option = {
    responsive: true,
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.5)',
                    lineWidth: 1
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.5)',
                    lineWidth: 1
                }
            }
        ]
    },
}
const dataBox = {
    labels: null,
    datasets: [
        {
            label: [1, 2, 3, 4, 5],
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(14,99,132)',
            data: [2, 3, 4, 5, 6],
            fill: false
        },
        {
            label: [1, 2, 3, 4, 5],
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(199, 54, 44)',
            data: [2, 3, 4, 5, 6],
            fill: false
        }
    ]
};


const lineInstance = new ChartBase('line', canvas, dataBox, option);
export default lineInstance;