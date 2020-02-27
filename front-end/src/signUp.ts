import configure from '../js/amplify/configure'
import { signUp, confirmSignUp } from "../js/amplify/auth";

configure();
const signupContainerBox = document.querySelector('.signup-container-box');
const authCheckWrapper = document.querySelector('.auth-check-wrapper');
const id = document.querySelector<HTMLInputElement>('#id');
const nickname = document.querySelector<HTMLInputElement>('#nickname');
const password = document.querySelector<HTMLInputElement>('#password');
const passwordCheck = document.querySelector<HTMLInputElement>('#password-check');
const phoneNumberMid = document.querySelector<HTMLInputElement>('#phone-number-mid');
const phoneNumberEnd = document.querySelector<HTMLInputElement>('#phone-number-end');
const signupBtn = document.querySelector('#signup');
const authNum = document.querySelector<HTMLInputElement>('#auth-num');
const authCheckContainer = document.querySelector('.auth-check-container');
const authInputContainer = document.querySelector('.auth-input-container');
const authCheck = document.querySelector('#auth-check');
const alertId = document.querySelector('#alert-id');
const alertNickname = document.querySelector('#alert-nickname');
const alertPassword = document.querySelector('#alert-password');
const alertPasswordCheck = document.querySelector('#alert-password-check');
const alertPhoneNumber = document.querySelector('#alert-phone-number');
const alertAuthNumber = document.querySelector<HTMLElement>('#alert-auth-number');

function checkId() {
    if (id.value.replace(/\s/gi, "") === "") {
        id.classList.add('alert-input');
        alertId.textContent = "아이디를 입력해주세요";
        return false;
    } else {
        id.classList.remove('alert-input');
        alertId.textContent = "";
        return true;
    }
}

function checkPassword() {
    const regPassword = /^[a-z0-9]{8,12}$/;  //소문자 + 숫자 8~12
    if (!regPassword.test(password.value)) {
        password.classList.add('alert-input');
        alertPassword.textContent = "8~12자(소문자+숫자)를 입력해주세요";
        return false;
    }
    password.classList.remove('alert-input');
    alertPassword.textContent = "";
    return true;
}

function checkPasswordEqual() {
    if (password.value !== passwordCheck.value) {
        passwordCheck.classList.add('alert-input');
        alertPasswordCheck.textContent = "비밀번호와 비밀번호확인 입력값이 일치하지 않습니다";
        return false;
    }
    passwordCheck.classList.remove('alert-input');
    alertPasswordCheck.textContent = "";
    return true;
}

function checkNickname() {
    if (nickname.value.replace(/\s/gi, "") === "") {
        nickname.classList.add('alert-input');
        alertNickname.textContent = "닉네임을 입력해주세요";
        return false;
    } else {
        nickname.classList.remove('alert-input');
        alertNickname.textContent = "";
        return true;
    }
}

function checkPhoneNumber() {
    const regPhoneNumberMid = /^([0-9]{3,4})$/;
    const regPhoneNumberEnd = /^([0-9]{4})$/;
    if (regPhoneNumberMid.test(phoneNumberMid.value) && regPhoneNumberEnd.test(phoneNumberEnd.value)) {
        phoneNumberMid.classList.remove("alert-input");
        phoneNumberEnd.classList.remove("alert-input");
        alertPhoneNumber.textContent = "";
        return true;
    } else {
        phoneNumberMid.classList.add("alert-input");
        phoneNumberEnd.classList.add("alert-input");
        alertPhoneNumber.textContent = "휴대폰 번호를 입력해주세요.";
        return false;
    }
}

function checkAll() {
    if (!checkId()) {
        return false;
    } else if (!checkNickname()) {
        return false;
    } else if (!checkPassword()) {
        return false;
    } else if (!checkPasswordEqual()) {
        return false;
    } else if (!checkPhoneNumber()) {
        return false;
    } else {
        return true;
    }
}

signupBtn.addEventListener('click', async () => {
    if (checkAll()) {
        const result: any = await signUp(id.value, '+82'.concat(phoneNumberMid.value.slice(1)), password.value, nickname.value);
        console.log(result);
        if (result.code === "UsernameExistsException") {
            console.log('이미 존재하는 아이디')
        } else if (result.user) {
            console.log('인증번호 전송');
        }
        signupContainerBox.classList.add('none');
        authCheckWrapper.classList.remove('none');
    } else {
        alert('가입실패');
    }
});

authCheck.addEventListener('click', async () => {
    const result = await confirmSignUp(id.value, authNum.value);
    console.log(result);
    if (result === "SUCCESS") {
        console.log('인증성공');
    } else if (result.code === "LimitExceededException") {
        console.log('과도한 요청을 금지합니다. 잠시 기다린 후 다시 시도해주세요.')
    } else if (result.code === "CodeMismatchException") {
        console.log('인증실패');
    }
});