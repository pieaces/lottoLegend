import configure from '../amplify/configure'
import 'core-js/stable/dom-collections/for-each'
import 'core-js/stable/array/from'
import Swal from 'sweetalert2';
configure();

const termsUseAllCheck = document.querySelector<HTMLInputElement>('#all-check');
const termsUseCheckboxes = document.querySelectorAll<HTMLInputElement>('.terms-use-check');

termsUseAllCheck.addEventListener('change', () => {
    if (termsUseAllCheck.checked) {
        termsUseCheckboxes.forEach((node: any) => {
            node.checked = true;
        });
    } else {
        termsUseCheckboxes.forEach((node: any) => {
            node.checked = false;
        });
    }
});


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