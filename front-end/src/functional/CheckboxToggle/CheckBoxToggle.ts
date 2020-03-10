

export default class CheckBoxToggle {

    static init() {

        const inputbox = document.querySelectorAll<HTMLInputElement>('.input-checkbox-container>input');
        inputbox.forEach((node) => {

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

    }

    static allCheck() {
        const allCheckBox = document.querySelector<HTMLInputElement>('#all-check');
        const inputbox = document.querySelectorAll<HTMLInputElement>('.input-checkbox-container>input');
        allCheckBox.addEventListener('click', () => {
            if (allCheckBox.checked) {
                inputbox.forEach(node => {
                    const checkTextBox = node.nextElementSibling as HTMLElement;
                    const checkText = checkTextBox.children[0];
                    checkText.classList.remove('none');
                    checkText.textContent = '✔';
                    checkTextBox.style.backgroundColor = '#22B8A5';

                })
            } else {
                inputbox.forEach(node => {
                    const checkTextBox = node.nextElementSibling as HTMLElement;
                    const checkText = checkTextBox.children[0];
                    checkText.classList.add('none');
                    checkText.textContent = '';
                    checkTextBox.style.backgroundColor = 'lightgray';
                })
            }
        });

    }
}