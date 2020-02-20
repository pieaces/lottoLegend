import ChartBase from "../../functional/Chart/Charts";

const canvas = document.querySelector('#func1-chart-bar');
const dataBox = {
    labels: [1, 2, 3, 4, 5, 7],
    datasets: [
        {
            label: [1, 2, 3, 4, 5, 6],
            backgroundColor: '#00B2EA',
            data: [1, 2, 3, 4, 5, 6,]
        }
    ]
};
const option = {
}

const barInstance = new ChartBase('bar', canvas, dataBox, option);
export default barInstance;