import configure from './amplify/configure'
import { headerSign, isLogedIn } from './amplify/auth';

configure();
headerSign();

const main11 = document.querySelector()
const imgBtn = document.querySelectorAll('.img-btn > i');

document.querySelector<HTMLElement>('.login-btn').onclick = () => {

}

function backgroundImgSlide() {

    let i = 2;

    const slideIntervalId = setInterval(() => {
        mainBackground.style.backgroundImage = `url(../img/main-background${i}.jpeg)`;

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
    }, 2000);

    for (let node = 0; node < imgBtn.length; node++) {
        imgBtn[node].addEventListener('click', () => {
            mainBackground.style.backgroundImage = `url(../img/main-background${node + 1}.jpeg)`;
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