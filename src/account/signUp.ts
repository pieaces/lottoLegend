import configure from '../amplify/configure'
import { signUp, confirmSignUp, headerSign } from "../amplify/auth";
import CheckBoxToggle from '../system/premium/instanceBtns/CheckBoxToggle'

configure();
headerSign();

const anchorList = document.querySelectorAll<HTMLElement>('.anchor-list-container >li');
const termsUseContainer = document.querySelector<HTMLElement>('.signup-terms-use-container');
const termsUseAllCheck = document.querySelector<HTMLInputElement>('#all-check');
const termsUseCheckboxes = document.querySelectorAll<HTMLInputElement>('.terms-use-check');
const termUseBtn = document.querySelector('.terms-use-btn');
const signupContainerBox = document.querySelector('.signup-container-box');
const authCheckWrapper = document.querySelector('.auth-check-wrapper');
const id = document.querySelector<HTMLInputElement>('#id');
const nickname = document.querySelector<HTMLInputElement>('#nickname');
const password = document.querySelector<HTMLInputElement>('#password');
const passwordCheck = document.querySelector<HTMLInputElement>('#password-check');
const phoneNumberMid = document.querySelector<HTMLInputElement>('#phone-number-mid');
const phoneNumberEnd = document.querySelector<HTMLInputElement>('#phone-number-end');
const authNum = document.querySelector<HTMLInputElement>('#auth-num');
const authCheck = document.querySelector('#auth-check');
const signUpForm = document.querySelector('.signup-form');
const authAlertBox = document.querySelector<HTMLElement>('.auth-alert-box');

init();

function init() {
    const checkBoxToggle = new CheckBoxToggle();
    checkBoxToggle.addEvent();


    termUseBtn.addEventListener('click', termUseSubmit);

    password.addEventListener('invalid', invalidPassword);
    password.addEventListener('input', invalidPassword);

    passwordCheck.addEventListener('invalid', invalidPasswordCheck);
    passwordCheck.addEventListener('input', invalidPasswordCheck);

    phoneNumberMid.addEventListener('invalid', invalidPhoneNumberMid);
    phoneNumberMid.addEventListener('input', invalidPhoneNumberMid);

    phoneNumberEnd.addEventListener('invalid', invalidPhoneNumberEnd);
    phoneNumberEnd.addEventListener('input', invalidPhoneNumberEnd);

    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const result: any = await signUp(id.value, '+82'.concat(phoneNumberMid.value.slice(1)), password.value, nickname.value);
        console.log(result);
        if (result.code === "UsernameExistsException") {
            console.log('이미 존재하는 아이디')
        } else if (result.user) {
            console.log('인증번호 전송');
        }
        signupContainerBox.classList.add('none');
        authCheckWrapper.classList.remove('none');
        anchorList[1].style.backgroundColor = "white";
        anchorList[2].style.backgroundColor = "#ececec";
    });

    authCheck.addEventListener('click', async () => {
        const result = await confirmSignUp(id.value, authNum.value);
        console.log(result);
        if (result === "SUCCESS") {
            console.log('인증성공');
        } else if (result.code === "LimitExceededException") {
            console.log('과도한 요청을 금지합니다. 잠시 기다린 후 다시 시도해주세요.');
            authAlertBox.textContent = '과도한 요청을 금지합니다. 잠시 기다린 후 다시 시도해주세요.';
        } else if (result.code === "CodeMismatchException") {
            console.log('인증실패');
            authAlertBox.textContent = '인증실패';
        }
    });
}

function termUseSubmit() {
    const isAllCheck = Array.from(termsUseCheckboxes).every((node) => {
        return node.checked === true;
    })
    console.log(isAllCheck);
    if (termsUseAllCheck.checked || isAllCheck) {
        termsUseContainer.classList.add('none');
        signUpForm.classList.remove('none');
        anchorList[0].style.backgroundColor = "white";
        anchorList[1].style.backgroundColor = "#ececec";
    } else {
        alert('메롱');
    }

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

function invalidPhoneNumberMid() {
    const regPhoneNumberMid = /^([0-9]{3,4})$/;

    if (phoneNumberMid.value === '') {
        phoneNumberMid.setCustomValidity('이 입력란을 작성하세요.');
    } else if (!regPhoneNumberMid.test(phoneNumberMid.value)) {
        phoneNumberMid.setCustomValidity('휴대폰번호 양식에 맞지 않습니다');
    } else {
        phoneNumberMid.setCustomValidity('');
    }
    return true;
}

function invalidPhoneNumberEnd() {
    const regPhoneNumberEnd = /^([0-9]{4})$/;

    if (phoneNumberEnd.value === '') {
        phoneNumberEnd.setCustomValidity('이 입력란을 작성하세요.');
    } else if (!regPhoneNumberEnd.test(phoneNumberEnd.value)) {
        phoneNumberEnd.setCustomValidity('휴대폰번호 양식에 맞지 않습니다');
    } else {
        phoneNumberEnd.setCustomValidity('');
    }
    return true;
}


