import DataAPI from "./DataAPI";
import { BarSlide, LineSlide } from './Slide/Slide'
import BubbleChart from "./Slide/bubble";
import dropDown from "./Slide/dropDown";
import makeClickable from './Slide/makeClickable'
import Layout2 from '../functional/function2/index'

const func1MainLayout = document.querySelector<HTMLElement>('.func1-main-bottom-container');
const func2MainLayout = document.querySelector<HTMLElement>('.func2-main-bottom-container');
const func1CheckBox = document.querySelector<HTMLElement>('.func1-checkbox-container');
const func2SelectNumBox = document.querySelector<HTMLElement>('.func2-select-num-box-container');
//
const leftBarBtn: HTMLElement = document.querySelector('#func1-left-bar-chart-btn');
const rightBarBtn: HTMLElement = document.querySelector('#func1-right-bar-chart-btn');
const barNum = document.querySelectorAll('.func1-chart-bar-num > div');
const barCanvas: HTMLElement = document.querySelector('#func1-chart-bar');
const main22: HTMLElement = document.querySelector('.func1-main-2-2');
//
const leftLineBtn: HTMLElement = document.querySelector('#func1-left-line-chart-btn');
const rightLineBtn: HTMLElement = document.querySelector('#func1-right-line-chart-btn');
const lineNum = document.querySelectorAll<HTMLElement>('.func1-chart-line-num > div');
const lineCanvas: HTMLElement = document.querySelector('#func1-chart-line');
const main21: HTMLElement = document.querySelector('.func1-main-2-1');
//
const bubbleBox: HTMLElement = document.querySelector('#func1-chart-bubble');
//
const nextBtn = document.getElementById('nextBtn');
const optionBox = document.getElementById('optionList');
//
const bar = new BarSlide(<HTMLCanvasElement>barCanvas, leftBarBtn, rightBarBtn, barNum, main22);
const line = new LineSlide(<HTMLCanvasElement>lineCanvas, leftLineBtn, rightLineBtn, lineNum, main21);
const bubble = new BubbleChart(bubbleBox);
const layout2 = new Layout2();
// makeClickable(bar);
// makeClickable(line);

const checkBox = document.querySelectorAll('.func1-checkbox > div');
const reset = document.querySelector('#reset');
makeClickable(bar);
makeClickable(line);

async function execute() {
    dropDown();
    await DataAPI.getInstance().init();
    layout2.init();
    bar.init();
    line.init();
    bubble.init();

    const optionList = [null, [3], null, [10, 20, 42, 43, 44], [2], 2, { from: 100, to: 190 },
        { from: 2, to: 4 }, { from: 1, to: 3 }, { from: 0, to: 3 }, { from: 10, to: 14 }, { from: 30, to: 38 }, { from: 7, to: 10 }, true]

    checkBox.forEach(node => {
        node.addEventListener('click', () => {

            // if (node.children[0].checked) {
            //     node.classList.add('func1-num-check-current');
            // } else {
            //     node.classList.remove('func1-num-check-current');
            // }
        })
    })


    reset.addEventListener('click', () => {
        checkBox.forEach(node => {
            node.classList.remove('func1-num-check-current');
        })
    })

    nextBtn.addEventListener('click', async () => {
        //optionList method
        const option = undefined;
        const currentFilter = DataAPI.getInstance().getCurrent();

        lineNum.forEach(node => {
            node.classList.remove('func1-chart-slide-current');
        });
        Array.from(lineNum)[0].classList.add('func1-chart-slide-current');
        barNum.forEach(node => {
            node.classList.remove('func1-chart-slide-current');
        });
        Array.from(barNum)[0].classList.add('func1-chart-slide-current');

        checkBox.forEach(node => {
            node.classList.remove('func1-num-check-current');
        })



        await DataAPI.getInstance().forward(optionList[currentFilter]);

        switch (currentFilter + 1) {
            case 3: case 4:
                func1MainLayout.style.display = "none";
                func2MainLayout.style.display = "block";
                func1CheckBox.style.display = "none"
                func2SelectNumBox.style.display = "block"
                break;
            default:
                func1MainLayout.style.display = "block";
                func2MainLayout.style.display = "none";
                func1CheckBox.style.display = "block"
                func2SelectNumBox.style.display = "none";
                bar.init();
                line.init();
                bubble.init();
        }

    });
}
execute();
