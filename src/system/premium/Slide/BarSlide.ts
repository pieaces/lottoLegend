import ChartBase from "../Chart/Charts";
import Slide from ".";
import {roundPointThree} from './functions';

export default class BarSlide extends Slide<ChartBase> {
    static readonly SIZE = 3;
    protected data:any;

    constructor(barInstance: ChartBase, numBtns: NodeListOf<Element>, leftBtn: HTMLElement, rightBtn: HTMLElement, table?: HTMLElement, valueBox1?: HTMLElement, valueBox2?: HTMLElement) {
        super(BarSlide.SIZE, barInstance, numBtns, leftBtn, rightBtn, table, valueBox1, valueBox2);
    }
    setData(data:any){
        this.data = data;
    }
    updateData() {
        const rep = this.chart.dataBox.datasets[0];
        switch (this.current) {
            case 0:
                rep.data = this.data.ideal['latest12'];
                rep.label = Slide.EXPECTED_TEXT;
                break;
            case 1:
                rep.data = this.data.actual['latest12'];
                rep.label = Slide.ACTUAL_TEXT
                break;
            case 2:
                rep.label = '예상대비 초과비율(%)';
                const temp = [];
                for (let i = 0; i < this.data.ideal['latest12'].length; i++) {
                    const datum = roundPointThree((this.data.actual['latest12'][i] - this.data.ideal['latest12'][i]) / this.data.ideal['latest12'][i] * 100);
                    temp.push(datum === -100 ? null : datum);
                }
                rep.data = temp;
                break;
        }
        this.chart.update();
    }
    init(){
        this.current = 0;
        this.chart.dataBox.datasets[0].data = this.data.ideal['latest12'].map(num => roundPointThree(num));
        this.chart.dataBox.datasets[0].label = Slide.EXPECTED_TEXT;
        this.chart.update();
    }
}
