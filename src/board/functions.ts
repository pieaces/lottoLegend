import { setColorLotto, setDisabledLotto, makeNoneBox } from "../functions";

export function makeNum(canvas: HTMLElement, numbers: number[]) {
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
export function makeNumSet(param: { current: number[], before?: number[] }, answer?: number[]) {
    const currentBox = document.querySelector<HTMLElement>('#current');
    const beforeBox = document.querySelector<HTMLElement>('#before');

    makeNum(currentBox, param.current);
    if (param.before) {
        for (let i = 0; i < param.before.length; i++) {
            const numBox = document.createElement('div');
            numBox.classList.add('inc-exc-num-box');

            const num = document.createElement('div');
            num.classList.add('inc-exc-select-num');
            num.textContent = param.before[i].toString();
            if (answer.some(item => item === param.before[i])) setColorLotto(param.before[i], num);
            else setDisabledLotto(num);

            numBox.appendChild(num);
            beforeBox.appendChild(numBox);
        }
    } else {
        beforeBox.appendChild(makeNoneBox());
    }
}
export function compressString(text:string){
    if(text.replace(/[ ,.]/g, '').length > 18) {
        let count = 0, index = 0;
        for(let i = 0; i<text.length; i++){
            if(text[i] !== ' ' && text[i] !== ',' && text[i] !== '.') {
                count++;
            }
            index++;
            if(count === 18) break;
        }
        console.log(count, index);
        return text.slice(0,index) + ' ...';
    }
    else return text;
}
export type Affix = "list" | "post" | "read";
export type Category = "free" | "include" | "exclude" | "notice" | "qna" | "win" | "analysis" | "pro";
export function getCategoryHtml(category: Category, affix: Affix) {
    return `board/${category}/${affix}.html`;
}