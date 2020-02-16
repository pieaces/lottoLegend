
export default class QuestionBase {
    que: HTMLElement;
    modal: HTMLElement;
    cancel: HTMLElement;
    constructor(que: HTMLElement, modal: HTMLElement, cancel: HTMLElement) {
        this.que = que;
        this.modal = modal;
        this.cancel = cancel;
    }
    on() {
        this.que.addEventListener('click', () => {
            this.modal.classList.remove('none');
        })
        this.cancel.addEventListener('click', () => {
            this.modal.classList.add('none');
        })
    }
}


