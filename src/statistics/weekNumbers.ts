import Selectr, { IOptions } from 'mobius1-selectr';
import { setColorLotto, networkAlert, setDisabledLotto } from '../functions/index';
import configure from '../amplify/configure';
import { getUnAuthAPI } from '../amplify/api';

const selectBox = document.querySelector<HTMLSelectElement>('#num-week-select-box');
const numWeekWrapper = document.querySelector<HTMLElement>('.num-week-wrapper');

configure();

getUnAuthAPI('/numbers/week')
    .then(({ data, rounds }) => {
        makeTable(data);
        const config: IOptions = {
            nativeDropdown:false,
            placeholder: '회차',
            data: rounds.map((round: string) => {
                return {
                    text: round,
                    value: round
                }
            }),
        };
        Object.defineProperty(Selectr.prototype, 'mobileDevice', {
            get() { return false; },
            set() {},
            enumerable: true,
            configurable: true
        });
        const selector = new Selectr(selectBox, config);
        selector.on('selectr.change', async (option) => {
            const { data } = await getUnAuthAPI('/numbers/week/' + option.value);
            makeTable(data);
        });
    }).catch(() => networkAlert());

function makeTable(dataSet: ({ round: string, numbers: number[], hits?: boolean[] })[]) {
    numWeekWrapper.innerHTML = '';
    for (let i = 0; i < dataSet.length; i++) {
        const div = document.createElement('div');
        div.classList.add('num-week-container');
        div.classList.add('box-color');

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
            const numWeekNum = document.createElement('div');
            numWeekNum.classList.add('num-week-num');
            const num = document.createElement('div');
            num.textContent = dataSet[i].numbers[j].toString();
            numWeekNum.appendChild(num);

            if (j <= 4) {
                leftNumWeekNumBox.appendChild(numWeekNum);
                leftNumWeekBox.appendChild(leftNumWeekNumBox);
            }
            else {
                rightNumWeekNumBox.appendChild(numWeekNum);
                rightNumWeekBox.appendChild(rightNumWeekNumBox);
            }

            if (dataSet[i].hits && dataSet[i].hits[j]) setColorLotto(dataSet[i].numbers[j], num);
            else if (!dataSet[i].hits) setColorLotto(dataSet[i].numbers[j], num);
            else setDisabledLotto(num);
        }

        if (!dataSet[i].hits) {
            section.appendChild(leftNumWeekBox);
            section.appendChild(rightNumWeekBox);
            section.style.borderBottom = "none";
            div.appendChild(header);
            div.appendChild(section);
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
        }
        numWeekWrapper.appendChild(div);
        if (i === 0) {
            const adBox = document.createElement('div');
            //adBox.classList.add('ad-box', 'box-color');
            adBox.classList.add('ad-box');
            numWeekWrapper.appendChild(adBox);
        }
    }
}