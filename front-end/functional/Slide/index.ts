import ChartBase from "../Chart/Charts";

export default abstract class Slide<T extends ChartBase> {
    current: number;
    readonly CURRENT_CSS = 'chart-slide-current'
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

    abstract setData(): void;
    abstract setText(): void;
}