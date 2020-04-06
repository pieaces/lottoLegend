import configure from "../amplify/configure";
import Auth from "@aws-amplify/auth";
import Swal from "sweetalert2";
import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();

const userName = document.querySelector<HTMLInputElement>('#userName');
const codeForm = document.getElementById('find-form-code');
const idForm = document.getElementById('find-form-id')
const code = document.querySelector<HTMLInputElement>('#code');
const password = document.querySelector<HTMLInputElement>('#password');
const passwordCheck = document.querySelector<HTMLInputElement>('#password-check');

idForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    Auth.forgotPassword(userName.value)
        .then(() => {
            Swal.fire({
                title:'확인 코드 전송',
                text:'인증된 휴대폰 번호로 확인 코드를 전송하였습니다',
                icon:'info'
            });
            idForm.classList.add('none');
            codeForm.classList.remove('none');
        })
        .catch(err => Swal.fire({
            title:'오류',
            icon:'warning'
        }));
});

codeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (password.value === passwordCheck.value) {
        Auth.forgotPasswordSubmit(userName.value, code.value, password.value)
            .then(data => {
                Swal.fire({
                    title: '완료',
                    icon: 'success',
                    allowOutsideClick: false,
                    timer: 1500,
                }).then(() => {
                    location.href = '/main.html';
                });
            })
            .catch(err => {
                console.log(err);
                if(err.code === "CodeMismatchException"){
                    Swal.fire({
                        title: '확인 코드가 일치하지 않습니다',
                        icon: 'warning'
                    });
                }else if(err.code === "LimitExceededException"){
                    Swal.fire({
                        title: '시도횟수가 기준을 초과하였습니다. 잠시후 다시 시도해주세요',
                        icon: 'warning'
                    });
                }
            });
    } else Swal.fire({
        title: '비밀번호가 일치하지 않습니다',
        icon: 'warning'
    });
});