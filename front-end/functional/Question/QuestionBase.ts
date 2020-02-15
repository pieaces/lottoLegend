
export default class QuestionBase {
    que: HTMLElement;
    modal: HTMLElement;
    cancel: HTMLElement;
    flag: boolean;
    constructor(que: HTMLElement, modal: HTMLElement, cancel: HTMLElement) {
        this.que = que;
        this.modal = modal;
        this.cancel = cancel;
        this.flag = true;
    }
    on() {
        this.que.addEventListener('click', () => {
            this.modal.classList.remove('none');
            this.flag = !this.flag;
        })
        this.cancel.addEventListener('click', () => {
            this.modal.classList.add('none');
            this.flag = !this.flag;
        })
    }
}


