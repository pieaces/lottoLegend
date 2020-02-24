
const id = document.querySelector('#id');
const nickname = document.querySelector('#nickname');
const password = document.querySelector('#password');
const passwordCheck = document.querySelector('#password-check');
const phoneNumber = document.querySelector('#phone-number');
const signupBtn = document.querySelector('#signup');
const authSubmitBtn = document.querySelector('#auth-submit');
const authTime = document.querySelector('#auth-time');


function checkId() {  //id 공백체크
    if (id.value.replace(/\s/gi, "") === "") {
        console.log("id가 공백");
        return false;
    } else {
        return true;
    }
}

function checkPassword() {
    const regPassword = /^[a-z0-9]{8,12}$/;  //소문자 + 숫자 8~12
    if (!regPassword.test(password.value)) {
        console.log("비밀번호 조건에 안 맞음");
        return false;
    }
    if (password.value !== passwordCheck.value) {
        console.log("비밀번호와 비밀번호 확인이 일치하지 않음");
        return false;
    }
    return true;
}

function checkNickname() {
    if (nickname.value.replace(/\s/gi, "") === "") {
        console.log("닉네임이 공백");
        return false;
    } else {
        return true;
    }
}

function checkPhoneNumber() {
    const regPhoneNumber = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regPhoneNumber.test(phoneNumber.value)) {
        console.log("휴대폰번호 조건 안 맞음");
        return false;
    } else {
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
    // alert('인증번호가 다릅니다');
    //return false;
    //일치하면 return true;
}

function checkAll() {
    if (!checkId()) {
        return false;
    } else if (!checkNickname()) {
        return false;
    } else if (!checkPassword()) {
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