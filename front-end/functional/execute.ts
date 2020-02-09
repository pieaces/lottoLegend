import DataAPI from "./DataAPI";
import { BarSlide, LineSlide } from './Slide/Slide'
import BubbleChart from "./Slide/bubble";
import DropDown from "./Slide/dropDown";
import makeClickable from './Slide/makeClickable'

const leftBarBtn: HTMLElement = document.querySelector('#left-bar-chart-btn');
const rightBarBtn: HTMLElement = document.querySelector('#right-bar-chart-btn');
const barNum = document.querySelectorAll('.chart-bar-num > div');
const barCanvas: HTMLElement = document.querySelector('#chart-func1-bar');
const main23: HTMLElement = document.querySelector('.main-2-3');
//
const leftLineBtn: HTMLElement = document.querySelector('#left-line-chart-btn');
const rightLineBtn: HTMLElement = document.querySelector('#right-line-chart-btn');
const lineNum = document.querySelectorAll('.chart-line-num > div');
const lineCanvas: HTMLElement = document.querySelector('#chart-func1-line');
const main22: HTMLElement = document.querySelector('.main-2-2');
//
const bubbleBox: HTMLElement = document.querySelector('#chart-func1-bubble');
//
const nextBtn = document.getElementById('nextBtn');
const optionList = document.getElementById('optionList');
//
const bar = new BarSlide(<HTMLCanvasElement>barCanvas, leftBarBtn, rightBarBtn, barNum, main23);
const line = new LineSlide(<HTMLCanvasElement>lineCanvas, leftLineBtn, rightLineBtn, lineNum, main22);
const bubble = new BubbleChart(bubbleBox);
makeClickable(bar);
makeClickable(line);

async function execute() {
    DropDown();
    await DataAPI.getInstance().init();

    bar.init();
    line.init();
    bubble.init();

    const optionList = [null, [3], null, [10, 20, 42, 43, 44], [2], 2, { from: 100, to: 190 },
        { from: 2, to: 4 }, { from: 1, to: 3 }, { from: 0, to: 3 }, { from: 10, to: 14 }, { from: 30, to: 38 }, { from: 7, to: 10 }, true]

    nextBtn.addEventListener('click', async () => {
        //optionList method
        const option = undefined;
        const currentFilter = DataAPI.getInstance().getCurrent();
        await DataAPI.getInstance().forward(optionList[currentFilter]);

        switch (currentFilter) {
            case 3: case 4:

                break;
            default:
                bar.init();
                line.init();
                bubble.init();
        }

    });
}
execute();
