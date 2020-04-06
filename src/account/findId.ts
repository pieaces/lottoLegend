import configure from "../amplify/configure";

import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();

const phoneFirst = document.querySelector<HTMLInputElement>('#phone-number-first');
const phoneMid = document.querySelector<HTMLInputElement>('#phone-number-mid');
const phoneLast = document.querySelector<HTMLInputElement>('#phone-number-last');
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    location.href = '/account/resultId.html?phone=' + phoneFirst.value + phoneMid.value + phoneLast.value;
});