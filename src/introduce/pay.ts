const priceCheckbox = document.querySelectorAll<HTMLInputElement>('.price-checkbox');
const priceContainer = document.querySelectorAll<HTMLElement>('.price-container');

checkboxToggle();

function checkboxToggle() {
    let current = null;
    for (let i = 0; i < priceContainer.length; i++) {
        priceContainer[i].addEventListener('click', function () {
            if (current === null) {
                priceContainer[i].classList.add("cardRotate");
            } else {
                if (current !== i) {
                    priceContainer[current].classList.remove("cardRotate");
                    priceContainer[current].classList.add("backRotate");
                    priceContainer[i].classList.remove('backRotate');
                    priceContainer[i].classList.add("cardRotate");
                } else {
                    if (priceContainer[i].classList.contains('cardRotate')) {
                        priceContainer[i].classList.add('backRotate');
                        priceContainer[i].classList.remove("cardRotate");
                    } else {
                        priceContainer[i].classList.remove('backRotate');
                        priceContainer[i].classList.add("cardRotate");
                    }
                }
            }
            current = i;
        });
    }
}

