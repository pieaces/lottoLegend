import configure from '../amplify/configure'
import { getAuthAPI } from '../amplify/api';
import CheckBoxToggle from '../system/premium/instanceBtns/CheckBoxToggle';
import Selectr, { IOptions } from 'mobius1-selectr';
import { headerSign } from '../amplify/auth';
import { makeTable } from './functions';

configure();
headerSign();

const loading = document.querySelector('.loading-box');

const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-select-box');
const toolSelectBox = document.querySelector<HTMLSelectElement>('#tool-select-box');
const methodSelectBox = document.querySelector<HTMLSelectElement>('#method-select-box');
const numInfoToggleBtn = document.querySelector('.mypage-toggle-btn');
const pastFilterBox = document.getElementsByClassName('func3-past-filter-box') as HTMLCollectionOf<HTMLElement>;
const tableContent = document.getElementsByClassName('mypage-table-content') as HTMLCollectionOf<HTMLElement>;

const darkBlueBorder = "0.5rem solid #09538e";
const lightBlueBorder = "0.5rem solid #449ce3";
const grayBorder = "0.5rem solid #dadada";
const defaultBorder = "1px solid rgba(0,0,0,0.1)";

init();
const tableNumBox = document.querySelector<HTMLElement>('.mypage-table-num-box');

async function init() {
    loading.classList.remove('none');
    const { data, rounds, answer } = await getAuthAPI('/numbers/mass');

    console.log(answer);
    const roundConfig: IOptions = {
        data: rounds.reverse().map((round: number) => {
            return {
                text: round.toString(),
                value: round.toString()
            }
        })
    };
    makeTable(tableNumBox, data, rounds[0], true, answer);

    const toolConfig: IOptions = {
        data: [
            { text: '전체', value: 'all' },
            { text: '무료', value: 'a' },
            { text: '유료', value: 'b' }
        ],
        searchable: false
    };
    const methodConfig: IOptions = {
        data: [
            { text: '전체', value: 'all' },
            { text: '자동', value: 'a' },
            { text: '수동', value: 'm' }
        ],
        searchable: false
    };

    const roundSelect = new Selectr(roundSelectBox, roundConfig);
    const toolSelect = new Selectr(toolSelectBox, toolConfig);
    const methodSelect = new Selectr(methodSelectBox, methodConfig);

    let currentRound: number = 0;
    let tool: string = null;
    let method: string = null;

    roundSelect.on('selectr.change', async (option) => {
        loading.classList.remove('none');
        let result: any;
        if (option.value === 'all') {
            result = await getAuthAPI('/numbers/mass/', { tool, method });
            currentRound = null;
        } else {
            result = (await getAuthAPI('/numbers/mass/' + option.value, { tool, method }));
            currentRound = Number(option.value);
        }
        tableNumBox.innerHTML = '';
        makeTable(tableNumBox, result.data, result.rounds[0], true, result.answer);
        loading.classList.add('none');
    });
    toolSelect.on('selectr.change', async (option) => {
        loading.classList.remove('none');
        let result: any;
        if (option.value === 'all') {
            result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { method }));
            methodSelect.enable();
            tool = null;
        } else if (option.value === 'a') {
            result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool: option.value }));
            methodSelect.disable();
            tool = option.value;
        } else if (option.value === 'b') {
            result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool: option.value, method }));
            methodSelect.enable();
            tool = option.value;
        }
        tableNumBox.innerHTML = '';
        makeTable(tableNumBox, result.data, result.rounds[0], true, result.answer);
        loading.classList.add('none');
    });
    methodSelect.on('selectr.change', async (option) => {
        loading.classList.remove('none');
        let result: any;
        if (option.value === 'all') {
            result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool }));
            method = null;
        } else {
            result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool, method: option.value }));
            method = option.value;
        }
        tableNumBox.innerHTML = '';
        makeTable(tableNumBox, result.data, result.rounds[0], true, result.answer);
        loading.classList.add('none');
    });

    loading.classList.add('none');
    const checkBoxToggle = new CheckBoxToggle();
    checkBoxToggle.addEvent();

    numInfoToggleBtn.addEventListener('click', numInfoToggle());
}


function numInfoToggle() {
    let flag = true;
    numInfoToggleBtn.textContent = "번호정보 닫기";
    return function () {
        if (!flag) {
            numInfoToggleBtn.textContent = "번호정보 닫기";
            for (let i = 0; i < pastFilterBox.length; i++) {
                pastFilterBox[i].classList.remove('none');
                if (i !== 0 && (i + 1) % 5 === 0) {
                    tableContent[i].style.borderBottom = defaultBorder;
                    pastFilterBox[i].style.borderBottom = lightBlueBorder;
                    if ((i + 1) % 10 === 0) {
                        pastFilterBox[i].style.borderBottom = darkBlueBorder;
                    }
                } else {
                    pastFilterBox[i].style.borderBottom = grayBorder;
                }
            }

            flag = true;
        } else {
            numInfoToggleBtn.textContent = "번호정보 열기";
            for (let i = 0; i < pastFilterBox.length; i++) {
                pastFilterBox[i].classList.add('none');
                if (i !== 0 && (i + 1) % 5 === 0) {
                    tableContent[i].style.borderBottom = lightBlueBorder;
                    if ((i + 1) % 10 === 0) {
                        tableContent[i].style.borderBottom = darkBlueBorder;
                    }
                }
            }
            flag = false;
        }
    }
}
