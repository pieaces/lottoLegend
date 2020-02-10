import RadarSlide from "../Slide/radarSlide";
import radarInstance from "./radarInstance";
import makeClickable from "../Slide/makeClickable";

const numBtns = document.querySelectorAll('.fun2-radar-nums-btn');
const textBox = document.querySelector<HTMLElement>('.func2-chart-radar-text');

const radarSlide = new RadarSlide(radarInstance, null, null, numBtns, textBox);
makeClickable(radarSlide);

export default radarSlide;