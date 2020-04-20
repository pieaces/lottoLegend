import configure from "../amplify/configure";
import 'core-js/stable/array/fill'
import 'core-js/stable/object/assign'
import 'core-js/stable/promise'
import { getUnAuthAPI } from "../amplify/api";
import ChartBase from "../system/premium/Chart/Charts";
import LineSlide from "../system/premium/Slide/LineSlide";
import makeClickable from "../system/premium/Slide/makeClickable";
import { mqMobileInit } from './functions';
import { makeLoading, networkAlert, removeLoading, onlyUserAlert } from "../functions";
import { insertUnitsTable } from "./tables";
import { isLogedIn } from "../amplify/auth";
configure();

const lineCanvas: HTMLCanvasElement = document.querySelector('#chart-line');
const lineNum = document.querySelectorAll<HTMLElement>('.chart-line-num > div');
const leftBtn = document.getElementById('left-line-chart-btn');
const rightBtn = document.getElementById('right-line-chart-btn');
const lineTitle = document.querySelector<HTMLElement>('#chart-line-title');
const lineOption: Chart.ChartOptions = {
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    maintainAspectRatio: false,
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
const lineDataBox = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    datasets: [
        {
            label: '수학적 예측값',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(14,99,132)',
            data: null,
            fill: false
        },
        {
            label: '실제 당첨값',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'rgb(199, 54, 44)',
            data: null,
            fill: false
        }
    ]
};

mqMobileInit();
makeLoading();
isLogedIn().then(value => {
    if (value) getUnAuthAPI('/stats/piece', { method: 'pos$1' })
        .then(data => {
            const lineInstance = new ChartBase('line', lineCanvas, lineDataBox, lineOption);
            lineInstance.create();
            const lineSlide = new LineSlide(lineInstance, lineNum, leftBtn, rightBtn);
            lineSlide.setData(data);
            lineSlide.init();
            const setText: () => void = function (this: any) {
                switch (this.current) {
                    case 0: lineTitle.textContent = '1~12회차 종합';
                        break;
                    case 1: lineTitle.textContent = '1~24회차 종합';
                        break;
                    case 2: lineTitle.textContent = '1~48회차 종합';
                        break;
                    case 3: lineTitle.textContent = '1~192회차 종합';
                        break;
                    case 4: lineTitle.textContent = '전회차 종합';
                        break;
                }
            }
            makeClickable(lineSlide, setText.bind(lineSlide));

            insertUnitsTable(data);
        }).catch(() => networkAlert())
        .finally(() => removeLoading());
    else onlyUserAlert();
});