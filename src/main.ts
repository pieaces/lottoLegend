import configure from './amplify/configure'
import { getUnAuthAPI } from './amplify/api';
import { headerSign, isLogedIn } from './amplify/auth';

configure();
headerSign();

const main111Img = document.querySelector<HTMLElement>('.main-1-1-1 > a');
const imgBtn = document.querySelectorAll('.img-btn > i');
const winBox = document.querySelector<HTMLElement>('.win-num-box');
const winner = document.getElementById('winner');
const winAmount = document.getElementById('winAmount');
const winRound = document.getElementById('win-round');
const compartColor = ['#FBC400', '#69C8F2', '#FF7272', '#AAAAAA', '#B0D840'];


document.querySelector<HTMLElement>('.login-btn').onclick = () => {

}

backgroundImgSlide();
getUnAuthAPI('/main').then((data) =>{
    console.log(data);
    makeWinNumBox(data);
    winRound.textContent = data.round;
})
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