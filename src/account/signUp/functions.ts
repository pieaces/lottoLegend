export function invalidPhoneMidValue(phoneMidInput: HTMLInputElement) {
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

export function invalidPhoneEndValue(phoneEnd: HTMLInputElement) {
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

