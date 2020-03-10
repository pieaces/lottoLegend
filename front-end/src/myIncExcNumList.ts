import configure from './amplify/configure'
import Layout3 from './functional/Layout/Layout3'
import { getAuthAPI } from './amplify/api';
configure();
const numContainer = document.querySelector('.mypage-num-container');
const numResultTotal = document.querySelector('#mypage-num-result-total');
const numResultValue = document.querySelector('#mypage-num-result-value');
const numResultPercent = document.querySelector('#mypage-num-result-value-percent');
const resultBox = document.querySelector('.mypage-num-result-box');

const loading = document.querySelector('.loading-box');
loading.classList.remove('none');
const choice = document.getElementById('wrapper').getAttribute('data-choice');
init();
loading.classList.add('none');

async function init(){
    const data = await getAuthAPI('/numbers/piece', {choice});
    console.log(data);
    makePage(data);
}
function makePage(data: { numbers: number[], answer?: number }) {
    const I = Math.ceil(data.numbers.length/5);
    for (let i = 0; i < I; i++) {
        const numBox = document.createElement('div');
        numBox.classList.add('mypage-num-box');
        for (let j = 0; j < 5; j++) {
            if(!data.numbers[I*i+j]) break;
            const num = document.createElement('div');
            num.textContent = data.numbers[I*i+j].toString();
            Layout3.setColorLotto(data.numbers[I*i+j], num);
            numBox.appendChild(num);
        }
        numContainer.appendChild(numBox);
    }
    numResultTotal.textContent = data.numbers.length.toString();
    if (data.answer) {
        resultBox.classList.remove('none');
        numResultValue.textContent = data.answer.toString();
        numResultPercent.textContent = (data.answer / data.numbers.length).toFixed(2);
    }else{
        resultBox.classList.add('none');
    }
}