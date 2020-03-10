import Layout3 from './functional/Layout/Layout3'

const numContainer = document.querySelector('.mypage-num-container');
const numResultTotal = document.querySelector('#mypage-num-result-total');
const numResultValue = document.querySelector('#mypage-num-result-value');
const numResultPercent = document.querySelector('#mypage-num-result-value-percent');

function makePage(data: { numbers: number[], answer:number }) {
    for (let i = 0; i < data.numbers.length; i++) {
        const numBox = document.querySelector('.mypage-num-box');
        numBox.classList.add('mypage-num-box');
        for (let j = 0; j < data.numbers.length; j++) {
            const num = document.createElement('div');
            num.textContent = data.numbers[j].toString();
            Layout3.setColorLotto(data.numbers[j], num);
            numBox.appendChild(num);
        }
        numContainer.appendChild(numBox);
    }
    numResultTotal.textContent = data.numbers.length.toString();
    numResultValue.textContent = data.answer.toString();
    numResultPercent.textContent = (data.answer / data.numbers.length).toFixed(2);
}