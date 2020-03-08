const inputbox = document.querySelectorAll<HTMLInputElement>('.input-checkbox-container> input');

export default class CheckBoxToggle {

    static init() {
        inputbox.forEach((node) => {
            node.addEventListener('click', () => {
                const checkTextBox = node.parentNode.children[1] as HTMLElement;
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
        })

    }

}