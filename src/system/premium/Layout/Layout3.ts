import { setColorLotto } from "../../../functions";

export default class Layout3 {
    static makeLine(canvas: HTMLElement, numbers: number[]): void {
        let current = null;
        let flag = false;
        numbers.forEach((num, index) => {
            const divBox = document.createElement('div');
            divBox.classList.add('func3-select-num-box');

            const div = document.createElement('div');
            div.classList.add('func3-select-num');
            div.textContent = num.toString();
            div.addEventListener('click', () => {
                flag = !flag;
                current = num;
            })
            setColorLotto(num, div);

            divBox.appendChild(div);
            canvas.appendChild(divBox);
        });
    }
}