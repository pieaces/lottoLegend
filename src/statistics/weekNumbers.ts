import Selectr, { IOptions } from 'mobius1-selectr';
import { setColorLotto, networkAlert } from '../functions/index';
import { headerSign } from '../amplify/auth';
import configure from '../amplify/configure';
import { getUnAuthAPI } from '../amplify/api';

const selectBox = document.querySelector<HTMLSelectElement>('#exc-num-week-select-box');
const excNumWeekWrapper = document.querySelector<HTMLElement>('.exc-num-week-wrapper');

configure();
headerSign();

getUnAuthAPI('/numbers/week')
    .then(({data, rounds}) => {
        makeTable(data);

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
            const {data} = await getUnAuthAPI('/numbers/week/'+option.value);
            makeTable(data);
        });
    }).catch(err => networkAlert());

function makeTable(dataSet: ({ round: string, numbers: number[], hits?: boolean[] })[]) {
    excNumWeekWrapper.innerHTML = '';
    for (let i = 0; i < dataSet.length; i++) {
        const div = document.createElement('div');
        div.classList.add('lotto-num-container');

        const table = document.createElement('table');
        table.classList.add('table', 'lotto-num-table');
        const thead = document.createElement('thead');

        const titleTr = document.createElement('tr');
        titleTr.classList.add('lotto-num-table-title');

        const th = document.createElement('th');
        th.setAttribute('colspan', dataSet[i].numbers.length.toString());
        th.textContent = `${dataSet[i].round}회`;

        titleTr.appendChild(th);
        thead.appendChild(titleTr);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const NumberTr = document.createElement('tr');

        for (let j = 0; j < dataSet[i].numbers.length; j++) {
            const td = document.createElement('td');
            const numBox = document.createElement('div');
            numBox.classList.add('lotto-num');

            const num = document.createElement('div');
            num.classList.add('lotto-num-value');
            num.textContent = dataSet[i].numbers[j].toString();
            setColorLotto(dataSet[i].numbers[j], num);

            numBox.appendChild(num);
            td.appendChild(numBox);
            NumberTr.appendChild(td);
        }

        tbody.appendChild(NumberTr);

        if (!dataSet[i].hits) {
            table.appendChild(tbody);
            div.appendChild(table);
            excNumWeekWrapper.appendChild(div);
            const boundary = document.createElement('div');
            boundary.classList.add('num-list-boundary');
            excNumWeekWrapper.appendChild(boundary);
        } else {
            div.classList.add('lotto-num-container-past');
            let hitsTotal = 0;
            const hitsTr = document.createElement('tr');

            for (let j = 0; j < dataSet[i].hits.length; j++) {
                const td = document.createElement('td');
                if (dataSet[i].hits[j]) {
                    td.textContent = "적중";
                    hitsTotal++;
                } else {
                    td.textContent = "-";
                }
                hitsTr.appendChild(td);
            }
            tbody.appendChild(hitsTr);
            table.appendChild(tbody);

            const tfoot = document.createElement('tfoot');
            const resultTr = document.createElement('tr');
            const resultTd = document.createElement('td');

            resultTd.setAttribute('colspan', dataSet[i].numbers.length.toString());
            resultTd.innerHTML = `${dataSet[i].numbers.length}개 중 <span class="exc-num-week-hit">${hitsTotal}개</span> 적중 (${Math.round(hitsTotal/dataSet[i].numbers.length*100)}%)`;
            resultTr.appendChild(resultTd);
            tfoot.appendChild(resultTr);
            table.appendChild(tfoot);
            table.appendChild(tbody);
            div.appendChild(table);
            excNumWeekWrapper.appendChild(div);
        }
    }
}