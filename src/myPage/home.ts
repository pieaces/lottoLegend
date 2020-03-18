import configure from '../amplify/configure'
import { getAuthAPI, patchAuthAPI } from '../amplify/api'
import { setColorLotto, networkAlert, rankToClass, onlyUserAlert } from '../functions/index'
import IncludeExclude from './IncludeExclude/index';
import incObj from './IncludeExclude/include';
import excObj from './IncludeExclude/exclude';
import { headerSign } from '../amplify/auth';
import Auth from '@aws-amplify/auth';
import { makeTable, makeNoneBox, phoneString } from './functions';
import Swal from 'sweetalert2';
configure();
headerSign();

const winNumBox = document.querySelector<HTMLElement>('.mypage-win-num');
const nickname = document.querySelector('#nickname');
const pointHtml = document.querySelector('#point');
const phoneNumber = document.querySelector('#phone-number');
const service = document.querySelector('#service');
const expiryDate = document.querySelector('#service-expiry-date');
const nicknameUpdateBtn = document.querySelector('#nickname-update');
const serviceUpdateBtn = document.querySelector('#service-update');
const constmobileUpdateBtn =document.getElementById('mobile');
const rankHtml = document.querySelector('.rank');
const lottoRank = document.querySelector('#lotto-rank');

const loading = document.querySelector('.loading-box');

Auth.currentAuthenticatedUser()
    .then(user => {
        console.log(user);
        nickname.textContent = user.attributes.nickname;
        if (user.attributes.phone_number) {
            phoneNumber.textContent = phoneString(user.attributes.phone_number);
        }
        nicknameUpdateBtn.addEventListener('click', nicknameUpdate);
        serviceUpdateBtn.addEventListener('click', serviceUpdate);
        constmobileUpdateBtn.addEventListener('click', mobileUpdate);
        loading.classList.remove('none');
        getAuthAPI('/mypage').then(({ numsArr, total, include, exclude, winner, lotto, plan, until, rank, point }) => {
            lotto.numbers.forEach((num: number) => {
                const div = document.createElement('div');
                div.textContent = num.toString();
                setColorLotto(num, div);
                winNumBox.appendChild(div);
            });
            const plus = document.createElement('span');
            plus.textContent = '+';
            plus.style.marginRight = "1rem";
            winNumBox.appendChild(plus);

            const bonus = document.createElement('div');
            bonus.textContent = lotto.bonusNum.toString();
            setColorLotto(lotto.bonusNum, bonus);
            winNumBox.appendChild(bonus);

            service.textContent = plan;
            expiryDate.textContent = '~' + until;
            rankHtml.classList.add(rankToClass(rank));
            rankHtml.textContent = rank;
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

            document.querySelectorAll<HTMLElement>('.current-round').forEach(node => node.textContent = total);
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
            } else {
                document.querySelector<HTMLElement>('.mypage-table-num-box').appendChild(makeNoneBox());
            }
        }).catch(err => networkAlert())
            .finally(() => loading.classList.add('none'));
    }
    )
    .catch(err => onlyUserAlert());

function nicknameUpdate() {
    Swal.fire({
        title: '변경하실 닉네임을 입력해주세요',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: '변경',
        cancelButtonText: '취소',
        showLoaderOnConfirm: true,
        preConfirm: (nickName: string) => {
            return patchAuthAPI('/account', { nickName })
                .then(async (response) => {
                    if (response.error) {
                        throw new Error(response.message)
                    }
                    const user = (await Auth.currentAuthenticatedUser());
                    await Auth.updateUserAttributes(user, { nickname: nickName });
                    return response
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        error
                    )
                });
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
        if (result.value) {
            Auth.currentAuthenticatedUser({bypassCache:true}).then(user => {
                nickname.textContent = user.attributes.nickname;
            })            
            Swal.fire({
                title: '변경완료되었습니다',
            });
        }
    });
}

function serviceUpdate() {

}

function mobileUpdate(){
    Swal.fire({
        title: '인증하실 휴대폰번호를 입력해주세요',
        text:'숫자로만 입력해주세요 예)01012345678',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showLoaderOnConfirm: true,
        preConfirm: async (phone: string) => {
            const user = (await Auth.currentAuthenticatedUser());
            try {
                await Auth.updateUserAttributes(user, { phone_number: '+82' + phone.slice(1) });
                return await Auth.verifyCurrentUserAttribute('phone_number')
            } catch (err) {
                return err;
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
        console.log(result);
        if(result.dismiss){

        }
        else if (!result.value.code) {
            Auth.currentAuthenticatedUser({bypassCache:true}).then(user => {
                nickname.textContent = user.attributes.nickname;
                phoneNumber.textContent = phoneString(user.attributes.phone_number);
            })            
            Swal.fire({
                title: '변경완료되었습니다',
            });
        }else if(result.value.code === "InvalidParameterException"){
            Swal.fire({
                title: '오류',
                text:'휴대폰번호 형식을 잘못 입력하셨습니다',
                icon:'error'
            });
        }else{
            Swal.fire({
                title: '오류',
                text:'예기치 못한 오류가 발생하였습니다',
                icon:'error'
            });
        }
    })
}