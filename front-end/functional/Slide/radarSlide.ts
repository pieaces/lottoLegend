import Slide from ".";
import ChartBase from "../Chart/Charts";

export default class RadarSlide extends Slide<ChartBase>{
    static readonly SIZE = 2;

    constructor(radarInstance: ChartBase, leftBtn: HTMLElement, rightBtn: HTMLElement, numBtns: NodeListOf<Element>, textBox?: HTMLElement) {
        super(RadarSlide.SIZE, radarInstance, leftBtn, rightBtn, numBtns, textBox);
    }
    setData(): never {
        throw new Error("Method not implemented.");
    }
    setText() {
        this.textBox.textContent = this.current.toString();
    }
}