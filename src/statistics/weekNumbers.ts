import Selectr, { IOptions } from 'mobius1-selectr';
import { setColorLotto, networkAlert } from '../functions/index';
import { headerSign } from '../amplify/auth';
import configure from '../amplify/configure';
import { getUnAuthAPI } from '../amplify/api';

const selectBox = document.querySelector<HTMLSelectElement>('#num-week-select-box');
const numWeekWrapper = document.querySelector<HTMLElement>('.num-week-wrapper');


configure();
headerSign();

getUnAuthAPI('/numbers/week')
    .then(({ data, rounds }) => {
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
            const { data } = await getUnAuthAPI('/numbers/week/' + option.value);
            makeTable(data);
        });
    }).catch(err => networkAlert());

function makeTable(dataSet: ({ round: string, numbers: number[], hits?: boolean[] })[]) {
    numWeekWrapper.innerHTML = '';
    for (let i = 0; i < dataSet.length; i++) {
        const div = document.createElement('div');
        div.classList.add('num-week-container', 'box-color');

        const header = document.createElement('div');
        header.classList.add('num-week-header');

        header.textContent = `${dataSet[i].round}회`;

        const section = document.createElement('div');
        section.classList.add('num-week-section');

        const leftNumWeekBox = document.createElement('div');
        leftNumWeekBox.classList.add('num-week-box');

        const leftNumWeekNumBox = document.createElement('div');
        leftNumWeekNumBox.classList.add('num-week-num-box');

        const leftNumWeekHitBox = document.createElement('div');
        leftNumWeekHitBox.classList.add('num-week-hit-box');

        const rightNumWeekBox = document.createElement('div');
        rightNumWeekBox.classList.add('num-week-box');

        const rightNumWeekNumBox = document.createElement('div');
        rightNumWeekNumBox.classList.add('num-week-num-box');

        const rightNumWeekHitBox = document.createElement('div');
        rightNumWeekHitBox.classList.add('num-week-hit-box');

        for (let j = 0; j < dataSet[i].numbers.length; j++) {
            if (j <= 4) {
                const numWeekNum = document.createElement('div');
                numWeekNum.classList.add('num-week-num');

                const num = document.createElement('div');
                num.textContent = dataSet[i].numbers[j].toString();
                setColorLotto(dataSet[i].numbers[j], num);

                numWeekNum.appendChild(num);
                leftNumWeekNumBox.appendChild(numWeekNum);
                leftNumWeekBox.appendChild(leftNumWeekNumBox);
            }
            else {
                const numWeekNum = document.createElement('div');
                numWeekNum.classList.add('num-week-num');

                const num = document.createElement('div');
                num.textContent = dataSet[i].numbers[j].toString();
                setColorLotto(dataSet[i].numbers[j], num);

                numWeekNum.appendChild(num);
                rightNumWeekNumBox.appendChild(numWeekNum);
                rightNumWeekBox.appendChild(rightNumWeekNumBox);
            }
        }


        if (!dataSet[i].hits) {
            header.style.borderTop = "1px solid rgba(0,0,0,0.1)";
            section.appendChild(leftNumWeekBox);
            section.appendChild(rightNumWeekBox);
            section.style.borderBottom = "none";
            div.appendChild(header);
            div.appendChild(section);
            numWeekWrapper.appendChild(div);
            const adBox = document.createElement('div');
            adBox.classList.add('ad-box', 'box-color');
            numWeekWrapper.appendChild(adBox);
        } else {

            let hitsTotal = 0;

            for (let j = 0; j < dataSet[i].hits.length; j++) {
                const hit = document.createElement('div');
                if (dataSet[i].hits[j]) {
                    hit.textContent = "적중";
                    hitsTotal++;
                } else {
                    hit.textContent = "-";
                }
                if (j <= 4) {
                    leftNumWeekHitBox.appendChild(hit);
                } else {
                    rightNumWeekHitBox.appendChild(hit);
                }

            }

            leftNumWeekBox.appendChild(leftNumWeekHitBox);
            rightNumWeekBox.appendChild(rightNumWeekHitBox);

            section.appendChild(leftNumWeekBox);
            section.appendChild(rightNumWeekBox);

            const footer = document.createElement('div');
            footer.classList.add('num-week-footer');

            footer.innerHTML = `${dataSet[i].numbers.length}개 중  <span class="num-week-hit-result">${hitsTotal}개</span>  적중 (${Math.round(hitsTotal / dataSet[i].numbers.length * 100)}%)`;

            div.appendChild(header);
            div.appendChild(section);
            div.appendChild(footer);
            numWeekWrapper.appendChild(div);
        }
    }
}