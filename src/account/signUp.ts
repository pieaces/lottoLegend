// import configure from '../amplify/configure'
// import { signUp, confirmSignUp, headerSign } from "../amplify/auth";
// import CheckBoxToggle from '../system/premium/instanceBtns/CheckBoxToggle'

// configure();
// headerSign();


// init();

// function init() {
//     const checkBoxToggle = new CheckBoxToggle();
//     checkBoxToggle.addEvent();

//     termUseBtn.addEventListener('click', termUseSubmit);

//     password.addEventListener('invalid', invalidPassword);
//     password.addEventListener('input', invalidPassword);

//     passwordCheck.addEventListener('invalid', invalidPasswordCheck);
//     passwordCheck.addEventListener('input', invalidPasswordCheck);

//     phoneMidValue.addEventListener('invalid', invalidPhoneMidValue);
//     phoneMidValue.addEventListener('input', invalidPhoneMidValue);

//     phoneEndValue.addEventListener('invalid', invalidPhoneEndValue);
//     phoneEndValue.addEventListener('input', invalidPhoneEndValue);


//     signUpForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const result: any = await signUp(id.value, '+82'.concat(phoneMidValue.value.slice(1)), password.value, nickname.value);
//         console.log(result);
//         if (result.code === "UsernameExistsException") {
//             console.log('이미 존재하는 아이디')
//         } else if (result.user) {
//             console.log('인증번호 전송');
//         }
//         authCheckWrapper.classList.remove('none');

//     });

//     authCheck.addEventListener('click', async () => {
//         const result = await confirmSignUp(id.value, authNum.value);
//         console.log(result);
//         if (result === "SUCCESS") {
//             console.log('인증성공');
//         } else if (result.code === "LimitExceededException") {
//             console.log('과도한 요청을 금지합니다. 잠시 기다린 후 다시 시도해주세요.');
//             authAlertBox.textContent = '과도한 요청을 금지합니다. 잠시 기다린 후 다시 시도해주세요.';
//         } else if (result.code === "CodeMismatchException") {
//             console.log('인증실패');
//             authAlertBox.textContent = '인증실패';
//         }
//     });
// }

// function termUseSubmit() {
//     const isAllCheck = Array.from(termsUseCheckboxes).every((node) => {
//         return node.checked === true;
//     })
//     console.log(isAllCheck);
//     if (termsUseAllCheck.checked || isAllCheck) {
//         termsUseContainer.classList.add('none');
//         signUpForm.classList.remove('none');

//     } else {
//         alert('메롱');
//     }

// }

// function invalidPassword() {

//     if (password.value.search(new RegExp(password.getAttribute('pattern'))) === -1) {
//         password.setCustomValidity(` 8~12자리 한글 또는 영어(소문자)+숫자로 입력해주세요`);
//     } else {
//         password.setCustomValidity(``);
//     }

//     return true;

// }

// function invalidPasswordCheck() {
//     if (password.value !== passwordCheck.value) {
//         passwordCheck.setCustomValidity('비밀번호와 비밀번호 확인이 서로 다릅니다');
//     } else {
//         passwordCheck.setCustomValidity('');
//     }
//     return true;
// }

// export function invalidPhoneMidValue() {
//     const regPhoneNumberMid = /^([0-9]{3,4})$/;

//     if (phoneMidValue.value === '') {
//         phoneMidValue.setCustomValidity('이 입력란을 작성하세요.');
//     } else if (!regPhoneNumberMid.test(phoneMidValue.value)) {
//         phoneMidValue.setCustomValidity('휴대폰번호 양식에 맞지 않습니다');
//     } else {
//         phoneMidValue.setCustomValidity('');
//     }
//     return true;
// }

// export function invalidPhoneEndValue() {
//     const regPhoneNumberEnd = /^([0-9]{4})$/;

//     if (phoneEndValue.value === '') {
//         phoneEndValue.setCustomValidity('이 입력란을 작성하세요.');
//     } else if (!regPhoneNumberEnd.test(phoneEndValue.value)) {
//         phoneEndValue.setCustomValidity('휴대폰번호 양식에 맞지 않습니다');
//     } else {
//         phoneEndValue.setCustomValidity('');
//     }
//     return true;
// }


