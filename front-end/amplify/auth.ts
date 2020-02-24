import Auth from '@aws-amplify/auth'

async function getUserName(){
    return await Auth.currentSession()
    .then(session => session.getIdToken())
    .then(idToken => idToken.payload['cognito:username']);
}
async function signIn(username: string, password: string) {
    await Auth.signIn({
        username, // Required, the username
        password, // Optional, the password
    }).then(user => console.log(user))
        .catch(err => console.log(err));
}

async function signOut() {
    await Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
async function signUp(username: string, phone: string, password: string, nickname: string) {
    await Auth.signUp({
        username,
        password,
        attributes: {
            phone_number: phone,
            nickname
        },
    })
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

async function confirmSignUp(username: string, code: string) {
    await Auth.confirmSignUp(username, code)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

async function resendSignUp(username: string) {
    await Auth.resendSignUp(username).then(() => {
        console.log('code resent successfully');
    });
}

async function anyfunction() {
    try {
        const tokens = await Auth.currentSession();
        const idToken = tokens.getIdToken().getJwtToken();
        return idToken;
    } catch (err) {
        console.log(err);
    }
}
export { signIn, signOut, signUp, confirmSignUp, resendSignUp, anyfunction, getUserName };