import configure from '../amplify/configure'
import { signIn } from '../amplify/auth'

import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();
login();

export function login(){

const userNameInput = document.querySelector<HTMLInputElement>('#username');
const passwordInput = document.querySelector<HTMLInputElement>('#password');

document.getElementById('login-btn').onclick = async () => {
    const userName = userNameInput.value;
    const password = passwordInput.value;
    await signIn(userName, password);
}

passwordInput.addEventListener('keypress',(e)=>{
    if(e.keyCode===13){
    const userName = userNameInput.value;
    const password = passwordInput.value;
    signIn(userName, password);
    }
})

}