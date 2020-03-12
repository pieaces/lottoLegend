import configure from './amplify/configure'
import { getAuthAPI } from './amplify/api';
import CheckBoxToggle from './functional/instanceBtns/CheckBoxToggle';
import { setColorLotto, makeInputCheckBox, makePastFilterTable } from './functional/Layout/functions';

configure();
const tableNumBox = document.querySelector('.mypage-table-num-box');

init();
async function init() {
    const dataSet = [{
        numbers: [1, 2, 3, 4, 5, 6],
        winner: [0, 0, 1, 1, 20],
        round: 1,
        date: 10,
        auto: "자동",
        iswin: "당첨!"
    },
    {
        numbers: [1, 2, 3, 4, 5, 6],
        winner: [0,2, 3, 4, 5],
        round: 1,
        date: 10,
        auto: "자동",
        iswin: "당첨!"
    },
    {
        numbers: [1, 2, 3, 4, 5, 6],
        winner: [0,2, 3, 4, 5],
        round: 1,
        date: 10,
        auto: "자동",
        iswin: "당첨!"
    }
    ];

    makeTable(dataSet);
    const checkBoxToggle = new CheckBoxToggle();
    checkBoxToggle.addEvent();
}

function makeTable(dataSet:any[]) {
    for (let i = 0; i < dataSet.length; i++) {
        const tableContent = document.createElement('div');
        tableContent.classList.add('mypage-table-content');

        const tableCheckBox = document.createElement('div');

        tableCheckBox.classList.add('mynum-table-checkbox');

        tableCheckBox.append(makeInputCheckBox());

        tableContent.appendChild(tableCheckBox);

        const tableRound = document.createElement('div');
        tableRound.classList.add('mynum-table-round');
        tableRound.textContent = dataSet[i]["round"];

        tableContent.appendChild(tableRound);

        const tableDate = document.createElement('div');
        tableDate.classList.add('mynum-table-date');
        tableDate.textContent = dataSet[i]["date"];

        tableContent.appendChild(tableDate);

        const tableAuto = document.createElement('div');
        tableAuto.classList.add('mynum-table-auto');
        tableAuto.textContent = dataSet[i]["auto"];

        tableContent.appendChild(tableAuto);

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
        tableIsWin.textContent = dataSet[i]["iswin"];
        tableContent.appendChild(tableIsWin);
        tableNumBox.appendChild(tableContent);

        const infoTd = makePastFilterTable(dataSet[i]);
        tableNumBox.appendChild(infoTd);
    }
}