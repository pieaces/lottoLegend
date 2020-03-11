import configure from './amplify/configure'
import Layout3 from './functional/Layout/Layout3'
import { getAuthAPI } from './amplify/api';

configure();
const numContainer = document.querySelector('.mypage-num-container');
const numResultTotal = document.querySelector('#mypage-num-result-total');
const numResultValue = document.querySelector('#mypage-num-result-value');
const numResultPercent = document.querySelector('#mypage-num-result-value-percent');
const resultBox = document.querySelector('.mypage-num-result-box');
const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-select-box');
const roundText = document.querySelector('#round-text');
const winNumBox = document.querySelectorAll<HTMLElement>('.win-num-box > div');
const winNumDate = document.querySelector('#win-date');



const loading = document.querySelector('.loading-box');

const choice = document.getElementById('wrapper').getAttribute('data-choice');
init();

async function init() {
    loading.classList.remove('none');
    const data = await getAuthAPI('/numbers/piece', { choice });
    console.log(data);
    makePage(data);
    makeSelectBox(data.rounds);

    // 당첨번호 데이터 입력
    // const winNum = [1, 2, 3, 4, 5, 6]; //당첨번호배열
    // const roundNum = 900; //회차
    // const roundDate = "2020-03-07";

    // roundText.textContent = roundNum.toString();
    // winNumDate.textContent = roundDate;
    // winNumBox.forEach((node, index) => {
    //     node.textContent = winNum[index].toString();
    //     Layout3.setColorLotto(winNum[index], node);
    // })


}

roundSelectBox.addEventListener('change', async () => {
    loading.classList.remove('none');
    const data = await getAuthAPI('/numbers/piece', { choice, round: roundSelectBox.options[roundSelectBox.options.selectedIndex].value });
    makePage(data);
    loading.classList.add('none');
});

loading.classList.add('none');

}
function makePage(data: { numbers: number[], answer?: number[] }) {
    numContainer.innerHTML = '';
    const DIVIDE = 5;
    const I = Math.ceil(data.numbers.length / DIVIDE);
    for (let i = 0; i < I; i++) {
        const numBox = document.createElement('div');
        numBox.classList.add('mypage-num-box');
        for (let j = 0; j < DIVIDE; j++) {
            if (!data.numbers[DIVIDE * i + j]) break;
            const num = document.createElement('div');
            num.textContent = data.numbers[DIVIDE * i + j].toString();
            Layout3.setColorLotto(data.numbers[DIVIDE * i + j], num);
            numBox.appendChild(num);
        }
        numContainer.appendChild(numBox);
        numContainer.classList.add('box-color');
    }
    numResultTotal.textContent = data.numbers.length.toString();
    if (data.answer) {
        const numCount = whatCount(data.numbers, data.answer);
        resultBox.classList.remove('none');
        numResultValue.textContent = numCount.toString();
        numResultPercent.textContent = (numCount / data.numbers.length * 100).toFixed(2);
    } else {
        resultBox.classList.add('none');
    }
}

function makeSelectBox(rounds: string[]) {
    for (let i = 0; i < rounds.length; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', rounds[i]);
        option.textContent = rounds[i];
        roundSelectBox.appendChild(option);
    }
}

function whatCount(numbers: number[], answer: number[]) {
    let count = 0;

    numbers.forEach(num => {
        if (choice === 'Include') {
            if (answer.indexOf(num) !== -1) count++;
        } else if (choice === 'Exclude') {
            if (answer.indexOf(num) === -1) count++;
        }
    });
    return count;
}