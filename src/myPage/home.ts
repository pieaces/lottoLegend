import configure from '../amplify/configure'
import { getAuthAPI, patchAuthAPI, postAuthAPI } from '../amplify/api'
import { setColorLotto, networkAlert, rankToClass, onlyUserAlert, stringTrimer, isoStringToDate, makeNoneBox } from '../functions/index'
import IncludeExclude from './IncludeExclude/index';
import incObj from './IncludeExclude/include';
import excObj from './IncludeExclude/exclude';
import Auth from '@aws-amplify/auth';
import { makeTable, phoneString } from './functions';
import Swal from 'sweetalert2';
import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();

const winNumBox = document.querySelector<HTMLElement>('.mypage-win-num');
const nickname = document.querySelector('#nickname');
const pointHtml = document.querySelector('#point');
const phoneNumber = document.querySelector('#phone-number');
const service = document.querySelector('#service');
const expireDate = document.querySelector('#service-expire-date');
const nicknameUpdateBtn = document.querySelector('#nickname-update');
const constmobileUpdateBtn = document.getElementById('mobile');
const rankHtml = document.querySelector('.rank');
const lottoRank = document.querySelector('#lotto-rank');
const numListLength = document.querySelector('#num-list-select-total');
const dayWeekReceive=document.querySelector<HTMLSelectElement>('#day-week-receive');

Auth.currentAuthenticatedUser()
    .then(user => {
        nickname.textContent = user.attributes.nickname;
        if (user.attributes.phone_number_verified) {
            document.querySelector<HTMLElement>('.mobile-btn').classList.add('none');
        }
        if (user.attributes.phone_number) {
            phoneNumber.textContent = phoneString(user.attributes.phone_number);
        }
        nicknameUpdateBtn.addEventListener('click', nicknameUpdate);
        constmobileUpdateBtn.addEventListener('click', mobileUpdate);

        getAuthAPI('/mypage').then(({ numsArr, total, include, exclude, winner, lotto, plan, until, rank, point, day }) => {
            lotto.numbers.forEach((num: number) => {
                const div = document.createElement('div');
                div.textContent = num.toString();
                setColorLotto(num, div);
                winNumBox.appendChild(div);
            });
            const plus = document.createElement('span');
            plus.textContent = '+';
            plus.classList.add('plus');
            winNumBox.appendChild(plus);

            const bonus = document.createElement('div');
            bonus.textContent = lotto.bonusNum.toString();
            setColorLotto(lotto.bonusNum, bonus);
            winNumBox.appendChild(bonus);

            service.textContent = plan;
            if (until) {
                expireDate.textContent = '~' + isoStringToDate(until);
            }else{
                document.getElementById('gaip').classList.remove('none');
            }
            rankHtml.classList.add(rankToClass(rank));
            const rankText = document.createElement('div');
            rankText.classList.add('rank-text');
            rankText.textContent = rank;
            rankHtml.appendChild(rankText);
            pointHtml.textContent = point;

            if (include && include.before) {
                const span = document.createElement('span');
                span.innerHTML = `<span id="inc-num-total">${include.before.size}</span>개 중&nbsp;<span id="inc-num">${include.before.answer}</span>개 출현</span>`;
                document.getElementById('myOldInclude').appendChild(span);
            } else {
                const span = document.createElement('span');
                span.textContent = '-';
                document.getElementById('myOldInclude').appendChild(span);
            }
            if (exclude && exclude.before) {
                const span = document.createElement('span');
                span.innerHTML = `<span id="exc-num-total">${exclude.before.size}</span>개 중&nbsp;<span id="exc-num">${exclude.before.answer}</span>개 적중</span>`;
                document.getElementById('myOldExclude').appendChild(span);
            } else {
                const span = document.createElement('span');
                span.textContent = '-';
                document.getElementById('myOldExclude').appendChild(span);
            }
            if (winner <= 5) lottoRank.textContent = winner + '등';
            else lottoRank.textContent = '-';

            Array.from(document.querySelectorAll('.current-round')).forEach(node => node.textContent = total);
            document.querySelector<HTMLElement>('.before-round').textContent = (total - 1).toString();

            if (include && include.current) {
                const incNumList = new IncludeExclude(include.current, "include", incObj);
                incNumList.makePage();
            } else {
                document.querySelector<HTMLElement>('.inc-num-container').appendChild(makeNoneBox())
            }
            if (exclude && exclude.current) {
                const excNumList = new IncludeExclude(exclude.current, "exclude", excObj);
                excNumList.makePage();
            } else {
                document.querySelector<HTMLElement>('.exc-num-container').appendChild(makeNoneBox())
            }

            if (numsArr && numsArr.length > 0) {
                makeTable(document.querySelector<HTMLElement>('.mypage-table-num-box'), numsArr, total, false);
                numListLength.textContent = numsArr.length.toString();
            } else {
                document.querySelector<HTMLElement>('.mypage-table-num-box').appendChild(makeNoneBox());
            }
            if(day) {
                document.getElementById('dayChange').onclick = () => {
                    postAuthAPI('/users/day')
                }
            }
        }).catch(err => networkAlert());
    }).catch(err => onlyUserAlert());

