import Layout3 from './functional/Layout/Layout3'

const numContainer = document.querySelector('.mypage-num-container');
const numResultTotal = document.querySelector('#mypage-num-result-total');
const numResultValue = document.querySelector('#mypage-num-result-value');
const numResultPercent = document.querySelector('#mypage-num-result-value-percent');

numResultTotal.textContent = ` ${15}`;
numResultValue.textContent = ` ${2}`;
numResultPercent.textContent = "90";

function makeTable(dataSet: { numbers: number[] }[]) {
    for (let i = 0; i < dataSet.length; i++) {
        const numBox = document.querySelector('.mypage-num-box');
        numBox.classList.add('mypage-num-box');
        for (let j = 0; j < dataSet[i].numbers.length; j++) {
            const num = document.createElement('div');
            num.textContent = dataSet[i].numbers[j].toString();
            Layout3.setColorLotto(dataSet[i].numbers[j], num);
            numBox.appendChild(num);
        }
        numContainer.appendChild(numBox);
    }
}