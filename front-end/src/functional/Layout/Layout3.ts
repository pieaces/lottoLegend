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
        for (let i = 0; i < dataSet.length; i++) {
            const numContainer = document.createElement('div');
            numContainer.classList.add('func3-num-container');

            const numBoxWrapper = document.createElement('div');

            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('func3-check-box');

            const inputBox = document.createElement('div');
            inputBox.classList.add('input-box');

            const checkBox = document.createElement('input')
            checkBox.setAttribute('type', 'checkbox');
            inputBox.appendChild(checkBox);

            const checkText = document.createElement('div');

            inputBox.appendChild(checkText);

            checkboxContainer.appendChild(inputBox);

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

            numContainer.appendChild(pastWinBox);

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
            numContainer.appendChild(filterNumInfo);

            numContainerBox.appendChild(numContainer);
        }
    }
}


// const inputbox = document.querySelectorAll<HTMLInputElement>('.input-box> input');
// inputbox.forEach((node)=>{
//     let flag=false;
//     node.addEventListener('click',()=>{
//         if (node.checked) {
//             node.parentNode.children[1].textContent = '✔';
//             node.parentNode.children[1].style.backgroundColor = 'red';
//             flag=true;
//         }else{
//             node.parentNode.children[1].textContent = '';
//             node.parentNode.children[1].style.backgroundColor = 'lightgray';
//         }
//     })
// })
