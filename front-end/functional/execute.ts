import DataAPI from "./class/DataAPI";
import {BarSlide, LineSlide} from './class/Slide/Slide'
import BubbleChart from "./class/Slide/bubble";
import DropDown from "./class/Slide/filter";
import makeClickable from './class/Slide/makeClickable'

const leftBarBtn:HTMLElement = document.querySelector('#left-bar-chart-btn');
const rightBarBtn:HTMLElement = document.querySelector('#right-bar-chart-btn');
const barNum = document.querySelectorAll('.chart-bar-num > div');
const barBox:HTMLElement = document.querySelector('#chart-func1-bar');
const main23:HTMLElement = document.querySelector('.main-2-3');
//
const leftLineBtn:HTMLElement = document.querySelector('#left-line-chart-btn');
const rightLineBtn:HTMLElement = document.querySelector('#right-line-chart-btn');
const lineNum = document.querySelectorAll('.chart-line-num > div');
const lineBox:HTMLElement = document.querySelector('#chart-func1-line');
const main22:HTMLElement = document.querySelector('.main-2-2');
//
const bubbleBox:HTMLElement = document.querySelector('#chart-func1-bubble');
//
const nextBtn = document.getElementById('nextBtn');
const optionList = document.getElementById('optionList');
//
const bar = new BarSlide(<HTMLCanvasElement>barBox, leftBarBtn, rightBarBtn, barNum, main23);
const line = new LineSlide(<HTMLCanvasElement>lineBox, leftLineBtn, rightLineBtn, lineNum, main22);
const bubble = new BubbleChart(bubbleBox);

async function execute() {
    DropDown();
    await DataAPI.getInstance().init();
    makeClickable(bar);
    makeClickable(line);
    bar.init();
    line.init();
    bubble.init();

    const optionList = [null, [3], null, [10, 20, 42, 43, 44], [2], 2, { from: 100, to: 190 },
        { from: 2, to: 4 }, { from: 1, to: 3 }, { from: 0, to: 3 }, { from: 10, to: 14 }, { from: 30, to: 38 }, { from: 7, to: 10 }, true]

    nextBtn.addEventListener('click', async () => {
        //optionList method
        const option = undefined;
        await DataAPI.getInstance().forward(optionList[DataAPI.getInstance().getCurrent()]);
        bar.init();
        line.init();
        bubble.init();
    });
}
execute();
