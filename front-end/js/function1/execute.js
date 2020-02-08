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

const filter = new Filter();
const bar = new BarSlide(barBox, filter, leftBarBtn, rightBarBtn, barNum, main23);
const line = new LineSlide(lineBox, filter, leftLineBtn, rightLineBtn, lineNum, main22);
async function execute() {
  DropDown();
  await filter.init();
  bar.init();
  line.init();
  initBubbleChart(bubbleBox, filter.getStats());
}
execute();
