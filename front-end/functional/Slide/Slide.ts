import { BarChart, ChartBase, LineChart } from "./Charts";
import DataAPI from "../DataAPI";

abstract class Slide<T extends ChartBase> {
    current: number;
    readonly size: number;
    readonly chart: T;
    readonly leftBtn: HTMLElement;
    readonly rightBtn: HTMLElement;
    readonly numBtns: NodeListOf<Element>;
    readonly textBox: HTMLElement;
    constructor(size: number, chart: T, leftBtn: HTMLElement, rightBtn: HTMLElement, numBtns: NodeListOf<Element>, textBox: HTMLElement) {
        this.current = 0;
        this.size = size;
        this.chart = chart;
        this.leftBtn = leftBtn;
        this.rightBtn = rightBtn;
        this.numBtns = numBtns;
        this.textBox = textBox;
    }
    abstract init(): void;
    abstract setData(): void;
    setText() {
        this.textBox.textContent = this.current.toString();
    }
}

export class BarSlide extends Slide<BarChart> {
    static readonly SIZE = 3;

    constructor(barCanvas: HTMLCanvasElement, leftBtn: HTMLElement, rightBtn: HTMLElement, numBtns: NodeListOf<Element>, textBox: HTMLElement) {
        super(BarSlide.SIZE, new BarChart(barCanvas), leftBtn, rightBtn, numBtns, textBox);
    }
    setData() {
        const data = DataAPI.getInstance().getStats();
        const rep = this.chart.dataBox.datasets[0];
        switch (this.current) {
            case 0:
                rep.data = data.ideal['latest'];
                break;
            case 1:
                rep.data = data.actual['latest'];
                break;
            case 2:
                const temp = [];
                for (let i = 0; i < data.ideal['latest'].length; i++) {
                    const datum = data.ideal['latest'][i] - data.actual['latest'][i];
                    temp.push(datum);
                }
                rep.data = temp;
                break;
        }
        this.chart.update();
    }
    init() {
        this.current = 0;
        this.chart.dataBox.labels = DataAPI.getInstance().getLabels();
        this.chart.dataBox.datasets[0].data = DataAPI.getInstance().getStats().ideal['latest'];
        this.chart.update();
    }
}

export class LineSlide extends Slide<LineChart> {
    static readonly SIZE = 5;
    private lineMap = { 0: '$12', 1: '$24', 2: '$48', 3: '$192', 4: 'all' }
    constructor(lineCanvas: HTMLCanvasElement, leftBtn: HTMLElement, rightBtn: HTMLElement, numBtns: NodeListOf<Element>, textBox: HTMLElement) {
        super(LineSlide.SIZE, new LineChart(lineCanvas), leftBtn, rightBtn, numBtns, textBox);
    }
    setData() {
        const data = DataAPI.getInstance().getStats();
        const rep1 = this.chart.dataBox.datasets[0];
        const rep2 = this.chart.dataBox.datasets[1];
        rep1.data = data.actual[this.lineMap[this.current]];
        rep2.data = data.ideal[this.lineMap[this.current]];
        this.chart.update();
    }
    init() {
        this.current = 0;
        const data = DataAPI.getInstance().getStats();
        this.chart.dataBox.labels = DataAPI.getInstance().getLabels();
        this.chart.dataBox.datasets[0].data = data.actual['$12'];
        this.chart.dataBox.datasets[1].data = data.ideal['$12'];
        this.chart.update();
    }
}