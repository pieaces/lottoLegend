const phoneNumberOption = document.querySelector('#phone-number-option');
const phoneNumberMid = document.querySelector('#phone-number-mid');
const phoneNumberEnd = document.querySelector('#phone-number-end');
const idEl = document.querySelector('#id');
const password = document.querySelector('#password');
const passwordCheck = document.querySelector('#password-check');
const send = document.querySelector('#send');
const update = document.querySelector('#update');
const verify = document.querySelector('#verify');
const findFormPw = document.querySelector('#find-form-pw');
const findFormId = document.querySelector('#find-form-id');
const fidnFormPhone = document.querySelector('#find-form-phone');
const idListEl = document.querySelector<HTMLElement>('#find-id-result-container');

function makeIdList(ids: string[]) {
    ids.forEach(id => {
        const idBox = document.createElement('li');
        idBox.classList.add('find-id-result-box');
        idBox.textContent = id;
        idListEl.appendChild(idBox);
    })
}