import Slide from ".";
import ChartBase from "../Chart/Charts";

interface ClickEvent {
    leftBtn?: () => void;
    rightBtn?: () => void;
    numBtns?: (() => void)[];
}
export default function makeClickable(obj: Slide<ChartBase>, clickEvent: ClickEvent = {}) {
    console.log(clickEvent);
    const chartSlideCurrent = 'chart-slide-current';
    if (obj.leftBtn) {
        obj.leftBtn.addEventListener('click', () => {
            if (!clickEvent.leftBtn) {
                obj.numBtns[obj.current].classList.remove(chartSlideCurrent);
                if (obj.current === 0) {
                    obj.numBtns[obj.size - 1].classList.add(chartSlideCurrent);
                    obj.current = obj.size - 1;
                } else {
                    obj.current--;
                    obj.numBtns[obj.current].classList.add(chartSlideCurrent);
                }
                obj.setData();
                obj.setText();
            } else {
                clickEvent.leftBtn();
            }
        });
    }
    if (obj.rightBtn) {
        obj.rightBtn.addEventListener('click', () => {
            if (!clickEvent.rightBtn) {
                if (obj.current === obj.size - 1) {
                    obj.numBtns[obj.size - 1].classList.remove(chartSlideCurrent);
                    obj.current = 0;
                } else {
                    obj.numBtns[obj.current].classList.remove(chartSlideCurrent);
                    obj.current++;
                }
                obj.numBtns[obj.current].classList.add(chartSlideCurrent);
                obj.setData();
                obj.setText();
            } else {
                clickEvent.rightBtn();
            }
        });
    }

    if (obj.numBtns) {
        for (let i = 0; i < obj.numBtns.length; i++) {
            obj.numBtns[i].addEventListener('click', () => {
                obj.numBtns[obj.current].classList.remove(chartSlideCurrent);
                obj.current = i;
                obj.numBtns[obj.current].classList.add(chartSlideCurrent);
                if (!clickEvent.numBtns) {
                    obj.setData();
                    obj.setText();
                }
                if (clickEvent.numBtns) {
                    clickEvent.numBtns[i]();
                }
            });
        }

    }
}

function radarSlideTransform(radarEle: HTMLElement, textEle: HTMLElement) {
    console.log(textEle);
    radarEle.style.transform = 'translateX(-100%)';
    textEle.style.transform = 'translateX(-100%)';
}
function radarSlideRestore(radarEle: HTMLElement, textEle: HTMLElement) {
    radarEle.style.transform = '';
    textEle.style.transform = '';
}