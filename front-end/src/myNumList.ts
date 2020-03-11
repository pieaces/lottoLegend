import configure from './amplify/configure'
import Layout3 from './functional/Layout/Layout3'
import NumBoard from "./functional/Layout/NumBoard";
import { getAuthAPI } from './amplify/api';
import CheckBoxToggle from './functional/instanceBtns/CheckBoxToggle';
import DataAPI from "./functional/DataAPI";

configure();

const tableNumBox = document.querySelector('.mypage-table-num-box');

init();

async function init() {
    const dataSet = [{
        numbers: [1, 2, 3, 4, 5, 6],
        winner: [2, 3, 4, 5],
        round: 1,
        date: 10,
        auto: "자동",
        iswin: "당첨!"
    },
    {
        numbers: [1, 2, 3, 4, 5, 6],
        winner: [2, 3, 4, 5],
        round: 1,
        date: 10,
        auto: "자동",
        iswin: "당첨!"
    },
    {
        numbers: [1, 2, 3, 4, 5, 6],
        winner: [2, 3, 4, 5],
        round: 1,
        date: 10,
        auto: "자동",
        iswin: "당첨!"
    }
    ];

    makeTable(dataSet);

    const pastFilterTable = document.querySelectorAll('.func3-past-filter-box');
    pastFilterTable.forEach((node) => {
        node.classList.add('none');
    })

    const numToggleBtn = document.querySelectorAll('.mypage-table-num-toggle');
    numToggleBtn.forEach((node) => {
        node.addEventListener('click', numToggle(node));
    })

    const checkBoxToggle = new CheckBoxToggle();
    checkBoxToggle.addEvent();
}


function makeTable(dataSet) {

    for (let i = 0; i < dataSet.length; i++) {
        const tableContent = document.createElement('div');
        tableContent.classList.add('mypage-table-content');

        const tableCheckBox = document.createElement('div');

        tableCheckBox.classList.add('mynum-table-checkbox');

        Layout3.makeInputCheckBox(tableCheckBox);

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
            Layout3.setColorLotto(dataSet[i].numbers[j], div);
            tableNumList.appendChild(div);
        }

        tableNum.appendChild(tableNumList);
        tableContent.appendChild(tableNum);

        const numInfo = document.createElement('div');
        numInfo.classList.add('mynum-table-num-info');

        const tableToggleBtn = document.createElement('button');
        tableToggleBtn.setAttribute('type', 'button');
        tableToggleBtn.classList.add('btn', 'mypage-table-num-toggle', 'box-color');
        tableToggleBtn.textContent = "번호정보";

        numInfo.appendChild(tableToggleBtn);
        tableContent.appendChild(numInfo);

        const tableIsWin = document.createElement('div');
        tableIsWin.classList.add('mynum-table-iswin');
        tableIsWin.textContent = dataSet[i]["iswin"];

        tableContent.appendChild(tableIsWin);

        tableNumBox.appendChild(tableContent);

        const numBoard = new NumBoard(dataSet);
        numBoard.makePastFilterTable(i, tableNumBox);

    }

}

function numToggle(node) {
    let flag = false;
    const tableContent = node.parentNode.parentNode;
    const table = tableContent.nextElementSibling;
    return function () {
        if (!flag) {
            table.classList.remove('none');
            tableContent.style.borderBottom = "none";
            flag = true;
        }
        else {
            table.classList.add('none');
            tableContent.style.borderBottom = "1px solid rgba(0,0,0,0.1)";
            flag = false;
        }
    }
}



