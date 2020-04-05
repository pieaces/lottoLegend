import configure from './amplify/configure'
import { getUnAuthAPI } from './amplify/api';
import { getCategoryHtml, Category } from './board/functions';
import { isoStringToDate, numberFormat } from './functions';
import { signIn } from './amplify/auth'

configure();

const main111Img = document.querySelector<HTMLElement>('.main-image > a');
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
const commBox = document.querySelector('.community-content-box');
const commContent = document.querySelectorAll<HTMLElement>('.community-content');
const commContentAnchor = document.querySelectorAll<HTMLElement>('.community-content-title > a');
const userNameInput = document.querySelector<HTMLInputElement>('#id');
const passwordInput = document.querySelector<HTMLInputElement>('#password');

document.querySelector<HTMLElement>('.login-btn').onclick = async () => {
    const userName = userNameInput.value;
    const password = passwordInput.value;
    await signIn(userName, password);
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
function abc(){

}
getUnAuthAPI('/main/posts').then(data => {
    let current = 0;
    const tabs = ['pro', 'analysis', 'include', 'exclude', 'free'];
    console.log(data);
    makeBoard(data[tabs[current]]);

    for (let i = 0; i < commTab.length; i++) {
        commTab[i].addEventListener('click', () => {
            commTab[current].classList.remove('community-tab-current');
            current = i;
            commTab[i].classList.add('community-tab-current');
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
            commContent[i].children[1].textContent = data[i].created;
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