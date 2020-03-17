import configure from '../../amplify/configure'
import { signUp, confirmSignUp, headerSign } from "../../amplify/auth";
import CheckBoxToggle from "../../system/premium/instanceBtns/CheckBoxToggle";

configure();
headerSign();

const termsUseAllCheck = document.querySelector<HTMLInputElement>('#all-check');
const termsUseCheckboxes = document.querySelectorAll<HTMLInputElement>('.terms-use-check');
const termUseBtn = document.querySelector('.terms-use-btn');

init();

function init() {
    const checkBoxToggle = new CheckBoxToggle();
    checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input'));
    checkBoxToggle.addEvent();

    termUseBtn.addEventListener('click', termUseSubmit);

}

function termUseSubmit() {

    const isAllCheck = Array.from(termsUseCheckboxes).every((node) => {
        return node.checked === true;
    })

    if (termsUseAllCheck.checked || isAllCheck) {
        alert('통과');
    } else {
        alert('메롱');
    }

}
