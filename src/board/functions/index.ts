import { setColorLotto, setDisabledLotto, makeNoneBox } from "../../functions";

export function makeNum(canvas: HTMLElement, numbers?: number[]) {
    if (numbers) {
        for (let i = 0; i < numbers.length; i++) {
            const numBox = document.createElement('div');
            numBox.classList.add('inc-exc-num-box');

            const num = document.createElement('div');
            num.classList.add('inc-exc-select-num');
            num.textContent = numbers[i].toString();
            setColorLotto(numbers[i], num);

            numBox.appendChild(num);
            canvas.appendChild(numBox);
        }
    }
}
export function makeNumSet(param: { current?: number[], before?: number[] }, category:Category, answer?: number[]) {
    const currentBox = document.querySelector<HTMLElement>('#current');
    const beforeBox = document.querySelector<HTMLElement>('#before');

    makeNum(currentBox, param && param.current);
    if (param && param.before) {
        for (let i = 0; i < param.before.length; i++) {
            const numBox = document.createElement('div');
            numBox.classList.add('inc-exc-num-box');

            const num = document.createElement('div');
            num.classList.add('inc-exc-select-num');
            num.textContent = param.before[i].toString();
            if (category === 'include') {
                if (answer.some(item => item === param.before[i])) setColorLotto(param.before[i], num);
                else setDisabledLotto(num);
            } else if (category === 'exclude') {
                if (!answer.some(item => item === param.before[i])) setColorLotto(param.before[i], num);
                else setDisabledLotto(num);
            }

            numBox.appendChild(num);
            beforeBox.appendChild(numBox);
        }
    } else {
        beforeBox.appendChild(makeNoneBox());
    }
}

export type Affix = "list" | "post" | "read";
export type Category = "free" | "include" | "exclude" | "notice" | "qna" | "win" | "analysis" | "pro";
export function getCategoryHtml(category: Category, affix: Affix) {
    return `board/${category}/${affix}.html`;
}