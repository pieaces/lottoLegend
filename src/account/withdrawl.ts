import configure from "../amplify/configure";
import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();

const withdrawlForm=document.querySelector('#withdrawl-form');
const password=document.querySelector('#password');

withdrawlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
});
