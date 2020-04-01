const priceCheckbox = document.querySelectorAll<HTMLInputElement>('.price-checkbox');
const priceContainer = document.querySelectorAll<HTMLElement>('.price-container');
const priceBox = document.querySelectorAll<HTMLElement>('.price-box');
const priceAnchorBox = document.querySelectorAll<HTMLElement>('.price-service-anchor-box');
const priceAnchorHoverBox = document.querySelectorAll<HTMLElement>('.price-service-anchor-hover-box');

checkboxToggle();

function checkboxToggle() {
    let current = null;
    for (let i = 0; i < priceContainer.length; i++) {
        priceContainer[i].addEventListener('click', function () {
            if (current === null) {
                priceBox[i].style.transform = "perspective(1200px) rotateY(-179.9deg)";
                priceAnchorBox[i].style.transform = "perspective(1200px) rotateY(0)";
            } else {
                if (current !== i) {
                    priceBox[current].style.transform = "perspective(1000px) rotateY(0deg)";
                    priceAnchorBox[current].style.transform = "perspective(1200px) rotateY(180deg)";
                    priceBox[i].style.transform = "perspective(1200px) rotateY(-179.9deg)";
                    priceAnchorBox[i].style.transform = "perspective(1200px) rotateY(0)";
                }
            }
            current = i;
        });
    }
}

