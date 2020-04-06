import configure from '../amplify/configure'
import { confirmSignUp } from "../amplify/auth";

import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();

const verifyCode = document.querySelector<HTMLInputElement>('#auth-num');
const authCheck = document.querySelector('#auth-check');
const phone = document.querySelector<HTMLInputElement>('phone');

authCheck.addEventListener('click', async () => {
    const result = await confirmSignUp(phone.value, verifyCode.value);
    console.log(result);
    if (result === "SUCCESS") {
        console.log('인증성공');
    } else if (result.code === "LimitExceededException") {
        console.log('과도한 요청을 금지합니다. 잠시 기다린 후 다시 시도해주세요.');
    } else if (result.code === "CodeMismatchException") {
        console.log('인증실패');
    }
});

function invalidPhoneMidValue(phoneMidInput: HTMLInputElement) {
    const regPhoneNumberMid = /^([0-9]{3,4})$/;

    if (phoneMidInput.value === '') {
        phoneMidInput.setCustomValidity('이 입력란을 작성하세요.');
    } else if (!regPhoneNumberMid.test(phoneMidInput.value)) {
        phoneMidInput.setCustomValidity('휴대폰번호 양식에 맞지 않습니다');
    } else {
        phoneMidInput.setCustomValidity('');
    }
    return true;
}

function invalidPhoneEndValue(phoneEnd: HTMLInputElement) {
    const regPhoneNumberEnd = /^([0-9]{4})$/;

    if (phoneEnd.value === '') {
        phoneEnd.setCustomValidity('이 입력란을 작성하세요.');
    } else if (!regPhoneNumberEnd.test(phoneEnd.value)) {
        phoneEnd.setCustomValidity('휴대폰번호 양식에 맞지 않습니다');
    } else {
        phoneEnd.setCustomValidity('');
    }
    return true;
}

