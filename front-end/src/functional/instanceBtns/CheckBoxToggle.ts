

export default class CheckBoxToggle {
    inputbox:HTMLCollectionOf<Element>;
    constructor() {
        this.inputbox = document.getElementsByClassName('input-checkbox-container');
    }

    addEvent() {
        Array.from(this.inputbox).forEach((node) => {
            const checkbox = node.children[0] as HTMLInputElement;
            checkbox.addEventListener('click', () => {
                const checkTextBox = node.children[1] as HTMLElement;
                const checkText = checkTextBox.children[0];
                if (checkbox.checked) {
                    checkText.classList.remove('none');
                    checkText.textContent = '✔';
                    checkTextBox.style.backgroundColor = '#22B8A5';
                } else {
                    checkText.classList.add('none');
                    checkText.textContent = '';
                    checkTextBox.style.backgroundColor = 'lightgray';
                }
            })
        });
        const allCheckBox = document.querySelector<HTMLInputElement>('#all-check');
        allCheckBox.addEventListener('click', () => {
            if (allCheckBox.checked) {
                Array.from(this.inputbox).forEach(node => {
                    (node.children[0] as HTMLInputElement).checked = true;
                    const checkTextBox = node.children[1] as HTMLElement;
                    const checkText = checkTextBox.children[0];
                    checkText.classList.remove('none');
                    checkText.textContent = '✔';
                    checkTextBox.style.backgroundColor = '#22B8A5';
                });
            } else {
                Array.from(this.inputbox).forEach(node => {
                    (node.children[0] as HTMLInputElement).checked = false;
                    const checkTextBox = node.children[1] as HTMLElement;
                    const checkText = checkTextBox.children[0];
                    checkText.classList.add('none');
                    checkText.textContent = '';
                    checkTextBox.style.backgroundColor = 'lightgray';
                });
            }
        });
    }
}