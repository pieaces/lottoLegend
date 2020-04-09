import configure from '../amplify/configure'
import CheckBoxToggle from "../system/premium/instanceBtns/CheckBoxToggle";
import Swal from 'sweetalert2';

configure();

const checkBoxToggle = new CheckBoxToggle();
checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input'));
checkBoxToggle.addEvent();

const termsUseAllCheck = document.querySelector<HTMLInputElement>('#all-check');
const termsUseCheckboxes = document.querySelectorAll<HTMLInputElement>('.terms-use-check');

document.querySelector('.terms-use-btn').addEventListener('click', () => {
    if (Array.from(termsUseCheckboxes).every((node) => node.checked === true)) {
        location.href = '/account/join.html';
    } else {
        Swal.fire({
            title: '알림',
            text: '이용약관에 동의해주셔야 가입가능합니다',
            icon: 'info'
        })
    }
});