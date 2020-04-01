const priceCheckbox = document.querySelectorAll<HTMLInputElement>('.price-checkbox');
const priceContainer = document.querySelectorAll<HTMLElement>('.price-container');
const priceBox = document.querySelectorAll<HTMLElement>('.price-box');
const priceAnchorBox = document.querySelectorAll<HTMLElement>('.price-service-anchor-box');

checkboxToggle();

function checkboxToggle() {
    let current = null;
    const frontOverEventHandler: (() => void)[] = [];
    const frontOutEventHandler: (() => void)[] = [];
    const backOverEventHandler: (() => void)[] = [];
    const backOutEventHandler: (() => void)[] = [];
    for (let i = 0; i < priceContainer.length; i++) {
        priceContainer[i].addEventListener('click', function () {
            if (current === null) {
                priceContainer[i].removeEventListener('mouseover', frontOverEventHandler[i]);
                priceContainer[i].removeEventListener('mouseout', frontOutEventHandler[i]);
                priceContainer[i].removeEventListener('mouseover', backOverEventHandler[i]);
                priceContainer[i].removeEventListener('mouseout', backOutEventHandler[i]);
                priceAnchorBox[i].style.backgroundColor = "rgba(0,0,0,0.8)";
            } else {
                if (current !== i) {
                    priceContainer[current].addEventListener('mouseover', frontOverEventHandler[current]);
                    priceContainer[current].addEventListener('mouseout', frontOutEventHandler[current]);
                    priceContainer[current].addEventListener('mouseover', backOverEventHandler[current]);
                    priceContainer[current].addEventListener('mouseout', backOutEventHandler[current]);
                    priceBox[current].style.transform = "perspective(1000px) rotateY(0deg)";
                    priceAnchorBox[current].style.transform = "perspective(1200px) rotateY(180deg)";
                    priceAnchorBox[current].style.backgroundColor = "rgba(0,0,0,0.4)";
                    priceContainer[i].removeEventListener('mouseover', frontOverEventHandler[i]);
                    priceContainer[i].removeEventListener('mouseout', frontOutEventHandler[i]);
                    priceContainer[i].removeEventListener('mouseover', backOverEventHandler[i]);
                    priceContainer[i].removeEventListener('mouseout', backOutEventHandler[i]);
                    priceAnchorBox[i].style.backgroundColor = "rgba(0,0,0,0.8)";
                }
            }
            current = i;
        });

        const frontOverEvent = () => {
            priceBox[i].style.transform = "perspective(1200px) rotateY(-179.9deg)";
        }
        frontOverEventHandler.push(frontOverEvent);
        priceContainer[i].addEventListener('mouseover', frontOverEvent);
        const frontOutEvent = () => {
            priceBox[i].style.transform = "perspective(1000px) rotateY(0deg)";
        }
        frontOutEventHandler.push(frontOutEvent);
        priceContainer[i].addEventListener('mouseout', frontOutEvent);

        const backOverEvent = () => {
            priceAnchorBox[i].style.transform = "perspective(1200px) rotateY(0)";
        }
        backOverEventHandler.push(backOverEvent);
        priceContainer[i].addEventListener('mouseover', backOverEvent);
        const backOutEvent = () => {
            priceAnchorBox[i].style.transform = "perspective(1200px) rotateY(180deg)";
        }
        backOutEventHandler.push(backOutEvent);
        priceContainer[i].addEventListener('mouseout', backOutEvent);
    }
}

