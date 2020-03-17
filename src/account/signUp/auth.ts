import configure from '../../amplify/configure'
import { signUp, confirmSignUp, headerSign } from "../../amplify/auth";

configure();
headerSign();

const authNum = document.querySelector<HTMLInputElement>('#auth-num');
const authCheck = document.querySelector('#auth-check');
const authAlertBox = document.querySelector<HTMLElement>('.auth-alert-box');

init();

function init() {
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
