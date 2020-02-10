import ChartBase from "../Chart/Charts";
import DataAPI from "../DataAPI";

export abstract class Slide<T extends ChartBase> {
    current: number;
    readonly size: number;
    readonly chart: T;
    readonly leftBtn: HTMLElement;
    readonly rightBtn: HTMLElement;
    readonly numBtns: NodeListOf<Element>;
    readonly textBox?: HTMLElement;
    constructor(size: number, chart: T, leftBtn: HTMLElement, rightBtn: HTMLElement, numBtns: NodeListOf<Element>, textBox?: HTMLElement) {
        this.current = 0;
        this.size = size;
        this.chart = chart;
        this.leftBtn = leftBtn;
        this.rightBtn = rightBtn;
        this.numBtns = numBtns;
        this.textBox = textBox;
    }
    init(): void {
        this.numBtns.forEach(node => {
            node.classList.remove('func1-chart-slide-current');
        });
        Array.from(this.numBtns)[0].classList.add('func1-chart-slide-current');
    }
    abstract setData(): void;
    setText() {
        this.textBox.textContent = this.current.toString();
    }
}