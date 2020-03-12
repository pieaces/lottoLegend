export function setColorLotto(num: number, Box: HTMLElement) {
    if (1 <= num && num <= 10) {
        Box.style.backgroundColor = '#FBC400';
    } else if (num <= 20) {
        Box.style.backgroundColor = '#69C8F2';
    } else if (num <= 30) {
        Box.style.backgroundColor = '#FF7272';
    } else if (num <= 40) {
        Box.style.backgroundColor = '#AAAAAA';
    } else if (num <= 45) {
        Box.style.backgroundColor = '#B0D840';
    }
}
export function setDefaultColor(node: HTMLElement) {
    node.style.background = "";
    node.textContent = "";
}
export function makeInputCheckBox(): HTMLDivElement {
    const inputBoxContainer = document.createElement('div');
    inputBoxContainer.classList.add('input-checkbox-container');

    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox');
    inputBoxContainer.appendChild(checkBox);

    const checkTextBox = document.createElement('div');
    checkTextBox.classList.add('input-checkbox-text-box');

    const checkText = document.createElement('div');
    checkText.classList.add('input-checkbox-text');
    checkText.classList.add('none');

    checkTextBox.appendChild(checkText);
    inputBoxContainer.appendChild(checkTextBox);

    return inputBoxContainer;
}

function makePastTable(winner: number[]) {
    const pastWinBox = document.createElement('div');
    pastWinBox.classList.add('func3-past-win-box');
    const pastWinTable = document.createElement('table');
    pastWinTable.classList.add('table', 'func3-past-win-table');
    const pastWinTableTr = document.createElement('tr');
    const pastWinTableTdFirst = document.createElement('td');
    pastWinTableTdFirst.textContent = "역대기록";

    pastWinTableTr.appendChild(pastWinTableTdFirst);

    for (let j = 0; j < winner.length; j++) {
        const td = document.createElement('td');
        td.textContent = `${j + 1}등 : ${winner[j]}`;
        if (winner[j] === 0) {
            td.style.color = "#a0a0a0";
        }
        pastWinTableTr.appendChild(td);
    }
    pastWinTable.appendChild(pastWinTableTr);
    pastWinBox.appendChild(pastWinTable);
    return pastWinBox;
}

interface Stats {
    lowCount: number, sum: number, oddCount: number, primeCount: number, $3Count: number, sum$10: number, diffMaxMin: number, AC: number
}
export interface TableData extends Stats {
    winner: number[];
    numbers: number[];
}
function makeFilterTable(data: Stats) {
    const filterNumInfo = document.createElement('div');
    filterNumInfo.classList.add('func3-filter-num-info');
    const listFilterTable = document.createElement('table');
    listFilterTable.classList.add('table', 'func3-list-filter-table');

    const listFilterTableMap = new Map([
        ["저값개수", data["lowCount"]],
        ["번호합계", data["sum"]],
        ["홀수개수", data["oddCount"]],
        ["소수개수", data["primeCount"]],
        ["3배수개수", data["$3Count"]],
        ["첫수 합", data["sum$10"]],
        ["고저 차", data["diffMaxMin"]],
        ["AC", data["AC"]]
    ])
    const listFilterTableTrTitle = document.createElement('tr');
    const listFilterTableTrValue = document.createElement('tr');

    listFilterTableMap.forEach((value, key) => {
        const keyTd = document.createElement('td');
        keyTd.textContent = key;
        listFilterTableTrTitle.appendChild(keyTd);

        const valueTd = document.createElement('td');
        valueTd.textContent = value && value.toString();
        listFilterTableTrValue.appendChild(valueTd);
    })
    listFilterTable.appendChild(listFilterTableTrTitle);
    listFilterTable.appendChild(listFilterTableTrValue);
    filterNumInfo.appendChild(listFilterTable);
    return filterNumInfo;
}

export function makePastFilterTable(data: TableData): HTMLDivElement {
    const tableBox = document.createElement('div');
    tableBox.classList.add('func3-past-filter-box')
    tableBox.appendChild(makePastTable(data.winner));
    tableBox.appendChild(makeFilterTable(data));

    return tableBox;
}