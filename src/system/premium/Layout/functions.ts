export function makeInputCheckBox(): HTMLDivElement {
    const inputBoxContainer = document.createElement('div');
    inputBoxContainer.classList.add('input-checkbox-container');

    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add('checkbox');
    inputBoxContainer.appendChild(checkBox);
    return inputBoxContainer;
}

function makePastTable(winner: number[]) {
    const pastWinBox = document.createElement('div');
    pastWinBox.classList.add('func3-past-win-box');
    const pastWinTable = document.createElement('table');
    pastWinTable.classList.add('table');
    pastWinTable.classList.add('func3-past-win-table');
    const pastWinTableTr = document.createElement('tr');
    const pastWinTableTdFirst = document.createElement('td');
    pastWinTableTdFirst.textContent = "역대 기록";

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
    listFilterTable.classList.add('table');
    listFilterTable.classList.add('func3-list-filter-table');

    const listFilterTableMap = new Map([
        ["저값 개수", data["lowCount"]],
        ["번호 합계", data["sum"]],
        ["홀수 개수", data["oddCount"]],
        ["소수 개수", data["primeCount"]],
        ["3배수 개수", data["$3Count"]],
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

export function makeCheckdValueBox(totalEl: HTMLElement, currentEl: HTMLElement, allCheckEl: HTMLInputElement) {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > .checkbox');
    let checkedCurrentValue = null;

    currentEl.textContent = "0";
    totalEl.textContent = checkboxes.length.toString();
    Array.from(checkboxes).forEach((node) => {
        node.addEventListener('change', () => {
            if (node.checked) {
                checkedCurrentValue++;
            } else {
                checkedCurrentValue--;
            }
            currentEl.textContent = checkedCurrentValue.toString();
        })
    })
    allCheckEl.addEventListener('change', () => {

        if (allCheckEl.checked) {
            checkedCurrentValue = document.querySelectorAll('.input-checkbox-container > .checkbox').length;
            currentEl.textContent = checkedCurrentValue.toString();
        } else {
            checkedCurrentValue = 0;
            currentEl.textContent = checkedCurrentValue.toString();
        }
    })

    if (document.querySelector('.save-btn')) {
        Array.from(document.querySelectorAll('.save-btn')).forEach(node=>{
            node.addEventListener('click', () => {
                checkedCurrentValue = 0;
            })
        }) 
    }
    if (document.querySelectorAll('.mypage-num-delete-btn')) {
        Array.from(document.querySelectorAll('.mypage-num-delete-btn')).forEach(node=>{
            node.addEventListener('click', () => {
                checkedCurrentValue = 0;
            })
        })        
    }

}

export function modifyBoundary() {
    const numContainer = document.querySelectorAll('.func3-num-container');
    const numListBoundary = document.querySelectorAll('.boundary-line');

    for (let i = 0; i < numListBoundary.length; i++) {
        numListBoundary[i].remove();
    }

    for (let i = 0; i < numContainer.length; i++) {
        if (i !== 0 && (i + 1) % 5 === 0) {
            const div = document.createElement('div');
            div.classList.add('boundary-line');
            numContainer[i].appendChild(div);
        }
    }

}