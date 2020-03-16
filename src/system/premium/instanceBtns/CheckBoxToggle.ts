const allCheckBox = document.querySelector<HTMLInputElement>('#all-check');

export default class CheckBoxToggle {
    inputbox: NodeListOf<HTMLInputElement>;

    constructor() {
        this.inputbox = document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input');
    }

    addEvent() {
        allCheckBox.addEventListener('click', () => {
            if (allCheckBox.checked) {
                this.inputbox.forEach((node: any) => {
                    node.checked = true;
                });
            } else {
                this.inputbox.forEach((node: any) => {
                    node.checked = false;
                });
            }
        });
    }

    static allCheckedReset() {
        allCheckBox.checked = false;
    }

}