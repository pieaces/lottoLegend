import ChartBase from "../Chart/Charts";
import Slide from ".";
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
                rep.data = data.actual['latest'];
                rep.label = '예측값(개수)';
                break;
            case 1:
                rep.data = data.ideal['latest'];
                rep.label = '실제값(개수)'
                break;
            case 2:
                rep.label = '예측값 대비 실제값 비율(%)';
                const temp = [];
                for (let i = 0; i < data.ideal['latest'].length; i++) {
                    const datum = (data.actual['latest'][i] - data.ideal['latest'][i])/data.ideal['latest'][i]*100;
                    temp.push(datum);
                }
                rep.data = temp;
                break;
        }
        this.chart.update();
    }
    setText() {
        this.textBox.textContent = this.current.toString();
    }
    init() {
        this.numBtns[this.current].classList.remove(this.CURRENT_CSS);
        this.current = 0;
        this.numBtns[this.current].classList.add(this.CURRENT_CSS);
        this.chart.dataBox.labels = DataAPI.getInstance().getLabels();
        this.chart.dataBox.datasets[0].data = DataAPI.getInstance().getStats().actual['latest'];
        this.chart.update();
    }
}
