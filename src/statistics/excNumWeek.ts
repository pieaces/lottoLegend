import Selectr, { IOptions } from 'mobius1-selectr';
import { setColorLotto } from '../functions/index';

const selectBox = document.querySelector<HTMLSelectElement>('#exc-num-week-select-box');
const excNumWeekWrapper = document.querySelector('.exc-num-week-wrapper');


init();
function init() {
    const dataSet = [];
    for (let i = 0; i < 2; i++) {
        const rounds = "901";
        const numbers = [];
        const hitsArr = [];

        for (let i = 0; i < 10; i++) {
            numbers.push(i + 5);
            hitsArr.push(false);
        }

        const obj = {
            rounds: rounds,
            hitsArr: hitsArr,
            numbers: numbers
        }
        dataSet.push(obj);
    }

    console.log(dataSet);

    const rounds = ['1', '2', '3', '4', '5'];
    ///////////////////////////////////////////////



    makeTable(dataSet);

    const config: IOptions = {
        data: rounds.map((round: string) => {
            return {
                text: round,
                value: round
            }
        }),
    };
    const selector = new Selectr(selectBox, config);
    selector.on('selectr.change', async (option) => {

    });

}

function makeTable(dataSet: ({ rounds: string, numbers: number[], hitsArr: boolean[] })[]) {

    for (let k = 0; k < dataSet.length; k++) {
        let hitsTotal = 0;
        const div = document.createElement('div');
        div.classList.add('lotto-num-container');

        const table = document.createElement('table');
        table.classList.add('table', 'lotto-num-table');

        const thead = document.createElement('thead');


        const titleTr = document.createElement('tr');
        titleTr.classList.add('lotto-num-table-title');

        const th = document.createElement('th');
        th.setAttribute('colspan', `${dataSet[k].numbers.length}`);
        th.textContent = `${dataSet[k].rounds}회 제외 ${dataSet[k].numbers.length}수`;


        titleTr.appendChild(th);
        thead.appendChild(titleTr);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        const NumberTr = document.createElement('tr');

        for (let j = 0; j < dataSet[k].numbers.length; j++) {
            const td = document.createElement('td');
            const numBox = document.createElement('div');
            numBox.classList.add('lotto-num');

            const num = document.createElement('div');
            num.classList.add('lotto-num-value');
            num.textContent = dataSet[k].numbers[j].toString();
            setColorLotto(dataSet[k].numbers[j], num);

            numBox.appendChild(num);
            td.appendChild(numBox);
            NumberTr.appendChild(td);
        }

        tbody.appendChild(NumberTr);


        const hitsTr = document.createElement('tr');

        for (let j = 0; j < dataSet[k].hitsArr.length; j++) {
            const td = document.createElement('td');
            if (dataSet[k].hitsArr[j] === true) {
                td.textContent = "적중";
                hitsTotal++;
            } else {
                td.textContent = "적중 x";
            }
            hitsTr.appendChild(td);
        }

        tbody.appendChild(hitsTr);
        table.appendChild(tbody);

        const tfoot = document.createElement('tfoot');

        const resultTr = document.createElement('tr');

        const resultTd = document.createElement('td');
        resultTd.setAttribute('colspan', `${dataSet[k].numbers.length}`);

        resultTd.innerHTML = `${dataSet[k].numbers.length}개 중 <span class="exc-num-week-percent">${hitsTotal}개</span> 적중`;

        resultTr.appendChild(resultTd);

        tfoot.appendChild(resultTr);

        table.appendChild(tfoot);
        div.appendChild(table);
        excNumWeekWrapper.appendChild(div);
    }

}