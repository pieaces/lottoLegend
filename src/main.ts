import configure from './amplify/configure'
import { getUnAuthAPI, getAuthAPI } from './amplify/api';
import { rankToClass, loginAddEvent, networkAlert } from './functions';
import { isLogedIn, getNickName, signOut } from './amplify/auth';
import { mqMobileInit } from './statistics/functions';
import { mqDeskTopInit, backgroundImgSlide, makeWinNumBox, insertWinCount, insertWinResult, executeMakingBoard } from './functions/main';

configure();

const loginContainer = document.querySelector('.login-container')
const loginAfterBox = document.querySelector('.login-after-box');

isLogedIn().then((result) => {
    if (result) {
        const nickname = document.querySelector('#main-nickname');
        getNickName().then(name => nickname.textContent = name);
        loginContainer.classList.add('none');
        loginAfterBox.classList.remove('none');
        document.getElementById('logout').onclick = () => signOut();
        getAuthAPI('/main/posts').then(data => {
            document.querySelector('#rank-text').textContent = data.user.rank;
            document.querySelector('.rank').classList.add(rankToClass(data.user.rank));
            document.querySelector('#point').textContent = data.user.point;
            document.querySelector('#service').textContent = data.user.plan;
            executeMakingBoard(data);
        }).catch(() => networkAlert());
    } else {
        loginAfterBox.classList.add('none');
        loginContainer.classList.remove('none');
        getUnAuthAPI('/main/posts').then(data => {
            executeMakingBoard(data);
        }).catch(() => networkAlert());
        loginAddEvent();
    }
});

const winRound = document.getElementById('win-round');
const officialWinResultBox = document.querySelectorAll<HTMLElement>('.total-win-result-box > div');
const myWinResultBox = document.querySelectorAll<HTMLElement>('.own-win-result-box > div');
getUnAuthAPI('/main/numbers').then(data => {
    makeWinNumBox(data);
    Array.from(document.querySelectorAll('.win-round')).forEach(node => node.textContent = data.round);
    winRound.textContent = data.round;

    insertWinCount(data.stats);
    insertWinResult(data.info, officialWinResultBox);
    insertWinResult(data.win.map((winner: number, index: number) => {
        return {
            winner,
            winAmount: winner * data.info[index].winAmount
        }
    }), myWinResultBox);
    // document.getElementById('totalAmount').textContent = (<any[]>data.info).reduce((acc, cur, index) =>
    //     acc + cur.winAmount * data.win[index], 0);
}).catch(() => networkAlert());

const mqMobile = window.matchMedia("(max-width: 767px)");
if (mqMobile.matches) {
    mqMobileInit();
} else {
    mqDeskTopInit();
}
mqMobile.addListener(mqFunc);
function mqFunc(mediaQuery) {
    if (mediaQuery.matches) {
        mqMobileInit();
    } else {
        mqDeskTopInit();
    }
}
backgroundImgSlide();
