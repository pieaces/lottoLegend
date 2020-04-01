const priceCheckbox = document.querySelectorAll<HTMLInputElement>('.price-checkbox');
const priceContainer = document.querySelectorAll<HTMLElement>('.price-container');
const cardHoverBox = document.querySelectorAll<HTMLElement>('.price-service-anchor-hover-box');

checkboxToggle();

function checkboxToggle() {
    let current = null;
    const overEventHandler: (() => void)[] = [];
    const outEventHandler: (() => void)[] = [];
    for (let i = 0; i < priceContainer.length; i++) {
        priceContainer[i].addEventListener('click', function () {
            if (current === null) {
                priceContainer[i].classList.add("cardRotate");
                cardHoverBox[i].removeEventListener('mouseover', overEventHandler[i]);
                cardHoverBox[i].removeEventListener('mouseout', outEventHandler[i]);
                cardHoverBox[i].style.opacity = "0";
            } else {
                if (current !== i) {
                    priceContainer[current].classList.remove("cardRotate");
                    priceContainer[current].classList.add("backRotate");
                    priceContainer[i].classList.remove('backRotate');
                    priceContainer[i].classList.add("cardRotate");
                    cardHoverBox[current].addEventListener('mouseover', overEventHandler[current]);
                    cardHoverBox[current].addEventListener('mouseout', outEventHandler[current]);
                    cardHoverBox[current].style.opacity = "0";
                    cardHoverBox[i].removeEventListener('mouseover', overEventHandler[i]);
                    cardHoverBox[i].removeEventListener('mouseout', outEventHandler[i]);
                    cardHoverBox[i].style.opacity = "0";
                }
            }
            current = i;
        });

        const overEvent = () => {
            cardHoverBox[i].style.opacity = "1";
        }
        overEventHandler.push(overEvent);
        cardHoverBox[i].addEventListener('mouseover', overEvent);
        const outEvent = () => {
            cardHoverBox[i].style.opacity = "0";
        }
        outEventHandler.push(outEvent);
        cardHoverBox[i].addEventListener('mouseout', outEvent)
    }
}

