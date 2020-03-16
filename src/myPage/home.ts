import configure from '../amplify/configure'
import { getAuthAPI } from '../amplify/api'
import { setColorLotto, networkAlert, rankToClass } from '../functions/index'
import IncludeExclude from './IncludeExclude/index';
import incObj from './IncludeExclude/include';
import excObj from './IncludeExclude/exclude';
import { headerSign } from '../amplify/auth';
import Auth from '@aws-amplify/auth';
import { makeTable } from './functions';
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

init();

async function init() {
    loading.classList.remove('none');

    Auth.currentSession()
    .then(session => session.getIdToken())
    .then(idToken => {
        console.log(idToken.payload)
        nickname.textContent = idToken.payload.nickname;
        const phone = ('0' + idToken.payload.phone_number.slice(3));
        phoneNumber.textContent = phone.slice(0,3) + '-' + phone.slice(3,7) + '-' + phone.slice(7,11);
    });

    try {
        const {include, exclude, winner, lotto, plan, until, rank, point} = await getAuthAPI('/mypage');
        lotto.numbers.forEach((num:number) =>{
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
        expiryDate.textContent = '~'+until;
        rankHtml.classList.add(rankToClass(rank));
        rankHtml.textContent = rank;
        pointHtml.textContent = point;

        if (include) {
            const span = document.createElement('span');
            span.innerHTML = `<span id="inc-num-total">${include.size}</span>개 중&nbsp;<span id="inc-num">${include.answer}</span>개 출현</span>`;
            document.getElementById('myOldInclude').appendChild(span);
        }else{
            const span = document.createElement('span');
            span.textContent = '-';
            document.getElementById('myOldInclude').appendChild(span);   
        }
        if (exclude) {
            const span = document.createElement('span');
            span.innerHTML = `<span id="exc-num-total">${exclude.size}</span>개 중&nbsp;<span id="exc-num">${exclude.answer}</span>개 적중</span>`;
            document.getElementById('myOldExclude').appendChild(span);
        }else{
            const span = document.createElement('span');
            span.textContent = '-';
            document.getElementById('myOldExclude').appendChild(span);
        }
        if(winner <=5) lottoRank.textContent = winner;
        else lottoRank.textContent = '-';
    } catch (err) {
        networkAlert();
    }

    try {
        const { include, exclude, total } = await getAuthAPI('/numbers/piece', { flag: true });
        document.querySelectorAll<HTMLElement>('.current-round').forEach(node => node.textContent = total);
        document.querySelector<HTMLElement>('.before-round').textContent = (total - 1).toString();
        const incNumList = new IncludeExclude(include, "include", incObj);
        const excNumList = new IncludeExclude(exclude, "exclude", excObj);
        incNumList.makePage();
        excNumList.makePage();
        const { data } = await getAuthAPI('/numbers/mass/' + total);
        makeTable(document.querySelector<HTMLElement>('.mypage-table-num-box'), data, total, false);

    } catch (err) {
        networkAlert();
    }

    loading.classList.add('none');
}

nicknameUpdateBtn.addEventListener('click', nicknameUpdate);
serviceUpdateBtn.addEventListener('click', serviceUpdate)

function nicknameUpdate() {

}

function serviceUpdate() {

}
