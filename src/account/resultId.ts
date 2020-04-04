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

configure();
const phone = '+82' + getQueryStringObject().phone.slice(1);
getUnAuthAPI('/account', { phone }).then(users => makeIdList(users));
const idListEl = document.querySelector<HTMLElement>('#find-id-result-container');

function makeIdList(ids: string[]) {
    ids.forEach(id => {
        const idBox = document.createElement('li');
        idBox.classList.add('find-id-result-box');
        idBox.textContent = id;
        idListEl.appendChild(idBox);
    })
}