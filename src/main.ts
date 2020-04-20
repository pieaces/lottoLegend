import configure from './amplify/configure'
import 'core-js/stable/dom-collections/for-each'
import { getUnAuthAPI, getAuthAPI } from './amplify/api';
import { rankToClass, loginAddEvent, networkAlert } from './functions';
import { isLogedIn, getNickName, signOut } from './amplify/auth';
import { mqDeskTopInit, backgroundImgSlide, makeWinNumBox, insertWinCount, insertWinResult, executeMakingBoard, mqMobileInit, makeWinnersList, moneyCompress } from './functions/main';
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
            if (data.user) {
                document.querySelector('#rank-text').textContent = data.user.rank;
                document.querySelector('.rank').classList.add(rankToClass(data.user.rank));
                document.querySelector('#point').textContent = data.user.point;
                document.querySelector('#service').textContent = data.user.plan;
            }
            executeMakingBoard(data);
        }).catch(() => networkAlert());
    } else {
        loginAfterBox.classList.add('none');
        loginContainer.classList.remove('none');
        getUnAuthAPI('/main/posts').then(data => {
            executeMakingBoard(data);
        }).catch((err) => console.log(err));

        loginAddEvent();
    }
});

const winRound = document.getElementById('win-round');
const officialWinResultBox = document.querySelectorAll<HTMLElement>('.total-win-result-box > div');
const myWinResultBox = document.querySelectorAll<HTMLElement>('#win-result > div');
getUnAuthAPI('/main/numbers').then(data => {
    makeWinNumBox(data);
    document.querySelectorAll('.win-round').forEach(node => node.textContent = data.round);
    winRound.textContent = data.round;

    insertWinCount(data.stats);
    insertWinResult(data.info, officialWinResultBox);
    insertWinResult(data.win && data.win.map((winner: number, index: number) => {
        return {
            winner,
            winAmount: winner * data.info[index].winAmount
        }
    }), myWinResultBox);
    document.getElementById('totalAmount').textContent = moneyCompress(data.info && data.info.reduce((acc, cur, index) => acc + cur.winAmount * data.win[index], 0));
    const winners = [];
    data.winners && data.winners.forEach((_winners, index) => {
        _winners && _winners.forEach(winner => {
            winners.push({ rank: index + 1, money: data.info[index].winAmount, nickName: winner });
        });
    });
    makeWinnersList(winners);
}).catch((err) => console.log(err));

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