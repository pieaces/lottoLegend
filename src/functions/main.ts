import { getCategoryHtml, Category } from "../board/functions";
import { isoStringToDate, numberFormat } from ".";

const banner = document.getElementById('banner');
const imgBtn = document.querySelectorAll('.img-btn > i');

const winBox = document.querySelector<HTMLElement>('.win-num-box');
const winner = document.getElementById('winner');
const compartColor = ['#FBC400', '#69C8F2', '#FF7272', '#AAAAAA', '#B0D840'];
const reviewTabs = document.querySelector('.review-tabs');
const winCount = document.querySelectorAll('.win-count-rank');
const scrollList = document.querySelectorAll('#scroll-list > ul > li > a');
const commContent = document.querySelectorAll<HTMLElement>('.community-content');
const commContentAnchor = document.querySelectorAll<HTMLElement>('.community-content-title > a');
const adBox = document.querySelector<HTMLElement>('#main-msg-img');

let imgBranch: (order: number) => void;
const bannerAnchor = document.getElementById('bannerAnchor');


export function mqMobileInit() {
    banner.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAADSAQMAAAAvwqqHAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB9JREFUeNrtwQENAAAAwqD3T20PBxQAAAAAAAAAAPBmJBgAAeBdCIQAAAAASUVORK5CYII=');
    adBox.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAADIAQMAAACNj4t6AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB9JREFUeNrtwYEAAAAAw6D5U5/gBlUBAAAAAAAAAMA3ImAAAUhLoDkAAAAASUVORK5CYII=')
    switch (Math.floor(Math.random() * 2)) {
        case 0:
            adBox.style.backgroundPosition = "0 50.41841%";
            break;
        case 1:
            adBox.style.backgroundPosition = "0 55.648536%";
            break;
    }
    imgBranch = (order: number) => {
        switch (order) {
            case 0:
                bannerAnchor.setAttribute('href', '');
                banner.style.backgroundPosition = '0 28.526481%';
                break;
            case 1:
                bannerAnchor.setAttribute('href', 'introduce/truth.html');
                banner.style.backgroundPosition = '0 34.032512%';
                break;
            case 2:
                bannerAnchor.setAttribute('href', 'introduce/system.html');
                banner.style.backgroundPosition = '0 39.538542%';
                break;
            case 3:
                bannerAnchor.setAttribute('href', 'introduce/campaign.html');
                banner.style.backgroundPosition = '0 45.044573%';
                break;
        }
    }
}

export function mqDeskTopInit() {
    banner.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAr0AAAEQAQMAAACHgF42AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAC5JREFUeNrtwQENAAAAwqD3T20PBxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI8GXpAAAQ4N7WkAAAAASUVORK5CYII=');
    adBox.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP0AAAFtAQMAAAD26v5IAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAACNJREFUeNrtwQENAAAAwqD3T20ON6AAAAAAAAAAAAAAAODMAC8NAAEIcAnCAAAAAElFTkSuQmCC');
    switch (Math.floor(Math.random() * 2)) {
        case 0:
            adBox.style.backgroundPosition = "0 63.623941%";
            break;
        case 1:
            adBox.style.backgroundPosition = "0 73.599344%";
            break;
    }
    imgBranch = (order: number) => {
        switch (order) {
            case 0:
                bannerAnchor.setAttribute('href', '');
                banner.style.backgroundPosition = '0 0%';
                break;
            case 1:
                bannerAnchor.setAttribute('href', 'introduce/truth.html');
                banner.style.backgroundPosition = '0 7.249467%';
                break;
            case 2:
                bannerAnchor.setAttribute('href', 'introduce/system.html');
                banner.style.backgroundPosition = '0 14.498934%';
                break;
            case 3:
                bannerAnchor.setAttribute('href', 'introduce/campaign.html');
                banner.style.backgroundPosition = '0 21.748401%';
                break;
        }
    }
}

export function backgroundImgSlide() {
    let i = 2;
    const slideIntervalId = setInterval(() => {
        imgBranch(i - 1);

        if (i === 1) {
            imgBtn[i - 1].classList.remove('owf-empty');
            imgBtn[i - 1].classList.add('owf-full');
            imgBtn[imgBtn.length - 1].classList.add('owf-empty');
            imgBtn[imgBtn.length - 1].classList.remove('owf-full');
        }
        else {
            imgBtn[i - 2].classList.add('owf-empty');
            imgBtn[i - 2].classList.remove('owf-full');
            imgBtn[i - 1].classList.remove('owf-empty');
            imgBtn[i - 1].classList.add('owf-full');
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
                imgBtn[i].classList.add('owf-empty');
                imgBtn[i].classList.remove('owf-full');
            }
            imgBtn[node].classList.add('owf-full');
            imgBtn[node].classList.remove('owf-empty');
            clearInterval(slideIntervalId);
        })
    }
}

