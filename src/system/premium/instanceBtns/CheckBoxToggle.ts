

export default class CheckBoxToggle {
    inputbox: NodeListOf<HTMLInputElement>;
    allCheckBox: HTMLInputElement;
    constructor() {
        this.inputbox = document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input');
        this.allCheckBox = document.querySelector<HTMLInputElement>('#all-check');
    }

    addEvent() {
        this.allCheckBox.addEventListener('click', () => {
            if (this.allCheckBox.checked) {
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

}