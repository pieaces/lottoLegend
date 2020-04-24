import 'whatwg-fetch'
import 'core-js/stable/array/includes'
import Swal from "sweetalert2";
import { networkAlert } from "../functions";
import Auth from "@aws-amplify/auth";

export default async function signIn(username: string, password: string) {
    if (username === '' || password === '') {
        return Swal.fire({
            title: '알림',
            text: '아이디, 비밀번호는 공백일 수 없습니다.',
            icon: 'info'
        });
    }
    await Auth.signIn({
        username,
        password,
    }).then(async () => {
        if (document.referrer.indexOf('account') !== -1) location.href = "/myPage/home.html";
        else if (document.referrer.indexOf('lottoend') !== -1) location.href = "/"
        else history.back();
    }).catch(err => {
        if (err.message.indexOf('exceeded') !== -1) {
            Swal.fire({
                title: '알림',
                text: '5회 이상 잘못입력하였습니다. 잠시후 다시 시도해주세요',
                icon: 'info'
            });
        } else if (err.code === "NotAuthorizedException") {
            Swal.fire({
                title: '알림',
                text: '아이디 또는 비밀번호가 틀렸습니다',
                icon: 'info'
            });
        } else networkAlert();
    })
}