function scrolling(this: any, objId: string, sec1: number, sec2: number, speed: number, height: number) {
    this.sec1 = sec1;
    this.sec2 = sec2;
    this.speed = speed;
    this.height = height;
    this.h = 0;
    this.div = document.getElementById(objId);
    this.htmltxt = this.div.innerHTML;
    this.div.innerHTML = this.htmltxt + this.htmltxt;
    this.div.isover = false;
    this.div.onmouseover = function () { this.isover = true; }
    this.div.onmouseout = function () { this.isover = false; }
    var self = this;
    this.div.scrollTop = 0;
    window.setTimeout(function () { self.play() }, this.sec1);
}
scrolling.prototype = {
    play: function () {
        var self = this;
        if (!this.div.isover) {
            this.div.scrollTop += this.speed;
            if (this.div.scrollTop > this.div.scrollHeight / 2) {
                this.div.scrollTop = 0;
            } else {
                this.h += this.speed;
                if (this.h >= this.height) {
                    if (this.h > this.height || this.div.scrollTop % this.height != 0) {
                        this.div.scrollTop -= this.h % this.height;
                    }
                    this.h = 0;
                    window.setTimeout(function () { self.play() }, this.sec1);
                    return;
                }
            }
        }
        window.setTimeout(function () { self.play() }, this.sec2);
    },
    prev: function () {
        if (this.div.scrollTop == 0)
            this.div.scrollTop = this.div.scrollHeight / 2;
        this.div.scrollTop -= this.height;
    },
    next: function () {
        if (this.div.scrollTop == this.div.scrollHeight / 2)
            this.div.scrollTop = 0;
        this.div.scrollTop += this.height;
    }
};

function insertScrollText(data: {id:number, title:string}[]) {
    for (let i = 0; i < scrollList.length; i++) {
        if(!data[i]) break;
        scrollList[i].setAttribute('href', `/${getCategoryHtml('notice', 'read')}?id=${data[i].id}`);
        scrollList[i].textContent = data[i].title;
    }
}

export function makeScroll(notices:{id:number, title:string}[]){
    insertScrollText(notices);
    new scrolling("scroll-list", 4000, 3, 1, 18);
}
const commTab = document.querySelectorAll('.community-tab');
const boardPlus = document.getElementById('board-plus');
export function executeMakingBoard(data: any) {
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

export function insertWinCount(data) {
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
        } else {
            commContentAnchor[i].setAttribute('href', '');
            commContentAnchor[i].textContent = '';
            commContent[i].children[1].textContent = '';
        }
    }
}

export function insertWinResult(data, target: NodeListOf<HTMLElement>) {
    if (data) {
        target.forEach((node, index) => {
            node.children[1].textContent = `${numberFormat(data[index].winner)}조합`;
            node.children[2].textContent = `${numberFormat(data[index].winAmount)}원`;
        });
    } else {
        target[0].children[1].textContent = '금일 21시 10분에';
        target[0].children[2].textContent = '확인가능합니다';
    }
}

function makeWinReview(data: { id: number, title: string, created: string, img?: string }[]) {
    data.forEach(item => {
        const tab = document.createElement('a');
        tab.setAttribute('href', `/${getCategoryHtml('win', 'read')}?id=${item.id}`);
        tab.classList.add('review-tab');
        tab.classList.add('box-color');

        const imgBox = document.createElement('div');
        imgBox.classList.add('review-img-box');

        const img = document.createElement('img');
        //onerror="this.src='에러발생이미지';"
        item.img && img.setAttribute('src', item.img);
        !(item.img) && img.setAttribute('src', 'img/logo-blue.png');

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

export function makeWinNumBox(data: any) {
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
const winnerList = document.getElementById('winner-list');

function numberToOrdinal(rank: number) {
    switch (rank) {
        case 1: return 'first';
        case 2: return 'second';
        case 3: return 'third';
    }
}
export function moneyCompress(money: number) {
    if (money >= 100000000) return '약 ' + Math.round(money / 100000000) + '억원';
    else if (money >= 10000000) return '약 ' + Math.round(money / 10000) + '만원';
    else if (money >= 1000000) return '약 ' + Math.round(money / 10000) + '만원';
    else if(!money || money === 0) return '';
    else return money + '원';
}
function winnerHtml(winner: { rank: number, money: number, nickName: string }) {
    return `<div class="board-box">
    <div class="board-tab1">
        <span class="rank rank-${numberToOrdinal(winner.rank)}">
          <div class="rank-text">${winner.rank}</div>
        </span>
    </div>
    <div class="board-tab2">${moneyCompress(winner.money)}</div>
    <div class="board-tab3">${winner.nickName}</div>
  </div>`
}
export function makeWinnersList(winners: { rank: number, money: number, nickName: string }[]) {
    let html = '';
    winners.forEach(winner => {
        html += winnerHtml(winner);
    });
    winnerList.innerHTML = html;
}