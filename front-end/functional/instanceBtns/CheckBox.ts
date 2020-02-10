const checkBox = document.querySelectorAll<HTMLElement>('.func1-checkbox > div');

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