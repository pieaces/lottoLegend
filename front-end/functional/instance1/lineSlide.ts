import ChartBase from "../Chart/Charts";
import LineSlide from "../Slide/LineSlide";
import makeClickable from "../Slide/makeClickable";
import Slide from "../Slide";

const leftLineBtn: HTMLElement = document.querySelector('#func1-left-line-chart-btn');
const rightLineBtn: HTMLElement = document.querySelector('#func1-right-line-chart-btn');
const lineNum = document.querySelectorAll<HTMLElement>('.func1-chart-line-num > div');
const lineCanvas: HTMLCanvasElement = document.querySelector('#func1-chart-line');

const lineValueBox1 = document.querySelector<HTMLElement>('#func1-line-filter-name');
const lineValueBox2 = document.querySelector<HTMLElement>('#func1-line-times');
const lineTable = document.querySelector<HTMLElement>('#func1-line-table');

const option: Chart.ChartOptions = {
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
            label: Slide.EXPECTED_TEXT,
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(14,99,132)',
            data: null,
            fill: false
        },
        {
            label: Slide.ACTUAL_TEXT,
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(199, 54, 44)',
            data: null,
            fill: false
        }
    ]
};
const lineInstance = new ChartBase('line', lineCanvas, dataBox, option);
lineInstance.create();
const lineSlide = new LineSlide(lineInstance, leftLineBtn, rightLineBtn, lineNum, lineTable, lineValueBox1, lineValueBox2);
makeClickable(lineSlide);

export default lineSlide