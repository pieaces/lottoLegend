// import Layout3 from './functional/Layout/Layout3'
// import CheckBoxToggle from './functional/CheckboxToggle/CheckBoxToggle';
// const numToggleBtn = document.querySelector('.mypage-table-num-toggle');
// const pastWinBox = document.querySelector('.func3-past-win-table');
// const filterNumInfo = document.querySelector('.func3-list-filter-table');
// const tableBody = document.querySelector('.mypage-table-num >tbody');


// function makeTable(dataSet: { numbers: number[], winner: number[] }[]) {

//     for (let i = 0; i < dataSet.length; i++) {
//         const tr = document.createElement('tr');
//         tr.classList.add('mypage-table-num-list-box');

//         makeCheckBox(tr);

//         const numberInfoMap = new Map([
//             [0, dataSet[i]["round"]],
//             [1, dataSet[i]["date"]],
//             [2, dataSet[i]["auto"]],
//             [3, dataSet[i]["isWin"]],
//         ])

//         numberInfoMap.forEach((value, key) => {
//             if (key <= 2) {
//                 const td = document.createElement('td');
//                 td.textContent = value;
//                 tr.appendChild(td);
//             }
//         })

//         const tdNumList = document.createElement('td');
//         const numBox = document.createElement('div');
//         numBox.classList.add('mypage-table-num-list');

//         for (let j = 0; j < dataSet[i].numbers.length; j++) {
//             const num = document.createElement('div');
//             num.textContent = dataSet[i].numbers[j].toString();
//             Layout3.setColorLotto(dataSet[i].numbers[j], num);
//             numBox.appendChild(num);
//         }
//         tdNumList.appendChild(numBox);
//         tr.appendChild(tdNumList);

//         const tdWin = document.createElement('td');
//         tdWin.textContent = dataSet[i].isWin;
//         tr.appendChild(tdWin);

//         const tdNumInfo = document.createElement('td');
//         const numInfoBtn = document.createElement('button');
//         numInfoBtn.classList.add('btn', 'box-color', 'mypage-table-num-toggle');
//         numInfoBtn.textContent = "번호정보";
//         tr.appendChild(tdNumInfo);

//         tableBody.appendChild(tr);

//         makePastWinTable(dataSet[i].winner);
//         makeFilterTable(dataSet, i, tableBody);

//     }

//     function makeFilterTable(dataSet: { numbers: number[], winner: number[] }[], currentVar, target) {

//         const listFilterTableMap = new Map([
//             ["저값개수", dataSet[currentVar]["lowCount"]],
//             ["번호합계", dataSet[currentVar]["sum"]],
//             ["홀수개수", dataSet[currentVar]["oddCount"]],
//             ["소수개수", dataSet[currentVar]["primeCount"]],
//             ["3배수개수", dataSet[currentVar]["$3Count"]],
//             ["첫수 합", dataSet[currentVar]["sum$10"]],
//             ["고저 차", dataSet[currentVar]["diffMaxMin"]],
//             ["AC", dataSet[currentVar]["AC"]]
//         ])

//         const filterTableBox = document.createElement('tr');
//         filterTableBox.classList.add('func3-list-filter-table-box');

//         const tdBox = document.createElement('td');
//         tdBox.setAttribute('colspan', '7');

//         const listFilterTable = document.createElement('table');

//         listFilterTable.classList.add('table', 'func3-list-filter-table');

//         const tbody = document.createElement('tbody');

//         const listFilterTableTrTitle = document.createElement('tr');

//         listFilterTableMap.forEach((value, key) => {
//             const td = document.createElement('td');
//             td.textContent = key;
//             listFilterTableTrTitle.appendChild(td);
//         })

//         tbody.appendChild(listFilterTableTrTitle);

//         const listFilterTableTrValue = document.createElement('tr');

//         listFilterTableMap.forEach((value, key) => {
//             const td = document.createElement('td');
//             td.textContent = value;
//             listFilterTableTrValue.appendChild(td);
//         })

//         tbody.appendChild(listFilterTableTrValue);

//         listFilterTable.appendChild(tbody);
//         tdBox.appendChild(listFilterTable);
//         filterTableBox.appendChild(tdBox);
//         target.appendChild(filterTableBox);
//     }

//     function makeCheckBox(tr: HTMLElement) {
//         const tdCheckBox = document.createElement('td');

//         const checkBoxContainer = document.createElement('div');
//         checkBoxContainer.classList.add('input-checkbox-container');

//         const checkBox = document.createElement('input');
//         checkBox.setAttribute('type', 'checkbox');
//         checkBoxContainer.appendChild(checkBox);

//         const checkBoxTextBox = document.createElement('div');
//         checkBoxTextBox.classList.add('input-checkbox-text-box');

//         const checkBoxText = document.createElement('div');
//         checkBoxText.classList.add('input-checkbox-text', 'none');

//         checkBoxTextBox.appendChild(checkBoxText);
//         checkBoxContainer.appendChild(checkBoxTextBox);
//         tdCheckBox.appendChild(checkBoxContainer);
//         tr.appendChild(tdCheckBox);
//     }

//     function makePastWinTable(pastWinNum: number[]) {
//         const trBox = document.createElement('tr');
//         trBox.classList.add('func3-past-win-table-box');

//         const tdBox = document.createElement('td');
//         tdBox.setAttribute('colspan', '7');

//         const table = document.createElement('table');
//         table.classList.add('table', 'func3-past-win-table');

//         const tbody = document.createElement('tbody');

//         const tr = document.createElement('tr');

//         const tdText = document.createElement('td');
//         tdText.textContent = "역대기록";

//         tr.appendChild(tdText);

//         for (let i = 0; i < pastWinNum.length; i++) {
//             const td = document.createElement('td');
//             td.textContent = pastWinNum[i].toString();
//             tr.appendChild(td);
//         }

//         tbody.appendChild(tr);
//         table.appendChild(tbody);
//         tdBox.appendChild(table);
//         trBox.appendChild(tdBox);
//         tableBody.appendChild(trBox);

//     }
// }
// 
// numToggleBtn.addEventListener('click', numToggle());

// function numToggle() {
//     let flag = false;
//     return function () {
//         if (!flag) {

//             pastWinBox.classList.remove('none');
//             filterNumInfo.classList.remove('none');
//             flag = true;
//         }
//         else {

//             pastWinBox.classList.add('none');
//             filterNumInfo.classList.add('none');
//             flag = false;
//         }
//     }
// }


// makeTable();
// CheckBoxToggle.init(); 표가 다 로드되고 실행
// CheckBoxToggle.allCheck();