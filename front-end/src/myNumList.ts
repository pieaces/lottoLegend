import configure from './amplify/configure'
import { getAuthAPI } from './amplify/api';
import CheckBoxToggle from './functional/instanceBtns/CheckBoxToggle';
import { setColorLotto, makeInputCheckBox, makePastFilterTable } from './functional/Layout/functions';
import Selectr, { IOptions } from 'mobius1-selectr';

configure();
const tableNumBox = document.querySelector('.mypage-table-num-box');
const loading = document.querySelector('.loading-box');

const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-select-box');
const toolSelectBox = document.querySelector<HTMLSelectElement>('#tool-select-box');
const methodSelectBox = document.querySelector<HTMLSelectElement>('#method-select-box');
const numInfoToggleBtn = document.querySelector('.mynum-toggle-btn');
const pastFilterBox = document.getElementsByClassName('func3-past-filter-box');

init();
function makeTableByData(data: any): void {
    const rounds = Object.keys(data);
    rounds.reverse().forEach(round => {
        makeTable(data[round], round);
    });
}
async function init() {
    loading.classList.remove('none');
    const data = await getAuthAPI('/numbers/mass');
    const rounds = Object.keys(data);

    const roundConfig: IOptions = {
        data: [{
            text: '전체', value: 'all'
        }]
    };
    rounds.reverse().forEach(round => {
        makeTable(data[round], round);
        roundConfig.data.push({ text: round, value: round });
    });
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
        let data: any;
        if (option.value === 'all') {
            data = await getAuthAPI('/numbers/mass/', { tool, method });
            currentRound = null;
        } else {
            data = (await getAuthAPI('/numbers/mass/' + option.value, { tool, method }));
            currentRound = Number(option.value);
        }
        tableNumBox.innerHTML = '';
        makeTableByData(data);
        loading.classList.add('none');
    });
    toolSelect.on('selectr.change', async (option) => {
        loading.classList.remove('none');
        let data: any;
        if (option.value === 'all') {
            data = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { method }));
            methodSelect.enable();
            tool = null;
        } else if (option.value === 'a') {
            data = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool: option.value }));
            methodSelect.disable();
            tool = option.value;
        } else if (option.value === 'b') {
            data = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool: option.value, method }));
            methodSelect.enable();
            tool = option.value;
        }
        tableNumBox.innerHTML = '';
        makeTableByData(data);
        loading.classList.add('none');
    });
    methodSelect.on('selectr.change', async (option) => {
        loading.classList.remove('none');
        let data: any;
        if (option.value === 'all') {
            data = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool }));
            method = null;
        } else {
            data = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool, method: option.value }));
            method = option.value;
        }
        tableNumBox.innerHTML = '';
        makeTableByData(data);
        loading.classList.add('none');
    });

    loading.classList.add('none');
    const checkBoxToggle = new CheckBoxToggle();
    checkBoxToggle.addEvent();

    numInfoToggleBtn.addEventListener('click', numInfoToggle());
}

function numInfoToggle() {
    let flag = false;
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

function makeTable(dataSet: any[], round: number | string) {
    for (let i = 0; i < dataSet.length; i++) {
        const tableContent = document.createElement('div');
        tableContent.classList.add('mypage-table-content');

        const tableCheckBox = document.createElement('div');

        tableCheckBox.classList.add('mynum-table-checkbox');

        tableCheckBox.append(makeInputCheckBox());

        tableContent.appendChild(tableCheckBox);

        const tableRound = document.createElement('div');
        tableRound.classList.add('mynum-table-round');
        tableRound.textContent = round.toString();

        tableContent.appendChild(tableRound);

        const tableDate = document.createElement('div');
        tableDate.classList.add('mynum-table-date');
        tableDate.textContent = dataSet[i].date.slice(0, 10);

        tableContent.appendChild(tableDate);

        const tableDivision = document.createElement('div');
        tableDivision.classList.add('mynum-table-division');
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
        tableNum.classList.add('mynum-table-num');

        const tableNumList = document.createElement('div');
        tableNumList.classList.add('mypage-table-num-list');

        for (let j = 0; j < dataSet[i].numbers.length; j++) {
            const div = document.createElement('div');
            div.textContent = dataSet[i].numbers[j].toString();
            setColorLotto(dataSet[i].numbers[j], div);
            tableNumList.appendChild(div);
        }

        tableNum.appendChild(tableNumList);
        tableContent.appendChild(tableNum);

        const tableIsWin = document.createElement('div');
        tableIsWin.classList.add('mynum-table-iswin');
        if (dataSet[i].win) {
            tableIsWin.textContent = dataSet[i].win;
        } else {
            tableIsWin.textContent = '추첨전';
        }
        tableContent.appendChild(tableIsWin);

        tableNumBox.appendChild(tableContent);



        const infoTd = makePastFilterTable(dataSet[i]);
        infoTd.classList.add('none');
        tableNumBox.appendChild(infoTd);
    }

}