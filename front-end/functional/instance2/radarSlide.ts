import RadarSlide from "../Slide/radarSlide";
import radarInstance from "./radarInstance";
import makeClickable from "../Slide/makeClickable";

const radarBtns = document.querySelectorAll('.func2-chart-radar-num > div');
const textBox = document.querySelector<HTMLElement>('.func2-chart-radar-text');

const radarSlide = new RadarSlide(radarInstance, null, null, radarBtns, textBox);
const clickEvent = {
    numBtns:
        [() => {
            radarInstance.canvas.style.transform = '';
            textBox.style.transform = '';
            radarInstance.canvas.classList.remove('none');

            textBox.classList.add('none');

        },
        () => {
            radarInstance.canvas.style.transform = 'translateX(-100%)';
            textBox.style.transform = 'translateX(-100%)';
            radarInstance.canvas.classList.add('none');

            textBox.classList.remove('none');

        }]
}
makeClickable(radarSlide, clickEvent);

export default radarSlide;