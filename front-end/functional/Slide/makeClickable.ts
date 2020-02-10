import BarSlide from "./BarSlide";
import LineSlide from "./LineSlide";
import RadarSlide from "./radarSlide";

type SlideType = BarSlide | LineSlide | RadarSlide;
export default function makeClickable(obj: SlideType) {
    console.log(isRadarSlide(obj), obj);
    const chartSlideCurrent = 'func1-chart-slide-current';

    if (!isRadarSlide(obj)) {
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
    }
    for (let i = 0; i < obj.numBtns.length; i++) {
        if (obj.numBtns) {
            obj.numBtns[i].addEventListener('click', () => {
                obj.numBtns[obj.current].classList.remove(chartSlideCurrent);
                obj.current = i;
                obj.numBtns[obj.current].classList.add(chartSlideCurrent);
                if (!isRadarSlide(obj)) {
                    obj.setData();
                    obj.setText();
                } else {
                    if (i === 0) {
                        radarSlideRestore(obj.chart.canvas, obj.textBox);
                        console.log('0')
                    } else if (i === 1) {
                        radarSlideTransform(obj.chart.canvas, obj.textBox);
                        
                        console.log('1')
                    }
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

function isRadarSlide(obj: SlideType): obj is RadarSlide {
    return (obj.chart.type === 'radar');
}