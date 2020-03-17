// import { invalidPhoneMidValue, invalidPhoneEndValue } from './signUp';

const nickname = document.querySelector('#nickname');
const nicknameUpdateBtn = document.querySelector('#nickname-update');
const phoneMid = document.querySelector('#phone-number-mid');
const phoneEnd = document.querySelector('#phone-number-end');
const phoneUpdateBtn = document.querySelector('#phone-update');
const email = document.querySelector('#email');
const emailUpdateBtn = document.querySelector('#email-update');

init();

function init() {


    nicknameUpdateBtn.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    phoneUpdateBtn.addEventListener('submit', () => {

    })

    emailUpdateBtn.addEventListener('submit', () => {

    })

    // phoneMid.addEventListener('invalid', invalidPhoneMidValue);
    // phoneMid.addEventListener('input', invalidPhoneMidValue);

    // phoneEnd.addEventListener('invalid', invalidPhoneEndValue);
    // phoneEnd.addEventListener('input', invalidPhoneEndValue);
}
