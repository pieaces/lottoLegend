
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

    static makeInputCheckBox(target) {

        const inputBoxContainer = document.createElement('div');
        inputBoxContainer.classList.add('input-checkbox-container');

        const checkBox = document.createElement('input')
        checkBox.setAttribute('type', 'checkbox');
        inputBoxContainer.appendChild(checkBox);

        const checkTextBox = document.createElement('div');
        checkTextBox.classList.add('input-checkbox-text-box');

        const checkText = document.createElement('div');
        checkText.classList.add('input-checkbox-text');
        checkText.classList.add('none');

        checkTextBox.appendChild(checkText);

        inputBoxContainer.appendChild(checkTextBox);

        target.appendChild(inputBoxContainer);
    }


    static makeLine(canvas: HTMLElement, numbers: number[]): void {
        numbers.forEach(num => {
            const divBox = document.createElement('div');
            divBox.classList.add('func3-select-num-box');

            const div = document.createElement('div');
            div.classList.add('func3-select-num');
            div.textContent = num.toString();
            Layout3.setColorLotto(num, div);

            divBox.appendChild(div);
            canvas.appendChild(divBox);
        });
    }

}