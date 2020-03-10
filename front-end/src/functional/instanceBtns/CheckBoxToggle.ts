

export default class CheckBoxToggle {
    inputbox: NodeListOf<Element>;
    constructor() {
        this.inputbox = document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input');
    }

    addEvent() {
        this.inputbox.forEach((node: any) => {
            node.addEventListener('click', () => {
                const checkTextBox = node.nextElementSibling as HTMLElement;
                const checkText = checkTextBox.children[0];
                if (node.checked) {
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
                this.inputbox.forEach((node: any) => {
                    const checkTextBox = node.nextElementSibling as HTMLElement;
                    const checkText = checkTextBox.children[0];
                    checkText.classList.remove('none');
                    checkText.textContent = '✔';
                    checkTextBox.style.backgroundColor = '#22B8A5';
                    node.checked = true;
                });
            } else {
                this.inputbox.forEach((node: any) => {
                    const checkTextBox = node.nextElementSibling as HTMLElement;
                    const checkText = checkTextBox.children[0];
                    checkText.classList.add('none');
                    checkText.textContent = '';
                    checkTextBox.style.backgroundColor = 'lightgray';
                    node.checked = false;
                });
            }
        });
    }
}