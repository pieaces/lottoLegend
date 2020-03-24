const allCheckBox = document.querySelector<HTMLInputElement>('#all-check');

export default class CheckBoxToggle {
    private inputBoxes: HTMLInputElement[];

    setInputBoxes(inputBoxes: NodeListOf<HTMLInputElement>) {
        this.inputBoxes = Array.from(inputBoxes);
    }
    addEvent() {
        allCheckBox.addEventListener('click', () => {
            if (allCheckBox.checked) {
                this.inputBoxes.forEach((node: any) => {
                    node.checked = true;
                });
            } else {
                this.inputBoxes.forEach((node: any) => {
                    node.checked = false;
                });
            }
        });
    }

    static allCheckedReset() {
        allCheckBox.checked = false;
    }

}