const numContainerBox = document.querySelector('.func3-num-container-box');
export default class Layout3 {
    static setColorLotto(num: number, Box: HTMLElement) {
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

    static makeNumBoard(dataSet: { numbers: number[], winner: number[] }[]) {
        numContainerBox.innerHTML = '';
        console.log(dataSet);
        for (let i = 0; i < dataSet.length; i++) {
            const numContainer = document.createElement('div');
            numContainer.classList.add('func3-num-container');
            numContainer.setAttribute('data-numbers', JSON.stringify(dataSet[i].numbers));

            const numBoxWrapper = document.createElement('div');

            numBoxWrapper.classList.add('func3-num-box-wrapper');

            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('func3-check-box');

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

            checkboxContainer.appendChild(inputBoxContainer);

            numBoxWrapper.appendChild(checkboxContainer);

            const numBox = document.createElement('div');
            numBox.classList.add('func3-num-box');
            for (let j = 0; j < dataSet[i].numbers.length; j++) {
                const num = document.createElement('div');
                num.textContent = String(dataSet[i].numbers[j]);
                Layout3.setColorLotto(dataSet[i].numbers[j], num);
                numBox.appendChild(num);
            }

            numBoxWrapper.appendChild(numBox);

            numContainer.appendChild(numBoxWrapper);

            const tableBox = document.createElement('div');
            tableBox.classList.add('func3-past-filter-box')

            const pastWinBox = document.createElement('div');
            pastWinBox.classList.add('func3-past-win-box');
            const pastWinTable = document.createElement('table');
            pastWinTable.classList.add('table', 'func3-past-win-table');
            const pastWinTableTr = document.createElement('tr');

            const pastWinTableTdFirst = document.createElement('td');
            pastWinTableTdFirst.textContent = "역대기록";

            pastWinTableTr.appendChild(pastWinTableTdFirst);

            for (let j = 0; j < dataSet[i].winner.length; j++) {
                const td = document.createElement('td');
                td.textContent = `${j + 1}등 : ${dataSet[i].winner[j]}`;
                if (dataSet[i].winner[j] === 0) {
                    td.style.color = "#a0a0a0";
                }
                pastWinTableTr.appendChild(td);
            }

            pastWinTable.appendChild(pastWinTableTr);
            pastWinBox.appendChild(pastWinTable);

            tableBox.appendChild(pastWinBox);

            const filterNumInfo = document.createElement('div');
            filterNumInfo.classList.add('func3-filter-num-info');

            const listFilterTable = document.createElement('table');

            listFilterTable.classList.add('table', 'func3-list-filter-table');


            const listFilterTableMap = new Map([
                ["저값개수", dataSet[i]["lowCount"]],
                ["번호합계", dataSet[i]["sum"]],
                ["홀수개수", dataSet[i]["oddCount"]],
                ["소수개수", dataSet[i]["primeCount"]],
                ["3배수개수", dataSet[i]["$3Count"]],
                ["첫수 합", dataSet[i]["sum$10"]],
                ["고저 차", dataSet[i]["diffMaxMin"]],
                ["AC", dataSet[i]["AC"]]
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
            })

            listFilterTable.appendChild(listFilterTableTrValue);

            filterNumInfo.appendChild(listFilterTable);

            tableBox.appendChild(filterNumInfo);
            numContainer.appendChild(tableBox);

            numContainerBox.appendChild(numContainer);

            if (i !== 0 && (i + 1) % 5 === 0) {
                const div = document.createElement('div');
                div.classList.add('func3-num-list-boundary');
                numContainerBox.appendChild(div);
            }
        }
    }
    static makeLine(canvas: HTMLElement, numbers: number[]): void {
        numbers.forEach(num => {
            const divBox = document.createElement('div');
            divBox.classList.add('func3-select-num-box');

            const div = document.createElement('div');
            div.classList.add('func3-select-num');
            div.textContent = num.toString();
            Layout3.setColorLotto(num, div);

            divBox.appendChild(div);
            canvas.appendChild(divBox);
        });
    }

}