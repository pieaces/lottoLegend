// const idEl = document.querySelector('#id');
// const password = document.querySelector('#password');
// const passwordCheck = document.querySelector('#password-check');
// const send = document.querySelector('#send');
// const update = document.querySelector('#update');
// const verify = document.querySelector('#verify');
// const findFormPw = document.querySelector('#find-form-pw');
// const findFormId = document.querySelector('#find-form-id');
// const fidnFormPhone = document.querySelector('#find-form-phone');

import { getQueryStringObject } from "../functions";
import { getUnAuthAPI } from "../amplify/api";
import configure from "../amplify/configure";
import Swal from "sweetalert2";

import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();
const phone = '+82' + getQueryStringObject().phone.slice(1);
getUnAuthAPI('/account', { phone }).then(users => {
    if(users.length>0) makeIdList(users);
    else Swal.fire({
        title:'존재하지 않음',
        text:'인증완료되지 않았거나, 존재하지 않는 휴대폰번호입니다',
        icon:'info'
    })
});
const idListEl = document.querySelector<HTMLElement>('#find-id-result-container');

function makeIdList(ids: string[]) {
    ids.forEach(id => {
        const idBox = document.createElement('li');
        idBox.classList.add('find-id-result-box');
        idBox.textContent = id;
        idListEl.appendChild(idBox);
    })
}