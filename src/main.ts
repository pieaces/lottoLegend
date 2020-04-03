import configure from './amplify/configure'
import { headerSign, isLogedIn } from './amplify/auth';

configure();
headerSign();

const main111Img = document.querySelector<HTMLElement>('.main-1-1-1 > a');
const imgBtn = document.querySelectorAll('.img-btn > i');
const winBox = document.querySelector<HTMLElement>('.win-num-box');
const winner = document.getElementById('winner');
const winAmount = document.getElementById('winAmount');
const winRound = document.getElementById('win-round');

document.querySelector<HTMLElement>('.login-btn').onclick = () => {

}

backgroundImgSlide();

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
            main111Img.setAttribute('href', 'introduce/trust.html');
            break;
        case 2:
            main111Img.setAttribute('href', 'introduce/event.html');
            break;
        case 3:
            main111Img.setAttribute('href', 'introduce/campaign.html');
            break;
    }
}