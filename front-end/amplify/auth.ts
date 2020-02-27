import Auth from '@aws-amplify/auth'

async function getUserName() {
    return await Auth.currentSession()
        .then(session => session.getIdToken())
        .then(idToken => idToken.payload['cognito:username']);
}
async function getNickName() {
    return await Auth.currentSession()
        .then(session => session.getIdToken())
        .then(idToken => idToken.payload.nickname);
}
async function signIn(username: string, password: string) {
    await Auth.signIn({
        username,
        password,
    }).then(user => console.log(user))
        .catch(err => console.log(err));
}

async function signOut() {
    await Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
async function signUp(username: string, phone: string, password: string, nickname: string) {
    return await Auth.signUp({
        username,
        password,
        attributes: {
            phone_number: phone,
            nickname
        },
    })
        .then(data => data)
        .catch(err => err);
}

async function confirmSignUp(username: string, code: string) {
    return await Auth.confirmSignUp(username, code)
        .then(data => data)
        .catch(err => err);
}

async function resendSignUp(username: string) {
    await Auth.resendSignUp(username).then(() => {
        console.log('code resent successfully');
    });
}

export { signIn, signOut, signUp, confirmSignUp, resendSignUp, getUserName, getNickName };