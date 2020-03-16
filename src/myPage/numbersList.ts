import configure from '../amplify/configure'
import { getAuthAPI } from '../amplify/api';
import CheckBoxToggle from '../system/premium/instanceBtns/CheckBoxToggle';
import { makeInputCheckBox, makePastFilterTable } from '../system/premium/Layout/functions';
import Selectr, { IOptions } from 'mobius1-selectr';
import { setColorLotto, setDisabledLotto } from '../functions';

configure();
const tableNumBox = document.querySelector('.mypage-table-num-box');
const loading = document.querySelector('.loading-box');

const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-select-box');
const toolSelectBox = document.querySelector<HTMLSelectElement>('#tool-select-box');
const methodSelectBox = document.querySelector<HTMLSelectElement>('#method-select-box');
const numInfoToggleBtn = document.querySelector('.mypage-toggle-btn');
const pastFilterBox = document.getElementsByClassName('func3-past-filter-box');

init();

async function init() {
    loading.classList.remove('none');
    const {data, rounds, answer} = await getAuthAPI('/numbers/mass');

    console.log(answer);
    const roundConfig: IOptions = {
        data: rounds.reverse().map((round: number) => {
            return {
                text: round.toString(),
                value: round.toString()
            }
        })
    };
    makeTable(data, rounds[0], answer);

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
        makeTable(result.data, result.rounds[0], result.answer);
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
        makeTable(result.data, result.rounds[0], result.answer);
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
        makeTable(result.data, result.rounds[0], result.answer);
        loading.classList.add('none');
    });

    loading.classList.add('none');
    const checkBoxToggle = new CheckBoxToggle();
    checkBoxToggle.addEvent();

    numInfoToggleBtn.addEventListener('click', numInfoToggle());
}

function numInfoToggle() {
    let flag = true;
    return function () {
        if (!flag) {
            for (let i = 0; i < pastFilterBox.length; i++) {
                pastFilterBox[i].classList.remove('none');
            }
            flag = true;
        } else {
            for (let i = 0; i < pastFilterBox.length; i++) {
                pastFilterBox[i].classList.add('none');
            }
            flag = false;
        }
    }
}

function makeTable(dataSet: any[], round: number | string, answer?:{numbers:number[], bonusNum:number}) {
    for (let i = 0; i < dataSet.length; i++) {
        const tableContent = document.createElement('div');
        tableContent.classList.add('mypage-table-content');

        if (i === dataSet.length - 1) {
            tableContent.style.borderBottom = "1px solid rgba(0,0,0,0.1)";
        }

        const tableCheckBox = document.createElement('div');

        tableCheckBox.classList.add('mypage-table-checkbox');

        tableCheckBox.append(makeInputCheckBox());

        tableContent.appendChild(tableCheckBox);

        const tableRound = document.createElement('div');
        tableRound.classList.add('mypage-table-round');
        tableRound.textContent = round.toString();

        tableContent.appendChild(tableRound);

        const tableDate = document.createElement('div');
        tableDate.classList.add('mypage-table-date');
        tableDate.textContent = dataSet[i].date.slice(0, 10);

        tableContent.appendChild(tableDate);

        const tableDivision = document.createElement('div');
        tableDivision.classList.add('mypage-table-division');
        let division: string;
        switch (dataSet[i].tool) {
            case 'a': division = "무료";
                break;
            case 'b': division = "유료"
                switch (dataSet[i].method) {
                    case 'a': division += " 자동"
                        break;
                    case 'm': division += " 수동"
                        break;
                }
                break;
        }

        tableDivision.textContent = division;

        tableContent.appendChild(tableDivision);

        const tableNum = document.createElement('div');
        tableNum.classList.add('mypage-table-num');

        const tableNumList = document.createElement('div');
        tableNumList.classList.add('mypage-table-num-list');

        let count = 0;        
        for (let j = 0; j < dataSet[i].numbers.length; j++) {
            const div = document.createElement('div');
            div.textContent = dataSet[i].numbers[j].toString();
            if (answer && answer.numbers.some(item => Number(item) === dataSet[i].numbers[j])) {
                count++;
                setColorLotto(dataSet[i].numbers[j], div);
            } else {
                if(!answer) setColorLotto(dataSet[i].numbers[j], div);
                else setDisabledLotto(div);
            }

            tableNumList.appendChild(div);
        }

        tableNum.appendChild(tableNumList);
        tableContent.appendChild(tableNum);

        const tableIsWin = document.createElement('div');
        tableIsWin.classList.add('mypage-table-iswin');

        if (answer) {
            const winner = win(dataSet[i].numbers, count, answer);
            tableIsWin.textContent = winner > 0 ? winner + '등' : '-';
        } else {
            tableIsWin.textContent = '추첨전';
        }
        tableContent.appendChild(tableIsWin);

        tableNumBox.appendChild(tableContent);


        const infoTd = makePastFilterTable(dataSet[i]);
        if (i !== 0 && (i + 1) % 5 === 0) {
            infoTd.style.borderBottom = "0.5rem solid #09538e";
        } else {
            infoTd.style.borderBottom = "0.5rem solid #dadada";
        }
        tableNumBox.appendChild(infoTd);
    }
}

function win(numbers: number[], count:number, answer: {bonusNum:number}): number {
    if (numbers) {
        switch (count) {
            case 3://5등
                return 5;
            case 4://4등
                return 4;
            case 5:
                if (numbers.some(item => Number(answer.bonusNum) === item)) return 2;
                else return 3;
            case 6://1등
                return 1;
            default: return 0;
        }
    }
}
