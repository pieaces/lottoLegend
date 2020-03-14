import Selectr, { IOptions } from 'mobius1-selectr';
import { setColorLotto } from '../functions/index';

const selectBox = document.querySelector<HTMLSelectElement>('#exc-num-week-select-box');
const winNumBox = document.querySelectorAll<HTMLElement>('.win-num-box > div');
const excNumWeekTable = document.querySelector('.lotto-num-box > tbody');
const numResultValue = document.querySelector('#num-result-value');
const numResultPercent = document.querySelector('#num-result-percent');

init();
function init() {

    const numbers = [];
    const voteValue = [];
    const voteRate = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(Math.floor(Math.random() * 11));
        voteRate.push(Math.random() * (100));
    }

    voteRate.sort((a, b) => {
        return b - a;
    })

    const dataSet = {
        numbers: numbers,
        voteValue: voteValue,
        voteRate: voteRate
    };

    const winNum = [1, 2, 3, 4, 5, 6];
    const rounds = ['1', '2', '3', '4', '5'];
    ///////////////////////////////////////////////

    numResultValue.textContent = (6).toString();
    numResultPercent.textContent = (100).toString();

    for (let i = 0; i < winNum.length; i++) {
        winNumBox[i].textContent = winNum[i].toString();
        setColorLotto(winNum[i], winNumBox[i]);
    }

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

function makeTable(dataSet: { numbers: number[], voteValue: number[], voteRate: number[] }) {
    for (let i = 0; i < dataSet.numbers.length; i++) {
        const tr = document.createElement('tr');

        const rankTd = document.createElement('td');
        rankTd.textContent = (i + 1).toString();

        const numTd = document.createElement('td');
        const numBox = document.createElement('div');
        numBox.classList.add('lotto-num');

        const num = document.createElement('div');
        num.classList.add('lotto-num-value');
        num.textContent = dataSet.numbers[i].toString();
        setColorLotto(dataSet.numbers[i], num);

        numBox.appendChild(num);
        numTd.appendChild(numBox);

        const voteRateTd = document.createElement('td');
        voteRateTd.textContent = `${dataSet.voteRate[i].toString()}%`;

        tr.appendChild(rankTd);
        tr.appendChild(numTd);
        tr.appendChild(voteRateTd);

        excNumWeekTable.appendChild(tr);
    }

}