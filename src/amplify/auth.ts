import Auth from '@aws-amplify/auth'
import { onlyUserAlert, networkAlert } from '../functions';

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

export async function signOut() {
    await Auth.signOut()
        .then(() => location.href = "/")
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