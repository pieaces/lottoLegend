import configure from '../amplify/configure'
import { signUp } from "../amplify/auth";
import Swal from 'sweetalert2';

import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();

const signUpForm = document.querySelector('.signUp-form');
const id = document.querySelector<HTMLInputElement>('#id');
const nickname = document.querySelector<HTMLInputElement>('#nickname');
const password = document.querySelector<HTMLInputElement>('#password');
const passwordCheck = document.querySelector<HTMLInputElement>('#password-check');
const loading = document.querySelector('.loading-box');

id.addEventListener('invalid', invalidId);
id.addEventListener('input', invalidId);
nickname.addEventListener('invalid', invalidNickname);
nickname.addEventListener('input', invalidNickname);
password.addEventListener('invalid', invalidPassword);
password.addEventListener('input', invalidPassword);
passwordCheck.addEventListener('invalid', invalidPasswordCheck);
passwordCheck.addEventListener('input', invalidPasswordCheck);

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //'+82'.concat(phoneMidInput.value.slice(1));
    loading.classList.remove('none');

    const result = await signUp(id.value, password.value, nickname.value);
    if (result.user) {
        Swal.fire({
            title: '완료',
            text: '찾아주셔서 감사합니다',
            icon: 'success',
            allowOutsideClick: false,
            timer: 1500,
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

function invalidId() {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/gi;
    if (!(id.value.length <= 16 && id.value.length >= 4)) {
        id.setCustomValidity(`최소 4글자 최대 16자로 작성해주세요.`);
    } else if (id.value.search(regExp) !== -1) {
        id.setCustomValidity(`-,_를 제외한 특수문자를 입력할 수 없습니다`);
    } else {
        id.setCustomValidity(``);
    }
    return true;
}

function invalidNickname() {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/gi;
    if (!(nickname.value.length <= 8 && nickname.value.length >= 2)) {
        nickname.setCustomValidity(`최소 2자 최대 8자로 작성해주세요.`);
    } else if (nickname.value.search(regExp) !== -1) {
        nickname.setCustomValidity(`-,_를 제외한 특수문자를 입력할 수 없습니다`);
    } else {
        nickname.setCustomValidity(``);
    }
    return true;
}

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

