import configure from './amplify/configure'
import Layout3 from './functional/Layout/Layout3'
import { getAuthAPI } from './amplify/api';
import CheckBoxToggle from './functional/instanceBtns/CheckBoxToggle';


configure();
const numToggleBtn = document.querySelectorAll('.mypage-table-num-toggle');


init();

async function init() {
    const dataSet = await getAuthAPI('/numbers/generator/free');
    makeTable(dataSet);
    const checkBoxToggle = new CheckBoxToggle();
    checkBoxToggle.addEvent();
}


function makeTable(dataSet: { numbers: number[], winner: number[] }[]) {

    for (let i = 0; i < dataSet.length; i++) {
        const tableContent = document.createElement('div');
        tableContent.classList.add('mypage-table-content');

        const tableCheckBox = document.createElement('div');

        tableCheckBox.classList.add('mynum-table-checkbox');


        const checkBoxContainer = document.createElement('div');
        checkBoxContainer.classList.add('input-checkbox-container');

        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBoxContainer.appendChild(checkBox);

        const checkBoxTextBox = document.createElement('div');
        checkBoxTextBox.classList.add('input-checkbox-text-box');

        const checkBoxText = document.createElement('div');
        checkBoxText.classList.add('input-checkbox-text', 'none');

        checkBoxTextBox.appendChild(checkBoxText);
        checkBoxContainer.appendChild(checkBoxTextBox);
        tableCheckBox.appendChild(checkBoxContainer);
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

        for (let j = 0; j < dataSet[i].numbers.length; i++) {
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


    }

    function makeFilterTable(dataSet: { numbers: number[], winner: number[] }[], currentVar, target) {

        const listFilterTableMap = new Map([
            ["저값개수", dataSet[currentVar]["lowCount"]],
            ["번호합계", dataSet[currentVar]["sum"]],
            ["홀수개수", dataSet[currentVar]["oddCount"]],
            ["소수개수", dataSet[currentVar]["primeCount"]],
            ["3배수개수", dataSet[currentVar]["$3Count"]],
            ["첫수 합", dataSet[currentVar]["sum$10"]],
            ["고저 차", dataSet[currentVar]["diffMaxMin"]],
            ["AC", dataSet[currentVar]["AC"]]
        ])

        const filterTableBox = document.createElement('tr');
        filterTableBox.classList.add('func3-list-filter-table-box');

        const tdBox = document.createElement('td');
        tdBox.setAttribute('colspan', '7');

        const listFilterTable = document.createElement('table');

        listFilterTable.classList.add('table', 'func3-list-filter-table');

        const tbody = document.createElement('tbody');

        const listFilterTableTrTitle = document.createElement('tr');

        listFilterTableMap.forEach((value, key) => {
            const td = document.createElement('td');
            td.textContent = key;
            listFilterTableTrTitle.appendChild(td);
        })

        tbody.appendChild(listFilterTableTrTitle);

        const listFilterTableTrValue = document.createElement('tr');

        listFilterTableMap.forEach((value, key) => {
            const td = document.createElement('td');
            td.textContent = value;
            listFilterTableTrValue.appendChild(td);
        })

        tbody.appendChild(listFilterTableTrValue);

        listFilterTable.appendChild(tbody);
        tdBox.appendChild(listFilterTable);
        filterTableBox.appendChild(tdBox);
        target.appendChild(filterTableBox);
    }


    function makePastWinTable(pastWinNum: number[]) {
        const trBox = document.createElement('tr');
        trBox.classList.add('func3-past-win-table-box');

        const tdBox = document.createElement('td');
        tdBox.setAttribute('colspan', '7');

        const table = document.createElement('table');
        table.classList.add('table', 'func3-past-win-table');

        const tbody = document.createElement('tbody');

        const tr = document.createElement('tr');

        const tdText = document.createElement('td');
        tdText.textContent = "역대기록";

        tr.appendChild(tdText);

        for (let i = 0; i < pastWinNum.length; i++) {
            const td = document.createElement('td');
            td.textContent = pastWinNum[i].toString();
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
        table.appendChild(tbody);
        tdBox.appendChild(table);
        trBox.appendChild(tdBox);
        tableBody.appendChild(trBox);

    }
}

numToggleBtn.forEach((node) => {
    node.addEventListener('click', numToggle(node));
})

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



