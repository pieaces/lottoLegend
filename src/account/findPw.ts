// const idEl = document.querySelector('#id');
// const password = document.querySelector('#password');
// const passwordCheck = document.querySelector('#password-check');
// const send = document.querySelector('#send');
// const update = document.querySelector('#update');
// const verify = document.querySelector('#verify');
// const findFormPw = document.querySelector('#find-form-pw');
// const findFormId = document.querySelector('#find-form-id');
// const fidnFormPhone = document.querySelector('#find-form-phone');


import configure from "../amplify/configure";
import Auth from "@aws-amplify/auth";
import Swal from "sweetalert2";
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
        .then(data => {
            idForm.classList.add('none');
            codeForm.classList.remove('none');
        })
        .catch(err => console.log(err));
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