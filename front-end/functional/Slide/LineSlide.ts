import Slide from "./Slide";
import ChartBase from "../Chart/Charts";
import DataAPI from "../DataAPI";

export default class LineSlide extends Slide<ChartBase> {
    static readonly SIZE = 5;
    private lineMap = { 0: '$12', 1: '$24', 2: '$48', 3: '$192', 4: 'all' }
    constructor(lineInstance: ChartBase, leftBtn: HTMLElement, rightBtn: HTMLElement, numBtns: NodeListOf<Element>, textBox?: HTMLElement) {
        super(LineSlide.SIZE, lineInstance, leftBtn, rightBtn, numBtns, textBox);
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
        super.init();
    }
}