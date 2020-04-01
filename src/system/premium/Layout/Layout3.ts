import { setColorLotto } from "../../../functions";

export default class Layout3 {
    static makeLine(canvas: HTMLElement, numbers: number[]): void {
        const numsArr: number[] = [];
        numbers.forEach((num) => {
            let flag = false;
            const divBox = document.createElement('div');
            divBox.classList.add('func3-select-num-box');
            const div = document.createElement('div');
            div.classList.add('func3-select-num');
            div.textContent = num.toString();
            div.addEventListener('click', () => {
                if (!flag) {
                    div.style.border = "5px solid #a5484c";
                    numsArr.push(num);
                } else {
                    div.style.border = "none";
                    numsArr.splice(numsArr.indexOf(num), 1);
                }
                flag = !flag;
            })
            setColorLotto(num, div);
            divBox.appendChild(div);
            canvas.appendChild(divBox);
        });
    }
}