import { BarSlide, LineSlide } from "./Slide";

export default function makeClickable(obj: BarSlide | LineSlide) {
    const chartSlideCurrent = 'func1-chart-slide-current';
    obj.leftBtn.addEventListener('click', () => {
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
    });

    obj.rightBtn.addEventListener('click', () => {
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
    });

    for (let i = 0; i < obj.numBtns.length; i++) {
        obj.numBtns[i].addEventListener('click', () => {
            obj.numBtns[obj.current].classList.remove(chartSlideCurrent);
            obj.current = i;
            obj.numBtns[obj.current].classList.add(chartSlideCurrent);

            obj.setData();
            obj.setText();
        });
    }
}