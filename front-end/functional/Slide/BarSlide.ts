import ChartBase from "../Chart/Charts";
import { Slide } from "./Slide";
import DataAPI from "../DataAPI";

export default class BarSlide extends Slide<ChartBase> {
    static readonly SIZE = 3;

    constructor(barInstance: ChartBase, leftBtn: HTMLElement, rightBtn: HTMLElement, numBtns: NodeListOf<Element>, textBox?: HTMLElement) {
        super(BarSlide.SIZE, barInstance, leftBtn, rightBtn, numBtns, textBox);
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
        super.init();
    }
}
