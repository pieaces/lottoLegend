const numContainerBox = document.querySelector('.func3-num-container-box');
export default class Layout3 {

    static makeNumBoard(dataSet: number[][]) {
        for (let i = 0; i < dataSet.length; i++) {
            const numContainer = document.createElement('div');
            numContainer.classList.add('func3-num-container');

            const numBoxWrapper = document.createElement('div');

            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('func3-check-box');

            const checkBox = document.createElement('input')
            checkBox.setAttribute('type', 'checkbox');
            checkboxContainer.appendChild(checkBox);

            numBoxWrapper.appendChild(checkboxContainer);

            const numBox = document.createElement('div');
            numBox.classList.add('func3-num-box');
            for (let j = 0; j < dataSet[i].numbers.length; j++) {
                const num = document.createElement('div');
                num.textContent = String(dataSet[i].numbers[j]);
                // setColorLotto(dataSet[i].numbers[j],num);
                numBox.appendChild(num);
            }

            numBoxWrapper.appendChild(numBox);

            numContainer.appendChild(numBoxWrapper);

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
                pastWinTableTr.appendChild(td);
            }

            pastWinTable.appendChild(pastWinTableTr);
            pastWinBox.appendChild(pastWinTable);

            numContainer.appendChild(pastWinBox);

            const filterNumInfo = document.createElement('div');
            filterNumInfo.classList.add('func3-filter-num-info');

            const listFilterTable = document.createElement('table');

            listFilterTable.classList.add('table', 'func3-list-table');


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
            numContainer.appendChild(filterNumInfo);

            numContainerBox.appendChild(numContainer);
        }
    }
}


// const allCheckBox=<HTMLInputElement>document.querySelector('#func3-all-check');
// const checkboxes=document.querySelectorAll('.func3-num-container > div > input');

// if(allCheckBox.checked){
//     checkboxes.forEach(<HTMLInputElement>(node)=>{
//         node.checked=true;
//     })

// }else{
//     checkboxes.forEach(<HTMLInputElement>(node)=>{
//         node.checked=false;
//     })
// }