import configure from './amplify/configure'
import { getUnAuthAPI } from './amplify/api';
import { getCategoryHtml, Category } from './board/functions';
import { isoStringToDate, numberFormat } from './functions';
import { isLogedIn, getNickName } from './amplify/auth';
import {mqInit,menuInfoToggle} from './base/headerHover';

mqInit();
menuInfoToggle();
configure();

const loginContainer=document.querySelector('.login-container')
const loginAfterBox=document.querySelector('.login-after-box');
isLogedIn().then((result) => {
    if(result){
        //로그인
        const nickname = document.querySelector('.nickname');
        getNickName().then(name => nickname.textContent = name);
        const point = document.querySelector('#point');
        const service = document.querySelector('#service');
        loginContainer.classList.add('none');
        loginAfterBox.classList.remove('none');
        
    }else{
        loginAfterBox.classList.add('none');
        loginContainer.classList.remove('none');
        //로그아웃상태
    }
});

const banner = document.getElementById('banner');
const imgBtn = document.querySelectorAll('.img-btn > i');
const winBox = document.querySelector<HTMLElement>('.win-num-box');
const winner = document.getElementById('winner');
const winRound = document.getElementById('win-round');
const compartColor = ['#FBC400', '#69C8F2', '#FF7272', '#AAAAAA', '#B0D840'];
const officialWinResultBox = document.querySelectorAll<HTMLElement>('.total-win-result-box > div');
const myWinResultBox = document.querySelectorAll<HTMLElement>('.own-win-result-box > div');
const reviewTabs = document.querySelector('.review-tabs');
const winCount = document.querySelectorAll('.win-count-rank');
const commTab = document.querySelectorAll('.community-tab');
const commContent = document.querySelectorAll<HTMLElement>('.community-content');
const commContentAnchor = document.querySelectorAll<HTMLElement>('.community-content-title > a');
const userNameInput = document.querySelector<HTMLInputElement>('#id');
const passwordInput = document.querySelector<HTMLInputElement>('#password');
//
document.querySelector<HTMLInputElement>('.login-btn').onclick = async () => {
    const userName = userNameInput.value;
    const password = passwordInput.value;
}
const mqMobile = window.matchMedia("(max-width: 767px)");
if (mqMobile.matches) {
    mqMobileInit();
} else {
    mqDeskTopInit();
}
mqMobile.addListener(mqFunc);
function mqFunc(mediaQuery) {
    if (mediaQuery.matches) {
        //모바일 레이아웃
        mqMobileInit();
    } else {
        //데스크탑 레이아웃

        mqDeskTopInit();
    }
}
let imgBranch:(order:number) => void;
const bannerAnchor = document.getElementById('bannerAnchor');

function mqMobileInit() {
    imgBranch = (order: number) => {
        switch (order) {
            case 0:
                bannerAnchor.setAttribute('href', 'introduce/system.html');
                banner.style.background = 'url(./img/main.png) -10px -595px';
                break;
            case 1:
                bannerAnchor.setAttribute('href', 'introduce/truth.html');
                banner.style.background = 'url(./img/main.png) -369px -595px';
                break;
            case 2:
                bannerAnchor.setAttribute('href', 'introduce/event.html');
                banner.style.background = 'url(./img/main.png) -729px -595px';
                break;
            case 3:
                bannerAnchor.setAttribute('href', 'introduce/campaign.html');
                banner.style.background = 'url(./img/main.png) -1090px -595px';
                break;
        }
    }
}

function mqDeskTopInit() {
    imgBranch = (order: number) => {
        switch (order) {
            case 0:
                bannerAnchor.setAttribute('href', 'introduce/system.html');
                banner.style.background = 'url(./img/main.png) -10px -10px';
                break;
            case 1:
                bannerAnchor.setAttribute('href', 'introduce/truth.html');
                banner.style.background = 'url(./img/main.png) -10px -1336px';
                break;
            case 2:
                bannerAnchor.setAttribute('href', 'introduce/event.html');
                banner.style.background = 'url(./img/main.png) -730px -1045px';
                break;
            case 3:
                bannerAnchor.setAttribute('href', 'introduce/campaign.html');
                banner.style.background = 'url(./img/main.png) -730px -1337px';
                break;
        }
    }
}
backgroundImgSlide();
getUnAuthAPI('/main/numbers').then(data => {
    makeWinNumBox(data);
    document.querySelectorAll('.win-round').forEach(node => node.textContent = data.round);
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
});
const boardPlus = document.getElementById('board-plus');
getUnAuthAPI('/main/posts').then(data => {
    let current = 0;
    const tabs = ['pro', 'analysis', 'include', 'exclude', 'free'];
    makeBoard(data[tabs[current]]);

    for (let i = 0; i < commTab.length; i++) {
        commTab[i].addEventListener('click', () => {
            commTab[current].classList.remove('community-tab-current');
            current = i;
            commTab[i].classList.add('community-tab-current');
            boardPlus.setAttribute('href', `board/${tabs[current]}/list.html`);
            makeBoard(data[tabs[current]]);
        });
    }
    makeWinReview(data.win);
});

