const priceCheckbox = document.querySelectorAll<HTMLInputElement>('.price-checkbox');
const priceContainer = document.querySelectorAll<HTMLElement>('.price-container');

checkboxToggle();

function checkboxToggle() {
    let current = null;
    const overEventHandler: (() => void)[] = [];
    const outEventHandler: (() => void)[] = [];
    for (let i = 0; i < priceCheckbox.length; i++) {
        priceCheckbox[i].addEventListener('click', () => {
            if (priceCheckbox[i].checked) {
                if (current === null) {

                } else {
                    priceCheckbox[current].checked = false;
                    priceContainer[current].style.transition = "transform 0.6s";
                    priceContainer[current].style.transform = "none";
                    ((priceCheckbox[current].parentNode as HTMLElement).previousElementSibling as HTMLElement).style.opacity = "1";
                    priceContainer[current].addEventListener('mouseover', overEventHandler[current]);
                    priceContainer[current].addEventListener('mouseout', outEventHandler[current]);
                }
                (priceCheckbox[i].parentNode.parentNode as HTMLElement).style.transition = "none";
                ((priceCheckbox[i].parentNode as HTMLElement).previousElementSibling as HTMLElement).style.opacity = "0";

                priceContainer[i].removeEventListener('mouseover', overEventHandler[i]);
                priceContainer[i].removeEventListener('mouseout', outEventHandler[i]);

                priceContainer[i].style.transform = "rotateY(180deg)";

                current = i;
            } else {
                priceContainer[i].style.transition = "transform 0.6s";
                ((priceCheckbox[i].parentNode as HTMLElement).previousElementSibling as HTMLElement).style.opacity = "1";
                priceContainer[i].addEventListener('mouseover', overEventHandler[i]);
                priceContainer[i].addEventListener('mouseout', outEventHandler[i]);
                current = null;
            }

        })
    }

    for (let i = 0; i < priceContainer.length; i++) {
        const overEvent = () => {
            priceContainer[i].style.transform = "rotateY(180deg)"
        }
        const outEvent = () => {
            priceContainer[i].style.transform = "none";
        }
        overEventHandler.push(overEvent);
        outEventHandler.push(outEvent);
        priceContainer[i].addEventListener('mouseover', overEvent);
        priceContainer[i].addEventListener('mouseout', outEvent);
    }

}

