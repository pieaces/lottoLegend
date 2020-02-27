import configure from '../js/amplify/configure'
import { signIn } from '../js/amplify/auth'

configure();
const loginBtn = document.getElementById('login-btn');

const userNameInput = document.querySelector<HTMLInputElement>('#userName');
const passwordInput = document.querySelector<HTMLInputElement>('#password');

loginBtn.onclick = () => {
    const userName = userNameInput.value;
    const password = passwordInput.value;
    signIn(userName, password)
        .then(() => console.log('signIn!'))
        .catch(err => console.log(err));
}
