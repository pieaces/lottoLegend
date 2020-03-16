import configure from '../amplify/configure'
import { getAuthAPI } from '../amplify/api'
import { setColorLotto } from '../functions/index'
import IncludeExclude from './IncludeExclude/index';
import incObj from './IncludeExclude/include';
import excObj from './IncludeExclude/exclude';
configure();

const winNumBox = document.querySelectorAll<HTMLElement>('.mypage-win-num > div');
const nickname = document.querySelector('#nickname');
const point = document.querySelector('#point');
const phoneNumber = document.querySelector('#phone-number');
const service = document.querySelector('#service');
const expiryDate = document.querySelector('#service-expiry-date');
const nicknameUpdateBtn = document.querySelector('#nickname-update');
const serviceUpdateBtn = document.querySelector('#service-update');
const rank = document.querySelector('rank');
const incNum = document.querySelector('#inc-num');
const excNum = document.querySelector('#exc-num');
const excNumTotal = document.querySelector('#exc-num-total');
const lottoRank = document.querySelector('#lotto-rank');
const loading = document.querySelector('.loading-box');

async function init() {
    loading.classList.remove('none');

    nickname.textContent = "luckysso";
    phoneNumber.textContent = "010-9524-2432";
    service.textContent = "일반";
    expiryDate.textContent = "20.12.31까지";
    rank.classList.add('rank-first');
    rank.textContent = '1';
    point.textContent = "93점";

    const { include, exclude, total } = await getAuthAPI('/numbers/piece', {flag:true});
    const incNumList = new IncludeExclude(include, "include", incObj);
    const excNumList = new IncludeExclude(exclude, "exclude", excObj);
    //IncludeExclude.setAnswer(answer);
    incNumList.makePage();
    excNumList.makePage();

    incNum.textContent = "2";
    excNum.textContent = "13";
    excNumTotal.textContent = "15";
    lottoRank.textContent = "5";

    loading.classList.add('none');
}


nicknameUpdateBtn.addEventListener('click', nicknameUpdate);
serviceUpdateBtn.addEventListener('click', serviceUpdate)

function nicknameUpdate() {

}

function serviceUpdate() {

}
