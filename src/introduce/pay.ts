const priceCheckbox = document.querySelectorAll<HTMLInputElement>('.price-checkbox');
const priceContainer = document.querySelectorAll<HTMLElement>('.price-container');
const priceBox = document.querySelectorAll<HTMLElement>('.price-box');
const priceAnchorBox = document.querySelectorAll<HTMLElement>('.price-service-anchor-box');
const priceAnchorHoverBox = document.querySelectorAll<HTMLElement>('.price-service-anchor-hover-box');

checkboxToggle();

function checkboxToggle() {
    const overEventHandler: (() => void)[] = [];
    const outEventHandler: (() => void)[] = [];
    let current = null;
    for (let i = 0; i < priceContainer.length; i++) {
        priceContainer[i].addEventListener('click', function () {
            if (current !== i) {
                if (current !== null) { // 다른 곳이 이미 선택된 상태에서 또 다른 곳을 선택할 때 
                    priceBox[current].style.transform = "perspective(1000px) rotateY(0deg)";
                    priceAnchorBox[current].style.transform = "perspective(1200px) rotateY(180deg)";
                    priceAnchorHoverBox[current].style.transform = "perspective(1000px) rotateY(0deg)";
                    priceAnchorHoverBox[current].addEventListener('mouseover', overEventHandler[current]);
                    priceAnchorHoverBox[current].addEventListener('mouseout', outEventHandler[current]);
                } //처음 선택할때 + 다른 곳이 이미 선택된 상태에서 또 다른 곳을 선택할 때  
                priceBox[i].style.transform = "perspective(1200px) rotateY(-179.9deg)";
                priceAnchorBox[i].style.transform = "perspective(1200px) rotateY(0)";
                priceAnchorHoverBox[i].removeEventListener('mouseover', overEventHandler[i]);
                priceAnchorHoverBox[i].removeEventListener('mouseout', outEventHandler[i]);
                priceAnchorHoverBox[i].style.transform = "perspective(1200px) rotateY(-179.9deg)";
                priceAnchorHoverBox[i].style.opacity = "0";
            }
            current = i;
        });

        const overEvent = () => {
            priceAnchorHoverBox[i].style.opacity = "1";
        }
        priceAnchorHoverBox[i].addEventListener('mouseover', overEvent);
        overEventHandler.push(overEvent);

        const outEvent = () => {
            priceAnchorHoverBox[i].style.opacity = "0";
        };
        priceAnchorHoverBox[i].addEventListener('mouseout', outEvent);
        outEventHandler.push(outEvent);
    }
}

