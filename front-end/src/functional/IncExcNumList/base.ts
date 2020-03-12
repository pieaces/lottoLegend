import Layout3 from '../Layout/Layout3';

export default class IncExcNumList {
    dataSet: any;
    choice: any;
    elmentObj: any;
    constructor(dataBox: any, choice: any, elementObj: any) {
        this.dataSet = dataBox;
        this.choice = choice;
        this.elmentObj = elementObj;
    }

    private whatCount(numbers: number[], answer: number[]) {
        let count = 0;

        numbers.forEach(num => {
            if (this.choice === 'Include') {
                if (answer.indexOf(num) !== -1) count++;
            } else if (this.choice === 'Exclude') {
                if (answer.indexOf(num) === -1) count++;
            }
        });
        return count;
    }

    makePage() {
        const { numContainer, resultTotal, resultValue, resultPercent, resultBox } = this.elmentObj;
        numContainer.innerHTML = '';
        const DIVIDE = 5;
        const I = Math.ceil(this.dataSet.numbers.length / DIVIDE);
        for (let i = 0; i < I; i++) {
            const numBox = document.createElement('div');
            numBox.classList.add('mypage-num-box');
            for (let j = 0; j < DIVIDE; j++) {
                if (!this.dataSet.numbers[DIVIDE * i + j]) break;
                const num = document.createElement('div');
                num.textContent = this.dataSet.numbers[DIVIDE * i + j].toString();
                Layout3.setColorLotto(this.dataSet.numbers[DIVIDE * i + j], num);
                numBox.appendChild(num);
            }
            numContainer.appendChild(numBox);
        }
        resultTotal.textContent = this.dataSet.numbers.length.toString();
        if (this.dataSet.answer) {
            const numCount = this.whatCount(this.dataSet.numbers, this.dataSet.answer);
            resultBox.classList.remove('none');
            resultValue.textContent = numCount.toString();
            resultPercent.textContent = (numCount / this.dataSet.numbers.length * 100).toFixed(2);
        } else {
            resultBox.classList.add('none');
        }
    }
}

