export function invalidPassword(password: HTMLInputElement) {
    return function () {
        if (password.value.search(new RegExp(password.getAttribute('pattern'))) === -1) {
            password.setCustomValidity(`8자리이상 문자+숫자로 입력해주세요`);
        } else {
            password.setCustomValidity(``);
        }
        return true;
    }
}
export function invalidPasswordCheck(password: HTMLInputElement, passwordCheck: HTMLInputElement) {
    return function () {
        if (password.value !== passwordCheck.value) {
            passwordCheck.setCustomValidity('비밀번호와 비밀번호 확인이 서로 다릅니다');
        } else {
            passwordCheck.setCustomValidity('');
        }
        return true;
    }
}