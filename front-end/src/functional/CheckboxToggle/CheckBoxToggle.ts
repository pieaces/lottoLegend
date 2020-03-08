const inputbox = document.querySelectorAll<HTMLInputElement>('.input-box> input');

export default class CheckBoxToggle {

    static init() {
        inputbox.forEach((node) => {
            console.log(node);
            node.addEventListener('click', () => {
                if (node.checked) {
                    node.parentNode.children[1].children[0].classList.remove('none');
                    console.log(1);
                    console.log(node.parentNode.children[1].children[0]);
                } else {
                    node.parentNode.children[1].children[0].classList.add('none');

                }
            })
        });
    }

}