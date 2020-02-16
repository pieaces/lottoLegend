import ChartBase from "../Chart/Charts";

export default abstract class Slide<T extends ChartBase> {
    current: number;
    readonly CURRENT_CSS = 'chart-slide-current'
    static readonly EXPECTED_TEXT = '예상개수';
    static readonly ACTUAL_TEXT = '실제개수';
    readonly size: number;
    readonly chart: T;
    readonly leftBtn: HTMLElement;
    readonly rightBtn: HTMLElement;
    readonly numBtns: NodeListOf<Element>;
    readonly table?: HTMLElement;
    readonly valueBox1?: HTMLElement;
    readonly valueBox2?: HTMLElement;
    constructor(size: number, chart: T, leftBtn: HTMLElement, rightBtn: HTMLElement, numBtns: NodeListOf<Element>, table?: HTMLElement, valueBox1?:HTMLElement, valueBox2?:HTMLElement) {
        this.current = 0;
        this.size = size;
        this.chart = chart;
        this.leftBtn = leftBtn;
        this.rightBtn = rightBtn;
        this.numBtns = numBtns;
        this.table = table;
        this.valueBox1 = valueBox1;
        this.valueBox2 = valueBox2;
    }

    abstract setData(): void;
    abstract setText(): void;
}