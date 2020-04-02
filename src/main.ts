import configure from './amplify/configure'
import { headerSign, isLogedIn } from './amplify/auth';

configure();
headerSign();

const main111Img = document.querySelector<HTMLElement>('.main-1-1-1 > img');
const imgBtn = document.querySelectorAll('.img-btn > i');

document.querySelector<HTMLElement>('.login-btn').onclick = () => {

}

backgroundImgSlide();

function backgroundImgSlide() {

    let i = 2;

    const slideIntervalId = setInterval(() => {
        main111Img.setAttribute('src', `img/${i}.png`);

        if (i === 1) {
            imgBtn[i - 1].classList.remove('fas');
            imgBtn[i - 1].classList.add('far');
            imgBtn[imgBtn.length - 1].classList.add('fas');
            imgBtn[imgBtn.length - 1].classList.remove('far');
        }
        else {
            imgBtn[i - 2].classList.add('fas');
            imgBtn[i - 2].classList.remove('far');
            imgBtn[i - 1].classList.remove('fas');
            imgBtn[i - 1].classList.add('far');
        }
        i++;
        if (i === imgBtn.length + 1) {
            i = 1;
        }
    }, 7000);

    for (let node = 0; node < imgBtn.length; node++) {
        imgBtn[node].addEventListener('click', () => {
            main111Img.setAttribute('src', `img/${node + 1}.png`);
            for (let i = 0; i < imgBtn.length; i++) {
                imgBtn[i].classList.add('fas');
                imgBtn[i].classList.remove('far');
            }
            imgBtn[node].classList.add('far');
            imgBtn[node].classList.remove('fas');
            clearInterval(slideIntervalId);
        })
    }
}