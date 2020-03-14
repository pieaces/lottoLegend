import { setColorLotto, setDefaultColor } from "../../functions";

type IncExc = "include" | "exclude";
export default class IncludeExclude {
    static answer: number[];
    numbers: number[];
    choice: IncExc;
    elmentObj: any;
    constructor(numbers: number[], choice: IncExc, elementObj: any) {
        this.numbers = numbers;
        this.choice = choice;
        this.elmentObj = elementObj;
    }
    static setAnswer(answer: number[]) {
        IncludeExclude.answer = answer;
    }
    private whatCount(numbers: number[], answer: number[]) {
        let count = 0;

        numbers.forEach(num => {
            if (this.choice === 'include') {
                if (answer.indexOf(num) !== -1) count++;
            } else if (this.choice === 'exclude') {
                if (answer.indexOf(num) === -1) count++;
            }
        });
        return count;
    }

    makePage() {
        const { numContainer, resultTotal, resultValue, resultPercent, resultBox } = this.elmentObj;

        numContainer.innerHTML = '';
        if (this.numbers) {
            console.log(this.numbers);
            const DIVIDE = 5;
            const I = Math.ceil(this.numbers.length / DIVIDE);
            for (let i = 0; i < I; i++) {
                const numBox = document.createElement('div');
                numBox.classList.add('mypage-num-box');
                for (let j = 0; j < DIVIDE; j++) {
                    if (!this.numbers[DIVIDE * i + j]) break;
                    const num = document.createElement('div');
                    num.textContent = this.numbers[DIVIDE * i + j].toString();
                    setColorLotto(this.numbers[DIVIDE * i + j], num);
                    numBox.appendChild(num);
                }
                numContainer.appendChild(numBox);
            }
            resultTotal.textContent = this.numbers.length.toString();
            if (IncludeExclude.answer) {
                const numCount = this.whatCount(this.numbers, IncludeExclude.answer);
                resultBox.classList.remove('none');
                resultValue.textContent = numCount.toString();
                resultPercent.textContent = (numCount / this.numbers.length * 100).toFixed(2);
                makeWinNum(IncludeExclude.answer);
            } else {
                winNumBox.forEach(node => setDefaultColor(node));
                resultBox.classList.add('none');
            }
        } else {
            resultBox.classList.add('none');
        }
    }
}

const winNumBox = document.querySelectorAll<HTMLElement>('.func2-win-num-box > div');
function makeWinNum(answer: number[]) {
    winNumBox.forEach((node, index) => {
        node.textContent = answer[index].toString();
        setColorLotto(answer[index], node);
    });
}