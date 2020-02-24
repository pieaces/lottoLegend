const id = document.querySelector('#id');
const nickname = document.querySelector('#nickname');
const password = document.querySelector('#password');
const passwordCheck = document.querySelector('#password-check');
const phoneNumber = document.querySelector('#phone-number');
const signupBtn = document.querySelector('#signup');
const authSubmitBtn = document.querySelector('#auth-submit');
const authTime = document.querySelector('#auth-time');
const authNum = document.querySelector('#auth-num');
const alertId = document.querySelector('#alert-id');
const alertNickname = document.querySelector('#alert-nickname');
const alertPassword = document.querySelector('#alert-password');
const alertPasswordCheck = document.querySelector('#alert-password-check');
const alertPhoneNumber = document.querySelector('#alert-phone-number');
const alertAuthNumber = document.querySelector('#alert-auth-number');

function checkId() {
    if (id.value.replace(/\s/gi, "") === "") {
        id.classList.add('alert-input');
        alertId.textContent = "아이디를 입력해주세요";
        return false;
    } else {
        id.classList.remove('alert-input');
        alertId.textContent = "";
        return true;
    }
}

function checkPassword() {
    const regPassword = /^[a-z0-9]{8,12}$/;  //소문자 + 숫자 8~12
    if (!regPassword.test(password.value)) {
        password.classList.add('alert-input');
        alertPassword.textContent = "8~12자(소문자+숫자)를 입력해주세요";
        return false;
    }
    password.classList.remove('alert-input');
    alertPassword.textContent = "";
    return true;
}

function checkPasswordEqual() {
    if (password.value !== passwordCheck.value) {
        passwordCheck.classList.add('alert-input');
        alertPasswordCheck.textContent = "비밀번호와 비밀번호확인 입력값이 일치하지 않습니다";
        return false;
    }
    passwordCheck.classList.remove('alert-input');
    alertPasswordCheck.textContent = "";
    return true;
}

function checkNickname() {
    if (nickname.value.replace(/\s/gi, "") === "") {
        nickname.classList.add('alert-input');
        alertNickname.textContent = "닉네임을 입력해주세요";
        return false;
    } else {
        nickname.classList.remove('alert-input');
        alertNickname.textContent = "";
        return true;
    }
}

function checkPhoneNumber() {
    const regPhoneNumber = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regPhoneNumber.test(phoneNumber.value)) {
        phoneNumber.classList.add("alert-input");
        alertPhoneNumber.textContent = "예) 010-xxxx-xxxx";
        return false;
    } else {
        phoneNumber.classList.remove("alert-input");
        alertPhoneNumber.textContent = "";
        return true;
    }
}

authSubmitBtn.addEventListener('click', authSubmit());

let timerId;

function authSubmit() {

    //문자전송함수 실행
    return function () {

        clearInterval(timerId);

        authTime.innerHTML = `5:00`
        startTimer();
    };

}

function startTimer() {
    const presentTime = authTime.innerHTML;
    const timeArray = presentTime.split(/[:]+/);
    let m = timeArray[0];
    const s = checkSecond((timeArray[1] - 1));

    if (s == 59) { m = m - 1 }
    if (m < 0) {
        authTime.innerHTML =
            00 + ":" + 00;
        clearTimeout(timerId);
    } else {

    }

    authTime.innerHTML =
        m + ":" + s;
    timerId = setTimeout(startTimer, 1000);
}

function checkAuth() {
    //보낸 문자와 입력창에있는 문자가 다르면 
    authNum.classList.add('alert-input');
    alertAuthNumber.textContent = "인증번호가 다릅니다";
    //return false;
    //일치하면 
    authNum.classList.remove('alert-input');
    alertAuthNumber.textContent = "";
    // return true;
}

function checkAll() {
    if (!checkId()) {
        return false;
    } else if (!checkNickname()) {
        return false;
    } else if (!checkPassword()) {
        return false;
    } else if (!checkPasswordEqual()) {
        return false;
    } else if (!checkPhoneNumber()) {
        return false;
    } else if (!checkAuth()) {
        return false;
    }
    else {
        return true;
    }
}


signupBtn.addEventListener('click', () => {
    if (checkAll()) {
        //가입완료
        alert('가입완료');
    } else {
        //가입실패
        alert('가입실패');
    }
})


function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec };
    if (sec < 0) { sec = "59" };
    return sec;
}