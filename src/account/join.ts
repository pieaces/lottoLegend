import configure from '../amplify/configure'
import { signUp, headerSign } from "../amplify/auth";
import Swal from 'sweetalert2';
import { getUnAuthAPI, postUnAuthAPI } from '../amplify/api';
import { networkAlert } from '../functions';

configure();
headerSign();

const signUpBtn = document.getElementById('signUp');
const id = document.querySelector<HTMLInputElement>('#id');
const nickname = document.querySelector<HTMLInputElement>('#nickname');
const password = document.querySelector<HTMLInputElement>('#password');
const passwordCheck = document.querySelector<HTMLInputElement>('#password-check');
const loading = document.querySelector('.loading-box');

password.addEventListener('invalid', invalidPassword);
password.addEventListener('input', invalidPassword);
passwordCheck.addEventListener('invalid', invalidPasswordCheck);
passwordCheck.addEventListener('input', invalidPasswordCheck);

signUpBtn.addEventListener('click', async () => {
    //'+82'.concat(phoneMidInput.value.slice(1));
    loading.classList.remove('none');

    const result = await signUp(id.value, password.value, nickname.value);
    console.log(result);
    if (result.user) {
        Swal.fire({
            title: '완료',
            text: '찾아주셔서 감사합니다',
            icon: 'success',
            allowOutsideClick: false,
            //timer: 1500,
        }).then(() => {
            location.href = '/account/signIn.html';
        });

    } else {
        if (result.code === "UserLambdaValidationException") {
            Swal.fire({
                title: result.message.slice(result.message.indexOf('error') + 6),
                icon: 'error'
            });
        } else {
            Swal.fire({
                title: result.message,
                icon: 'error'
            });
        }
    }

    loading.classList.add('none');

});

function invalidPassword() {
    if (password.value.search(new RegExp(password.getAttribute('pattern'))) === -1) {
        password.setCustomValidity(`8자리이상 문자+숫자로 입력해주세요`);
    } else {
        password.setCustomValidity(``);
    }
    return true;
}
function invalidPasswordCheck() {
    if (password.value !== passwordCheck.value) {
        passwordCheck.setCustomValidity('비밀번호와 비밀번호 확인이 서로 다릅니다');
    } else {
        passwordCheck.setCustomValidity('');
    }
    return true;
}

