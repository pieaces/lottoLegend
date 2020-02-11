const allCheckBox = document.querySelector('.func3-all-check-box > input');
const checkBoxes = document.querySelectorAll('.func3-num-container > div >input');


allCheckBox.addEventListener('click', () => {
    if (allCheckBox.checked === true) {

        for (const node of checkBoxes) {
            node.checked = true;
        }
    } else {
        for (const node of checkBoxes) {
            node.checked = false;
        }
    }
})

