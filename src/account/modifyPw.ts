import configure from "../amplify/configure";
import {mqInit,menuInfoToggle} from '../base/headerHover';
import {invalidPassword,invalidPasswordCheck} from './join';

mqInit();
menuInfoToggle();
configure();

const modifyForm=document.querySelector('#modify-form-pw');
const existingPassword=document.querySelector('#existing-password');
const newPassword=document.querySelector<HTMLInputElement>('#new-password');
const newPasswordCheck=document.querySelector<HTMLInputElement>('#new-password-check');

newPassword.addEventListener('invalid', invalidPassword(newPassword));
newPassword.addEventListener('input', invalidPassword(newPassword));
newPasswordCheck.addEventListener('invalid', invalidPasswordCheck(newPassword,newPasswordCheck));
newPasswordCheck.addEventListener('input', invalidPasswordCheck(newPassword,newPasswordCheck));

modifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
});
