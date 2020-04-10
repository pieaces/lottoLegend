import Slide from ".";
import ChartBase from "../Chart/Charts";

export default function makeClickable(obj: Slide<ChartBase>, setText?: () => void) {
    if (obj.leftBtn) {
        obj.leftBtn.addEventListener('click', () => {
            obj.numBtns[obj.current].classList.remove(obj.CURRENT_CSS);
            if (obj.current === 0) {
                obj.numBtns[obj.size - 1].classList.add(obj.CURRENT_CSS);
                obj.current = obj.size - 1;
            } else {
                obj.current--;
                obj.numBtns[obj.current].classList.add(obj.CURRENT_CSS);
            }
            obj.updateData();
            if (setText) setText.call(obj);
        });
    }
    if (obj.rightBtn) {
        obj.rightBtn.addEventListener('click', () => {
            if (obj.current === obj.size - 1) {
                obj.numBtns[obj.size - 1].classList.remove(obj.CURRENT_CSS);
                obj.current = 0;
            } else {
                obj.numBtns[obj.current].classList.remove(obj.CURRENT_CSS);
                obj.current++;
            }
            obj.numBtns[obj.current].classList.add(obj.CURRENT_CSS);
            obj.updateData();
            if (setText) setText.call(obj);
        });
    }

    if (obj.numBtns) {
        for (let i = 0; i < obj.numBtns.length; i++) {
            obj.numBtns[i].addEventListener('click', () => {
                obj.numBtns[obj.current].classList.remove(obj.CURRENT_CSS);
                obj.current = i;
                obj.numBtns[obj.current].classList.add(obj.CURRENT_CSS);
                obj.updateData();
                if (setText) setText.call(obj);
            });
        }
    }
}