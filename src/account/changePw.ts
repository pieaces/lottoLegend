import configure from "../amplify/configure";
import { invalidPassword, invalidPasswordCheck } from "./functions";
import Auth from "@aws-amplify/auth";
import Swal from "sweetalert2";
import { isLogedIn } from "../amplify/auth";
configure();
isLogedIn().then(result => {
    if (!result) {
        Swal.fire({
            title: '잘못된 접근입니다',
            icon: 'warning'
        }).then(() => location.href = "javascript:history.back();"
        )
    }
});

const modifyForm = document.querySelector('#modify-form-pw');
const oldPassword = document.querySelector<HTMLInputElement>('#old-password');
const newPassword = document.querySelector<HTMLInputElement>('#new-password');
const newPasswordCheck = document.querySelector<HTMLInputElement>('#new-password-check');

newPassword.addEventListener('invalid', invalidPassword(newPassword));
newPassword.addEventListener('input', invalidPassword(newPassword));
newPasswordCheck.addEventListener('invalid', invalidPasswordCheck(newPassword, newPasswordCheck));
newPasswordCheck.addEventListener('input', invalidPasswordCheck(newPassword, newPasswordCheck));

modifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, oldPassword.value, newPassword.value);
        })
        .then(() => Swal.fire({
            title: '완료',
            icon: 'success'
        }).then(() => location.href = '/myPage/home.html'))
        .catch(err => {
            if (err.code === "NotAuthorizedException") {
                Swal.fire({
                    title: '현재 비밀번호가 맞지 않습니다',
                    icon: 'warning'
                });
            } else if (err.code === "LimitExceededException") {
                Swal.fire({
                    title: '시도횟수가 기준을 초과하였습니다. 잠시후 다시 시도해주세요',
                    icon: 'warning'
                });
            }
        });
});
