import configure from '../amplify/configure'
import { signUp, headerSign } from "../amplify/auth";
import Swal from 'sweetalert2';

configure();
headerSign();

const signUpForm = document.querySelector('.signup-form');
const id = document.querySelector<HTMLInputElement>('#id');
const nickname = document.querySelector<HTMLInputElement>('#nickname');
const password = document.querySelector<HTMLInputElement>('#password');
const passwordCheck = document.querySelector<HTMLInputElement>('#password-check');

password.addEventListener('invalid', invalidPassword);
password.addEventListener('input', invalidPassword);
passwordCheck.addEventListener('invalid', invalidPasswordCheck);
passwordCheck.addEventListener('input', invalidPasswordCheck);

signUpForm.addEventListener('submit', async () => {
    //'+82'.concat(phoneMidInput.value.slice(1))
    const result: any = await signUp(id.value, password.value, nickname.value);
    if (result.code === "UsernameExistsException") {
        Swal.fire({
            title:'중복',
            text:'이미 존재하는 아이디입니다',
            icon:'error'
        })
    } else if (result.user) {
        location.href= '/account/signIn.html';
    }
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

