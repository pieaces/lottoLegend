const checkBox = document.querySelectorAll<HTMLElement>('.func1-checkbox > div');
const reset = document.querySelector('#reset');

export default class CheckBox {
    private addEvent() {
        checkBox.forEach(node => {
            node.addEventListener('click', () => {
                if ((<HTMLInputElement>node.children[0]).checked) {
                    node.classList.add('func1-num-check-current');
                } else {
                    node.classList.remove('func1-num-check-current');
                }
            });
        });
        reset.addEventListener('click', () => {
            this.reset();
        });
    }
    reset() {
        checkBox.forEach(node => {
            node.classList.remove('func1-num-check-current');
        });
    }
    init() {
        this.addEvent();
    }
}