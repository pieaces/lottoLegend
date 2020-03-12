import { makeInputCheckBox, setColorLotto } from './functions';

const numContainerBox = document.querySelector('.func3-num-container-box');
export default class NumBoard {
    dataSet: any;
    constructor(dataBox: any) {
        this.dataSet = dataBox;
    }

    private makePastTable(currentVar, target) {
        const pastWinBox = document.createElement('div');
        pastWinBox.classList.add('func3-past-win-box');
        const pastWinTable = document.createElement('table');
        pastWinTable.classList.add('table', 'func3-past-win-table');
        const pastWinTableTr = document.createElement('tr');
        const pastWinTableTdFirst = document.createElement('td');
        pastWinTableTdFirst.textContent = "역대기록";

        pastWinTableTr.appendChild(pastWinTableTdFirst);

        for (let j = 0; j < this.dataSet[currentVar].winner.length; j++) {
            const td = document.createElement('td');
            td.textContent = `${j + 1}등 : ${this.dataSet[currentVar].winner[j]}`;
            if (this.dataSet[currentVar].winner[j] === 0) {
                td.style.color = "#a0a0a0";
            }
            pastWinTableTr.appendChild(td);
        }
        pastWinTable.appendChild(pastWinTableTr);
        pastWinBox.appendChild(pastWinTable);
        target.appendChild(pastWinBox);
    }

    private makeFilterTable(currentVar, target) {
        const filterNumInfo = document.createElement('div');
        filterNumInfo.classList.add('func3-filter-num-info');
        const listFilterTable = document.createElement('table');
        listFilterTable.classList.add('table', 'func3-list-filter-table');

        const listFilterTableMap = new Map([
            ["저값개수", this.dataSet[currentVar]["lowCount"]],
            ["번호합계", this.dataSet[currentVar]["sum"]],
            ["홀수개수", this.dataSet[currentVar]["oddCount"]],
            ["소수개수", this.dataSet[currentVar]["primeCount"]],
            ["3배수개수", this.dataSet[currentVar]["$3Count"]],
            ["첫수 합", this.dataSet[currentVar]["sum$10"]],
            ["고저 차", this.dataSet[currentVar]["diffMaxMin"]],
            ["AC", this.dataSet[currentVar]["AC"]]
        ])
        const listFilterTableTrTitle = document.createElement('tr');
        listFilterTableMap.forEach((value, key) => {
            const td = document.createElement('td');
            td.textContent = key;
            listFilterTableTrTitle.appendChild(td);
        })
        listFilterTable.appendChild(listFilterTableTrTitle);
        const listFilterTableTrValue = document.createElement('tr');
        listFilterTableMap.forEach((value, key) => {
            const td = document.createElement('td');
            td.textContent = value;
            listFilterTableTrValue.appendChild(td);
        });
        listFilterTable.appendChild(listFilterTableTrValue);
        filterNumInfo.appendChild(listFilterTable);
        target.appendChild(filterNumInfo);
    }

    makePastFilterTable(currentVar, target) {
        const tableBox = document.createElement('div');
        tableBox.classList.add('func3-past-filter-box')

        this.makePastTable(currentVar, tableBox);
        this.makeFilterTable(currentVar, tableBox);

        target.appendChild(tableBox);
    }

    makeNumBoard() {
        numContainerBox.innerHTML = '';
        for (let i = 0; i < this.dataSet.length; i++) {
            const numContainer = document.createElement('div');
            numContainer.classList.add('func3-num-container');
            numContainer.setAttribute('data-numbers', JSON.stringify(this.dataSet[i].numbers));

            const numBoxWrapper = document.createElement('div');

            numBoxWrapper.classList.add('func3-num-box-wrapper');

            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('func3-check-box');

            checkboxContainer.append(makeInputCheckBox());

            numBoxWrapper.appendChild(checkboxContainer);

            const numBox = document.createElement('div');
            numBox.classList.add('func3-num-box');
            for (let j = 0; j < this.dataSet[i].numbers.length; j++) {
                const num = document.createElement('div');
                num.textContent = String(this.dataSet[i].numbers[j]);
                setColorLotto(this.dataSet[i].numbers[j], num);
                numBox.appendChild(num);
            }

            numBoxWrapper.appendChild(numBox);

            numContainer.appendChild(numBoxWrapper);

            this.makePastFilterTable(i, numContainer);

            numContainerBox.appendChild(numContainer);

            if (i !== 0 && (i + 1) % 5 === 0) {
                const div = document.createElement('div');
                div.classList.add('func3-num-list-boundary');
                numContainerBox.appendChild(div);
            }
        }
    }
}