import ChartBase from "../Chart/Charts";
import Slide from ".";
import DataAPI from "../DataAPI";

export default class BarSlide extends Slide<ChartBase> {
    static readonly SIZE = 3;
    constructor(barInstance: ChartBase, numBtns: NodeListOf<Element>, leftBtn: HTMLElement, rightBtn: HTMLElement, table?: HTMLElement, valueBox1?: HTMLElement, valueBox2?: HTMLElement) {
        super(BarSlide.SIZE, barInstance, numBtns, leftBtn, rightBtn, table, valueBox1, valueBox2);
    }
    setData() {
        const data = DataAPI.getInstance().getStats();
        const rep = this.chart.dataBox.datasets[0];
        switch (this.current) {
            case 0:
                rep.data = data.ideal['latest'];
                rep.label = Slide.EXPECTED_TEXT;
                break;
            case 1:
                rep.data = data.actual['latest'];
                rep.label = Slide.ACTUAL_TEXT
                break;
            case 2:
                rep.label = '예상개수 대비 실제개수 비율(%)';
                const temp = [];
                for (let i = 0; i < data.ideal['latest'].length; i++) {
                    const datum = (data.actual['latest'][i] - data.ideal['latest'][i]) / data.ideal['latest'][i] * 100;
                    temp.push(datum);
                }
                rep.data = temp;
                break;
        }
        this.chart.update();
    }
    setText() {
        this.valueBox1.textContent = DataAPI.getInstance().getCurrentName();

        switch (this.current) {
            case 0: this.valueBox2.textContent = Slide.EXPECTED_TEXT;
                break;
            case 1: this.valueBox2.textContent = Slide.ACTUAL_TEXT;
                break;
            case 2: this.valueBox2.textContent = '예상개수 대비 실제개수 비율(%)';
                break;
        }

        const data = [];
        data.push(DataAPI.getInstance().getLabels());
        const ideal: number[] = this.chart.dataBox.datasets[0].data as number[];
        data.push(ideal.map(num => {
            if (num === -100 || num === 100) return '-';
            else return num.toFixed(2);
        }));

        this.table.innerHTML = '';
        for (let i = 0; i < data[0].length; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < data.length; j++) {
                const td = document.createElement('td');
                td.textContent = String(data[j][i]);
                tr.appendChild(td);
            }
            this.table.appendChild(tr);
        }
    }
    init() {
        this.numBtns[this.current].classList.remove(this.CURRENT_CSS);
        this.current = 0;
        this.numBtns[this.current].classList.add(this.CURRENT_CSS);
        this.chart.dataBox.labels = DataAPI.getInstance().getLabels();
        this.chart.dataBox.datasets[0].data = DataAPI.getInstance().getStats().ideal['latest'];
        this.chart.dataBox.datasets[0].label = Slide.EXPECTED_TEXT;
        this.chart.update();
        this.setText();
    }
}
