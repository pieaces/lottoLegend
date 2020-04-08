import configure from './amplify/configure'
import { getUnAuthAPI, getAuthAPI } from './amplify/api';
import { getCategoryHtml, Category } from './board/functions';
import { isoStringToDate, numberFormat, rankToClass } from './functions';
import { isLogedIn, getNickName, signOut, signIn } from './amplify/auth';
import {mqInit,menuInfoToggle} from './base/headerHover';
import {login} from './account/signIn';

mqInit();
menuInfoToggle();
configure();

const loginContainer=document.querySelector('.login-container')
const loginAfterBox=document.querySelector('.login-after-box');

const commTab = document.querySelectorAll('.community-tab');
const boardPlus = document.getElementById('board-plus');
const commContent = document.querySelectorAll<HTMLElement>('.community-content');
const commContentAnchor = document.querySelectorAll<HTMLElement>('.community-content-title > a');
isLogedIn().then((result) => {
    if(result){
        //로그인
        const nickname = document.querySelector('.nickname');
        getNickName().then(name => nickname.textContent = name);
        loginContainer.classList.add('none');
        loginAfterBox.classList.remove('none');
        document.getElementById('logout').onclick = () => signOut();
        getAuthAPI('/main/posts').then(data => {
            console.log(data);
            document.querySelector('#rank-text').textContent = data.user.rank;
            document.querySelector('.rank').classList.add(rankToClass(data.user.rank));
            document.querySelector('#point').textContent = data.user.point;
            document.querySelector('#service').textContent = data.user.plan;
            executeMakingBoard(data);
        });
    } else {
        loginAfterBox.classList.add('none');
        loginContainer.classList.remove('none');
        //로그아웃상태
        login();
       
        getUnAuthAPI('/main/posts').then(data => {
            console.log(data);
            executeMakingBoard(data);
        });
    }
});
function executeMakingBoard(data:any){
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
}
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
    banner.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAADSAQMAAAAvwqqHAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB9JREFUeNrtwQENAAAAwqD3T20PBxQAAAAAAAAAAPBmJBgAAeBdCIQAAAAASUVORK5CYII=');
    imgBranch = (order: number) => {
        switch (order) {
            case 0:
                bannerAnchor.setAttribute('href', 'introduce/system.html');
                banner.style.backgroundPosition = '0 40.08843%';
                break;
            case 1:
                bannerAnchor.setAttribute('href', 'introduce/truth.html');
                banner.style.backgroundPosition = '0 47.826087%';
                break;
            case 2:
                bannerAnchor.setAttribute('href', 'introduce/event.html');
                banner.style.backgroundPosition = '0 55.563744%';
                break;
            case 3:
                bannerAnchor.setAttribute('href', 'introduce/campaign.html');
                banner.style.backgroundPosition = '0 63.3014%';
                break;
        }
    }
}

function mqDeskTopInit() {
    banner.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAr0AAAEQAQMAAACHgF42AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAC5JREFUeNrtwQENAAAAwqD3T20PBxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI8GXpAAAQ4N7WkAAAAASUVORK5CYII=');
    imgBranch = (order: number) => {
        switch (order) {
            case 0:
                bannerAnchor.setAttribute('href', 'introduce/system.html');                
                banner.style.backgroundPosition = '0 0%';
                break;
            case 1:
                bannerAnchor.setAttribute('href', 'introduce/truth.html');
                banner.style.backgroundPosition = '0 10.25641%';
                break;
            case 2:
                bannerAnchor.setAttribute('href', 'introduce/event.html');
                banner.style.backgroundPosition = '0 20.512821%';
                break;
            case 3:
                bannerAnchor.setAttribute('href', 'introduce/campaign.html');
                banner.style.backgroundPosition = '0 30.769231%';
                break;
        }
    }
}
backgroundImgSlide();
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
