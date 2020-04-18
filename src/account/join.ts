import configure from '../amplify/configure'
import { signUp } from "../amplify/auth";
import Swal from 'sweetalert2';
import { invalidPassword, invalidPasswordCheck } from './functions';
import { makeLoading, removeLoading } from '../functions';

configure();

const signUpForm = document.querySelector('.signUp-form');
const id = document.querySelector<HTMLInputElement>('#id');
const nickname = document.querySelector<HTMLInputElement>('#nickname');
const password = document.querySelector<HTMLInputElement>('#password');
const passwordCheck = document.querySelector<HTMLInputElement>('#password-check');

id.addEventListener('invalid', invalidId);
id.addEventListener('input', invalidId);
nickname.addEventListener('invalid', invalidNickname);
nickname.addEventListener('input', invalidNickname);
password.addEventListener('invalid', invalidPassword(password));
password.addEventListener('input', invalidPassword(password));
passwordCheck.addEventListener('invalid', invalidPasswordCheck(password,passwordCheck));
passwordCheck.addEventListener('input', invalidPasswordCheck(password,passwordCheck));

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //'+82'.concat(phoneMidInput.value.slice(1));
    makeLoading();
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

    removeLoading();
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