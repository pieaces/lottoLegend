import configure from "../amplify/configure";
import {mqInit,menuInfoToggle} from '../base/headerHover';
import {invalidPassword,invalidPasswordCheck} from './join';

mqInit();
menuInfoToggle();
configure();

const modifyForm=document.querySelector('#modify-form-pw');
const password=document.querySelector<HTMLInputElement>('#existing-password');
const newPassword=document.querySelector<HTMLInputElement>('#new-password');

password.addEventListener('invalid', invalidPassword(password));
password.addEventListener('input', invalidPassword(password));
newPassword.addEventListener('invalid', invalidPasswordCheck(password,newPassword));
newPassword.addEventListener('input', invalidPasswordCheck(password,newPassword));

modifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
});
