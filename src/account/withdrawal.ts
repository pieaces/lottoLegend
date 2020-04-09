import configure from "../amplify/configure";
import Auth from "@aws-amplify/auth";
import { deleteAuthAPI } from "../amplify/api";
import Swal from "sweetalert2";
import { signOut, isLogedIn } from "../amplify/auth";
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


const withdrawalForm = document.querySelector('#withdrawl-form');
const password = document.querySelector<HTMLInputElement>('#password');

withdrawalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, password.value, Math.random().toString(36).substr(2,11));
        })
        .then(async () => {
            await deleteAuthAPI('/account');
            Swal.fire({
                title: '완료',
                icon: 'success'
            }).then(() => signOut());
        }).catch(err => {
            if (err.code === "NotAuthorizedException") {
                Swal.fire({
                    title: '비밀번호가 맞지 않습니다',
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
