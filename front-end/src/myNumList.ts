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
            { text: '무료', value: 'free' },
            { text: '유료', value: 'charge' }
        ],
        searchable: false
    };
    const methodConfig: IOptions = {
        data: [
            { text: '자동', value: 'auto' },
            { text: '수동', value: 'manual' }
        ],
        searchable: false
    };

    const roundSelect = new Selectr(roundSelectBox, roundConfig);
    roundSelect.on('selectr.change', async (option) => {
        console.log(option.value);
    });
    const toolSelect = new Selectr(toolSelectBox, toolConfig);
    toolSelect.on('selectr.change', async (option) => {
        console.log(option.value);
    });
    const methodSelect = new Selectr(methodSelectBox, methodConfig);
    methodSelect.on('selectr.change', async (option) => {
        console.log(option.value);
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