function modifyMessage(option: { title: string, text?: string, confirmButtonText: string, preConfirm: (param: any) => any }) {
    return Swal.fire({
        title: option.title,
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: option.confirmButtonText,
        cancelButtonText: '취소',
        showLoaderOnConfirm: true,
        preConfirm: option.preConfirm,
        allowOutsideClick: () => !Swal.isLoading()
    });
}
async function phoneCodeVerify(title: string) {
    await modifyMessage({
        title, confirmButtonText: '확인', preConfirm: async (code: string) => {
            try {
                await Auth.verifyCurrentUserAttributeSubmit('phone_number', code);
                await Auth.currentAuthenticatedUser({ bypassCache: true }).then(user => {
                    phoneNumber.textContent = phoneString(user.attributes.phone_number);
                    patchAuthAPI('/account/phone', { phone: user.attributes.phone_number });
                }).catch(err => networkAlert());
                Swal.fire({
                    title: '인증완료',
                    icon: 'success'
                });
            }
            catch (err) {
                if (err.code) {
                    Swal.showValidationMessage('잘못된 번호입니다');
                }
            }
        }
    });
}
function nicknameUpdate() {
    modifyMessage({
        title: '변경하실 닉네임을 입력해주세요', confirmButtonText: '변경', preConfirm: async (nickName: string) => {
            try {
                if (nickName.length > 8) throw new Error('8글자 이내여야합니다');
                const response = await patchAuthAPI('/account', { nickName: stringTrimer(nickName) });
                if (response.error) {
                    throw new Error(response.message);
                }
                const user = (await Auth.currentAuthenticatedUser());
                await Auth.updateUserAttributes(user, { nickname: nickName });
                return response;
            }
            catch (error) {
                Swal.showValidationMessage(error);
            }
        }
    }).then(async (result) => {
        if (result.value) {
            Auth.currentAuthenticatedUser({ bypassCache: true }).then(user => {
                nickname.textContent = user.attributes.nickname;
            })
            Swal.fire({
                title: '변경완료되었습니다',
            });
        }
    });
}

function mobileUpdate() {
    modifyMessage({
        title: '인증하실 휴대폰번호를 입력해주세요', text: '숫자로만 입력해주세요 예)01012345678', confirmButtonText: '확인', preConfirm: async (phone: string) => {
            const user = (await Auth.currentAuthenticatedUser());
            try {
                const regexr = /^[0-9]{10,11}$/;
                if (!regexr.test(phone)) throw new Error('format')
                await Auth.updateUserAttributes(user, { phone_number: '+82' + phone.slice(1) });
                return await Auth.verifyCurrentUserAttribute('phone_number')
            } catch (err) {
                if (err.message === "format") {
                    Swal.showValidationMessage('휴대폰번호 형식을 지켜주세요');
                } else if (err.code === "LimitExceededException") {
                    Swal.showValidationMessage('시도횟수가 기준을 초과하였습니다. 잠시후 다시 시도해주세요');
                } else {
                    Swal.showValidationMessage('예기치 못한 오류가 발생하였습니다');
                }
            }
        }
    }).then(async (result) => {
        if (result.dismiss) {
        }
        else if (!result.value.code) {
            await Auth.currentAuthenticatedUser({ bypassCache: true }).then(user => {
                nickname.textContent = user.attributes.nickname;
                phoneNumber.textContent = phoneString(user.attributes.phone_number);
                document.querySelector<HTMLElement>('.mobile-btn').classList.add('none');
            });
            phoneCodeVerify('인증번호를 입력해주세요');
        }
    });
}

