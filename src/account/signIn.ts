import configure from '../amplify/configure'
import { signIn } from '../amplify/auth'

import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();

const loginBtn = document.getElementById('login-btn');

const userNameInput = document.querySelector<HTMLInputElement>('#userName');
const passwordInput = document.querySelector<HTMLInputElement>('#password');

loginBtn.onclick = async () => {
    const userName = userNameInput.value;
    const password = passwordInput.value;
    await signIn(userName, password);
}
