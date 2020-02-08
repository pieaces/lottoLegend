import { BarSlide, LineSlide } from "./Slide";

export default function makeClickable(obj: BarSlide | LineSlide) {
    obj.leftBtn.addEventListener('click', () => {
        obj.numBtns[obj.current].classList.remove('chart-slide-current');
        if (obj.current === 0) {
            obj.numBtns[obj.size - 1].classList.add('chart-slide-current');
            obj.current = obj.size - 1;
        } else {
            obj.current--;
            obj.numBtns[obj.current].classList.add('chart-slide-current');
        }
        obj.setData();
        obj.setText();
    });

    obj.rightBtn.addEventListener('click', () => {
        if (obj.current === obj.size - 1) {
            obj.numBtns[obj.size - 1].classList.remove('chart-slide-current');
            obj.current = 0;
        } else {
            obj.numBtns[obj.current].classList.remove('chart-slide-current');
            obj.current++;
        }
        obj.numBtns[obj.current].classList.add('chart-slide-current');

        obj.setData();
        obj.setText();
    });

    for (let i = 0; i < obj.numBtns.length; i++) {
        obj.numBtns[i].addEventListener('click', () => {
            obj.numBtns[obj.current].classList.remove('chart-slide-current');
            obj.current = i;
            obj.numBtns[obj.current].classList.add('chart-slide-current');

            obj.setData();
            obj.setText();
        });
    }
}