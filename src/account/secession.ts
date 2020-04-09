import configure from "../amplify/configure";
import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();

const secessionForm=document.querySelector('#secession-form');
const password=document.querySelector('#password');

secessionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
});
