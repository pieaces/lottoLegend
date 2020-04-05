import configure from './amplify/configure'
import { getUnAuthAPI } from './amplify/api';
import { getCategoryHtml, Category } from './board/functions';

configure();

const main111Img = document.querySelector<HTMLElement>('.main-image > a');
const imgBtn = document.querySelectorAll('.img-btn > i');
const winBox = document.querySelector<HTMLElement>('.win-num-box');
const winner = document.getElementById('winner');
const winAmount = document.getElementById('winAmount');
const winRound = document.getElementById('win-round');
const compartColor = ['#FBC400', '#69C8F2', '#FF7272', '#AAAAAA', '#B0D840'];
const officialWinResultBox = document.querySelectorAll<HTMLElement>('.total-win-result-box > div');
const myWinResultBox = document.querySelectorAll<HTMLElement>('.own-win-result-box > div');
const reviewTabs = document.querySelector('.review-tabs');
const commBox = document.querySelector('.community-box');
const winCount = document.querySelectorAll('.win-count-rank');
const commTab = document.querySelectorAll('.community-tab');
const commContentBox=document.querySelectorAll('.community-content-box');

document.querySelector<HTMLElement>('.login-btn').onclick = () => {

}

backgroundImgSlide();
getUnAuthAPI('/main/numbers').then(data => {
    console.log(data);
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
});
getUnAuthAPI('/main/posts').then(data =>{
    console.log(data);
    makeWinReview([{ title: "ㅇㅇㅇ", time: "2020-02-20" }, { title: "ㅇㅇㅇ", time: "2020-02-20" }, { title: "ㅇㅇㅇ", time: "2020-02-20" }, { title: "ㅇㅇㅇ", time: "2020-02-20" }, { title: "ㅇㅇㅇ", time: "2020-02-20" }]);
    for(let i=0;i<commContentBox.length;i++){
        const boardEl=makeBoard([{ title: "하이루이월수는 이리봅니다.", created: "2020-04-04" }, { title: "이번주 이월수는 이리봅니다.", created: "2020-04-04" }, { title: "이번주 이월수는 이리봅니다.", created: "2020-04-04" }, { title: "이번주 이월수는 이리봅니다.", created: "2020-04-04" }, { title: "이번주 이월수는 이리봅니다.", created: "2020-04-04" }]);
        commContentBox[i].appendChild(boardEl);
    }
    boardToggle();
});

function boardToggle() {
    let current = 0;
    const contentBox=document.querySelectorAll('.community-content-box');
    for (let i = 0; i < commTab.length; i++) {
        commTab[i].addEventListener('click', () => {
            commTab[current].classList.remove('community-tab-current');
            commTab[i].classList.add('community-tab-current');
            contentBox[current].classList.add('none');
            contentBox[i].classList.remove('none');
            current = i;
        })
    }
}

function insertWinCount(data) {
    data.forEach((item, index) => {
        winCount[index].textContent = item.toString();
    })
}


function makeBoard(data: { id?: number, category?: Category, title: string, created: string }[]):HTMLElement {
   const contentWrapper=document.createElement('div');
   contentWrapper.classList.add('community-content-wrapper');
    data.forEach(item => {
      const  box = document.createElement('div');
        box.classList.add('community-content');

        const title = document.createElement('div');
        title.classList.add('community-content-title');
        const anchor = document.createElement('a');
        anchor.setAttribute('href', `/${getCategoryHtml(item.category, 'read')}?id=${item.id}`);
        anchor.textContent = item.title;

        title.appendChild(anchor);
        box.appendChild(title);

        const time = document.createElement('div');
        time.classList.add('community-time');
        time.textContent = item.created;

        box.appendChild(time);
        contentWrapper.appendChild(box);
    })
    return contentWrapper;
}

function insertWinResult(data, target: NodeListOf<HTMLElement>) {
    Array.from(target).forEach((node, index) => {
        node.children[1].textContent = data[index].winner.toString();
        node.children[2].textContent = data[index].winAmount.toString();
    });
}

function makeWinReview(data) {
    data.forEach(item => {
        const tab = document.createElement('a');
        tab.setAttribute('href', '#');
        tab.classList.add('review-tab');
        tab.classList.add('box-color');

        const imgBox = document.createElement('div');
        imgBox.classList.add('review-img-box');

        const img = document.createElement('img');
        img.setAttribute('src', 'img/1.png');

        imgBox.appendChild(img);
        tab.appendChild(imgBox);

        const content = document.createElement('div');
        content.classList.add('review-content');
        content.textContent = item.title;

        tab.appendChild(content);

        const time = document.createElement('div');
        time.classList.add('review-time');

        time.textContent = item.time;

        tab.appendChild(time);
        reviewTabs.appendChild(tab);
    })
}

function makeWinNumBox(data: any) {
    winner.textContent = data.winner;
    winAmount.textContent = Math.round(data.winAmount / 100000000).toString();
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
        imgBranch(i);

        main111Img.firstElementChild.setAttribute('src', `img/${i}.png`);

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

            main111Img.firstElementChild.setAttribute('src', `img/${node + 1}.png`);

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

function imgBranch(order: number) {
    switch (order) {
        case 0:
            main111Img.setAttribute('href', 'introduce/system.html');
            break;
        case 1:
            main111Img.setAttribute('href', 'introduce/truth.html');
            break;
        case 2:
            main111Img.setAttribute('href', 'introduce/event.html');
            break;
        case 3:
            main111Img.setAttribute('href', 'introduce/campaign.html');
            break;
    }
}