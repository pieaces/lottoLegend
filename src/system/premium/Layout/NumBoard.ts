import { makeInputCheckBox, makePastFilterTable, TableData } from './functions';
import { setColorLotto } from '../../../functions';

const numContainerBox = document.querySelector('.func3-num-container-box');
export default class NumBoard {
    dataSet: TableData[];
    constructor(dataSet: TableData[]) {
        this.dataSet = dataSet;
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
            numContainer.appendChild(makePastFilterTable(this.dataSet[i]));
            numContainerBox.appendChild(numContainer);
            if (i !== 0 && (i + 1) % 5 === 0) {
                const div = document.createElement('div');
                div.classList.add('num-list-boundary');
                numContainerBox.appendChild(div);
            }
        }
    }
}