import Selectr, { IOptions } from 'mobius1-selectr';
import { setColorLotto } from '../functions/index';

const selectBox = document.querySelector<HTMLSelectElement>('#exc-num-week-select-box');
const excNumWeekWrapper = document.querySelector('.exc-num-week-wrapper');


init();
function init() {
    const dataSet = [];
    for (let i = 0; i < 2; i++) {
        const rounds = "902";
        const hitsTotal = "90";
        const numbers = [];
        const hitsArr = [];

        for (let i = 0; i < 10; i++) {
            numbers.push(i);
            hitsArr.push(true);
        }

        const obj = {
            rounds: rounds,
            hits: hitsTotal,
            hitsArr: hitsArr,
            numbers: numbers
        }
        dataSet.push(obj);
    }

    console.log(dataSet);
    //        const dataSet= [ 
    //         //    2개
    //         {
    //         round:"902",
    //         hits:"90",
    //           numbers: [
    //             //객체   
    //               {
    //             number:1,
    //             hit:true
    //             }
    //             //10개
    //     ]
    //     }
    // // 2개
    // ];
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

function makeTable(dataSet: ({ rounds: string, hits: string, numbers: number[], hitsArr: boolean[] })[]) {

    for (let k = 0; k < dataSet.length; k++) {
        const div = document.createElement('div');
        div.classList.add('lotto-num-container');

        const table = document.createElement('table');
        table.classList.add('table', 'lotto-num-box');

        const tr = document.createElement('tr');

        const th = document.createElement('th');
        th.setAttribute('colspan', '5');
        th.textContent = `${dataSet[k].hits}회 로또끝 제외 10수`;

        tr.appendChild(th);
        table.appendChild(tr);
        const DIVIDE = 5;
        const I = Math.ceil(dataSet[k].numbers.length / DIVIDE);
        for (let i = 0; i < I; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < DIVIDE; j++) {
                const td = document.createElement('td');
                const lottoNum = document.createElement('div');
                lottoNum.classList.add('lotto-num');
                const lottoNumValue = document.createElement('div');
                lottoNumValue.classList.add('lotto-num-value');
                if (dataSet[k].hitsArr[DIVIDE * i + j] === true) {
                    lottoNumValue.classList.add('lotto-num-mark');
                }
                lottoNumValue.textContent = dataSet[k].numbers[DIVIDE * i + j].toString();
                setColorLotto(dataSet[k].numbers[DIVIDE * i + j], lottoNumValue);
                lottoNum.appendChild(lottoNumValue);
                td.appendChild(lottoNum);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        const resultTr = document.createElement('tr');

        const resultTd = document.createElement('td');
        resultTd.setAttribute('colspan', '5');

        const
            div.appendChild(table);
        excNumWeekWrapper.appendChild(div);
    }

}