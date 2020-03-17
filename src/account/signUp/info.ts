import configure from '../../amplify/configure'
import { signUp, confirmSignUp, headerSign } from "../../amplify/auth";

configure();
headerSign();

const signUpForm = document.querySelector('.signup-form');
const id = document.querySelector<HTMLInputElement>('#id');
const nickname = document.querySelector<HTMLInputElement>('#nickname');
const password = document.querySelector<HTMLInputElement>('#password');
const passwordCheck = document.querySelector<HTMLInputElement>('#password-check');

init();

function init() {

    password.addEventListener('invalid', invalidPassword);
    password.addEventListener('input', invalidPassword);

    passwordCheck.addEventListener('invalid', invalidPasswordCheck);
    passwordCheck.addEventListener('input', invalidPasswordCheck);


    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const result: any = await signUp(id.value, '+82'.concat(phoneMidInput.value.slice(1)), password.value, nickname.value);
        console.log(result);
        if (result.code === "UsernameExistsException") {
            console.log('이미 존재하는 아이디')
        } else if (result.user) {
            console.log('인증번호 전송');
        }

    });

}

function invalidPassword() {

    if (password.value.search(new RegExp(password.getAttribute('pattern'))) === -1) {
        password.setCustomValidity(` 8~12자리 한글 또는 영어(소문자)+숫자로 입력해주세요`);
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

