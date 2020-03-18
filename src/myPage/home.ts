import configure from '../amplify/configure'
import { getAuthAPI } from '../amplify/api'
import { setColorLotto, networkAlert, rankToClass } from '../functions/index'
import IncludeExclude from './IncludeExclude/index';
import incObj from './IncludeExclude/include';
import excObj from './IncludeExclude/exclude';
import { headerSign } from '../amplify/auth';
import Auth from '@aws-amplify/auth';
import { makeTable, makeNoneBox } from './functions';
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
const rankHtml = document.querySelector('.rank');
const lottoRank = document.querySelector('#lotto-rank');

const loading = document.querySelector('.loading-box');

Auth.currentSession()
    .then(session => session.getIdToken())
    .then(idToken => {
        nickname.textContent = idToken.payload.nickname;
        if (idToken.payload.phone_number) {
            const phone = ('0' + idToken.payload.phone_number.slice(3));
            phoneNumber.textContent = phone.slice(0, 3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7, 11);
        }
    });

loading.classList.remove('none');
getAuthAPI('/mypage').then(({numsArr, total, include, exclude, winner, lotto, plan, until, rank, point }) => {
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

nicknameUpdateBtn.addEventListener('click', nicknameUpdate);
serviceUpdateBtn.addEventListener('click', serviceUpdate)

function nicknameUpdate() {

}

function serviceUpdate() {

}
