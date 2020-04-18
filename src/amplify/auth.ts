import Auth from '@aws-amplify/auth'
import { onlyUserAlert, networkAlert, makeLoading, removeLoading } from '../functions';
import Swal from 'sweetalert2';

export function headerSign() {
    Auth.currentAuthenticatedUser()
        .then((user) => {
            document.getElementById('header-mypage').classList.remove('none');
            document.getElementById('nickName').textContent = user.attributes.nickname;
            const signOutBtn = document.getElementById('header-signout');
            signOutBtn.addEventListener('click', signOut);
        })
        .catch(() => {
            document.getElementById('header-signin').classList.remove('none');
            document.getElementById('header-signup').classList.remove('none');
        });
}

export async function getUserName():Promise<string> {
    return await Auth.currentAuthenticatedUser()
        .then(user => user.username)
}
export async function getNickName() {
    return await Auth.currentAuthenticatedUser()
        .then(user => user.attributes.nickname);
}
export async function signIn(username: string, password: string) {
    if (username === '' || password === '') {
        return Swal.fire({
            title: '알림',
            text: '아이디, 비밀번호는 공백일 수 없습니다.',
            icon: 'info'
        });
    }
    makeLoading();
    await Auth.signIn({
        username,
        password,
    }).then(async () => {        
        if(location.href.indexOf('main.html') !== -1 || document.referrer.indexOf('account')) location.href = "/myPage/home.html";
        else history.back();
    }).catch(err => {
            if (err.message.indexOf('exceeded') !== -1) {
                Swal.fire({
                    title: '알림',
                    text: '5회 이상 잘못입력하였습니다. 잠시후 다시 시도해주세요',
                    icon: 'info'
                });
            } else if(err.code === "NotAuthorizedException") {
                Swal.fire({
                    title: '알림',
                    text: '아이디 또는 비밀번호가 틀렸습니다',
                    icon: 'info'
                });
            }else networkAlert();
        }).finally(() => removeLoading());
}

export async function signOut() {
    await Auth.signOut()
        .then(() => location.href = "/main.html")
        .catch(() => networkAlert());
}
export async function signUp(username: string, password: string, nickname: string) {
    return await Auth.signUp({
        username,
        password,
        attributes: {
            //phone_number: phone,
            nickname
        },
    })
        .catch(err => err);
}

export async function confirmSignUp(username: string, code: string) {
    return await Auth.confirmSignUp(username, code)
        .then(data => data)
        .catch(err => err);
}

export async function resendSignUp(username: string) {
    await Auth.resendSignUp(username).then(() => {
    });
}

export async function getIdToken() {
    try {
        const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
        return idToken;
    } catch (err) {
        return onlyUserAlert();
    }
}

export async function isLogedIn() {
    try {
        await Auth.currentAuthenticatedUser();
        return true;
    } catch (err) {
        return false;
    }
}