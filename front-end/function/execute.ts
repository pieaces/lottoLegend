import Filter from "./class/Filter";

const leftBarBtn = document.querySelector('#left-bar-chart-btn');
const rightBarBtn = document.querySelector('#right-bar-chart-btn');
const barNum = document.querySelectorAll('.chart-bar-num > div');
const barBox = document.querySelector('#chart-func1-bar');
const main23 = document.querySelector('.main-2-3');
//
const lineNum = document.querySelectorAll('.chart-line-num > div');
const lineBox = document.querySelector('#chart-func1-line');
const leftLineBtn = document.querySelector('#left-line-chart-btn');
const rightLineBtn = document.querySelector('#right-line-chart-btn');
const main22 = document.querySelector('.main-2-2');
//
const bubbleBox = document.querySelector('#chart-func1-bubble');
//
const nextBtn = document.getElementById('nextBtn');
const optionList = document.getElementById('optionList');
//
const filter = new Filter();
const bar = new BarSlide(barBox, filter, leftBarBtn, rightBarBtn, barNum, main23);
const line = new LineSlide(lineBox, filter, leftLineBtn, rightLineBtn, lineNum, main22);
const bubble = new Bubble(bubbleBox, filter);

async function execute() {
    DropDown();
    await filter.init();
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
        console.log('옵션: ', optionList[filter.current]);
        await filter.forward(optionList[filter.current]);
        console.log('범위: ', filter.getRange());
        bar.init();
        line.init();
        bubble.init();
        console.log('stats', filter.getStats());
    });
}
execute();
