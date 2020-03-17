import configure from '../amplify/configure'
import { signUp, headerSign } from "../amplify/auth";
import Swal from 'sweetalert2';
import { getUnAuthAPI, postUnAuthAPI } from '../amplify/api';
import { networkAlert } from '../functions';

configure();
headerSign();

const signUpForm = document.querySelector('.signup-form');
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
    const response = await getUnAuthAPI('/accounts', { nickName: nickname.value });
    loading.classList.add('none');
    if (response.error) {
        Swal.fire({
            title: '중복',
            text: response.message,
            icon: 'error'
        });
    } else {
        const result: any = await signUp(id.value, password.value, nickname.value);
        if (result.code === "UsernameExistsException") {
            Swal.fire({
                title: '중복',
                text: '이미 존재하는 아이디입니다',
                icon: 'error'
            });
        } else if (result.user) {
            try {
                loading.classList.remove('none');
                await postUnAuthAPI('/accounts/' + id.value, { nickName: nickname.value });
                Swal.fire({
                    title: '완료',
                    text: '찾아주셔서 감사합니다',
                    icon: 'success',
                    allowOutsideClick: false,
                    timer: 1500,
                }).then(() => {
                    location.href = '/account/signIn.html';
                });
            } catch (err) {
                networkAlert();
            } finally {
                loading.classList.add('none');
            }
        }
    }
});

function invalidId() {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/gi;
    if (id.value.length > 16) {
        id.setCustomValidity(`16자 이내로 입력해주세요`);
    } else if (id.value.search(regExp) !== -1) {
        id.setCustomValidity(`-,_를 제외한 특수문자를 입력할 수 없습니다`);
    } else {
        id.setCustomValidity(``);
    }
    return true;
}

function invalidNickname() {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/gi;
    if (nickname.value.length > 8) {
        nickname.setCustomValidity(`8자 이내로 입력해주세요`);
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