function insertWinCount(data) {
    data.forEach((item, index) => {
        winCount[index].textContent = item.toString();
    })
}

function makeBoard(data: { id?: number, category?: Category, title: string, created: string }[]) {
    for (let i = 0; i < 5; i++) {
        if (data[i]) {
            commContentAnchor[i].setAttribute('href', `/${getCategoryHtml(data[i].category, 'read')}?id=${data[i].id}`);
            commContentAnchor[i].textContent = data[i].title;
            commContent[i].children[1].textContent = isoStringToDate(data[i].created);
        }else{
            commContentAnchor[i].setAttribute('href', '');
            commContentAnchor[i].textContent = '';
            commContent[i].children[1].textContent = '';
        }
    }
}

function insertWinResult(data, target: NodeListOf<HTMLElement>) {
    Array.from(target).forEach((node, index) => {
        node.children[1].textContent = `${numberFormat(data[index].winner)}조합`;
        node.children[2].textContent = `${numberFormat(data[index].winAmount)}원`;
    });
}

function makeWinReview(data: { id: number, title: string, created: string, img: string }[]) {
    data.forEach(item => {
        const tab = document.createElement('a');
        tab.setAttribute('href', `/${getCategoryHtml('win', 'read')}?id=${item.id}`);
        tab.classList.add('review-tab');
        tab.classList.add('box-color');

        const imgBox = document.createElement('div');
        imgBox.classList.add('review-img-box');

        const img = document.createElement('img');
        //onerror="this.src='에러발생이미지';"
        img.setAttribute('src', item.img);
        img.setAttribute('onerror', "this.src='img/logo/2.png';")

        imgBox.appendChild(img);

        if (item.img === null) {
            (img.parentNode as HTMLElement).style.padding = "1rem";
            img.style.height = "auto";
        }

        tab.appendChild(imgBox);

        const content = document.createElement('div');
        content.classList.add('review-content');
        content.textContent = item.title;

        tab.appendChild(content);

        const time = document.createElement('div');
        time.classList.add('review-time');

        time.textContent = isoStringToDate(item.created);

        tab.appendChild(time);
        reviewTabs.appendChild(tab);
    });
}

function makeWinNumBox(data: any) {
    winner.textContent = data.winner;
    document.getElementById('winAmount1').textContent = numberFormat(data.winAmount);
    document.getElementById('winAmount2').textContent = Math.round(data.winAmount / 100000000).toString();
    for (let i = 0; i < 6; i++) {
        const num = document.createElement('div');
        num.classList.add('win-num');
        num.textContent = data.numbers[i];
        const compartIndex = Math.floor((data.numbers[i] - 1) / 10);
        num.style.backgroundColor = compartColor[compartIndex];
        winBox.appendChild(num);
    }
    const plus = document.createElement('div');
    plus.classList.add('plus');
    plus.textContent = '+';
    winBox.appendChild(plus);
    const bonus = document.createElement('div');
    bonus.classList.add('win-num');
    bonus.textContent = data.bonusNum;
    const compartIndex = Math.floor((data.bonusNum - 1) / 10);
    bonus.style.backgroundColor = compartColor[compartIndex];
    winBox.appendChild(bonus);
}

function backgroundImgSlide() {
    let i = 2;
    const slideIntervalId = setInterval(() => {
        imgBranch(i-1);

        if (i === 1) {
            imgBtn[i - 1].classList.remove('far');
            imgBtn[i - 1].classList.add('fas');
            imgBtn[imgBtn.length - 1].classList.add('far');
            imgBtn[imgBtn.length - 1].classList.remove('fas');
        }
        else {
            imgBtn[i - 2].classList.add('far');
            imgBtn[i - 2].classList.remove('fas');
            imgBtn[i - 1].classList.remove('far');
            imgBtn[i - 1].classList.add('fas');
        }
        i++;
        if (i === imgBtn.length + 1) {
            i = 1;
        }
    }, 7000);

    for (let node = 0; node < imgBtn.length; node++) {
        imgBtn[node].addEventListener('click', () => {
            imgBranch(node);
            for (let i = 0; i < imgBtn.length; i++) {
                imgBtn[i].classList.add('far');
                imgBtn[i].classList.remove('fas');
            }
            imgBtn[node].classList.add('fas');
            imgBtn[node].classList.remove('far');
            clearInterval(slideIntervalId);
        })
    }
}
