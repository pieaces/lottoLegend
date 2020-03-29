import ChartBase from "../Chart/Charts";
import Slide from ".";
import { IDataAPI } from "../Layout";

export default class BarSlide extends Slide<ChartBase> {
    static readonly SIZE = 3;
    protected dataAPI:IDataAPI;

    constructor(barInstance: ChartBase, numBtns: NodeListOf<Element>, leftBtn: HTMLElement, rightBtn: HTMLElement, table?: HTMLElement, valueBox1?: HTMLElement, valueBox2?: HTMLElement) {
        super(BarSlide.SIZE, barInstance, numBtns, leftBtn, rightBtn, table, valueBox1, valueBox2);
    }
    setDataAPI(dataAPI:IDataAPI){
        this.dataAPI = dataAPI;
    }
    setData() {
        const rep = this.chart.dataBox.datasets[0];
        switch (this.current) {
            case 0:
                rep.data = this.dataAPI.getStats().ideal['latest'];
                rep.label = Slide.EXPECTED_TEXT;
                break;
            case 1:
                rep.data = this.dataAPI.getStats().actual['latest'];
                rep.label = Slide.ACTUAL_TEXT
                break;
            case 2:
                rep.label = '예상대비 초과비율(%)';
                const temp = [];
                for (let i = 0; i < this.dataAPI.getStats().ideal['latest'].length; i++) {
                    const datum = (this.dataAPI.getStats().actual['latest'][i] - this.dataAPI.getStats().ideal['latest'][i]) / this.dataAPI.getStats().ideal['latest'][i] * 100;
                    temp.push(datum);
                }
                rep.data = temp;
                break;
        }
        this.chart.update();
    }
    setText() {
        this.valueBox1.textContent = this.dataAPI.getCurrentName();

        switch (this.current) {
            case 0: this.valueBox2.textContent = Slide.EXPECTED_TEXT;
                break;
            case 1: this.valueBox2.textContent = Slide.ACTUAL_TEXT;
                break;
            case 2: this.valueBox2.textContent = '예상대비 초과비율(%)';
                break;
        }

        const data = [];
        data.push(this.dataAPI.getLabels());
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
        this.chart.dataBox.labels = this.dataAPI.getLabels();
        this.chart.dataBox.datasets[0].data = this.dataAPI.getStats().ideal['latest'];
        this.chart.dataBox.datasets[0].label = Slide.EXPECTED_TEXT;
        this.chart.update();
        this.setText();
    }
}
