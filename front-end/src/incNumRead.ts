import { setColorLotto } from "./functional/Layout/functions";

const incNumContainer = document.querySelector('.inc-exc-num-container');

function makeNum(number: number[]) {
    let numBox;
    for (let i = 0; i < number.length; i++) {
        numBox = document.createElement('div');
        numBox.classList.add('inc-exc-num-box');

        const num = document.createElement('div');
        num.classList.add('inc-exc-select-num');
        setColorLotto(number[i], num);

        numBox.appendChild(num);
    }
    incNumContainer.appendChild(numBox);
}