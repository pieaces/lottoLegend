import Slide from ".";
import ChartBase from "../Chart/Charts";
import DataAPI from "../DataAPI";

export default class LineSlide extends Slide<ChartBase> {
    static readonly SIZE = 5;

    private lineMap = { 0: '$12', 1: '$24', 2: '$48', 3: '$192', 4: 'all' }
    constructor(lineInstance: ChartBase, leftBtn: HTMLElement, rightBtn: HTMLElement, numBtns: NodeListOf<Element>, table?: HTMLElement, valueBox1?: HTMLElement, valueBox2?: HTMLElement) {
        super(LineSlide.SIZE, lineInstance, leftBtn, rightBtn, numBtns, table, valueBox1, valueBox2);
    }
    setData() {
        const data = DataAPI.getInstance().getStats();
        const rep1 = this.chart.dataBox.datasets[0];
        const rep2 = this.chart.dataBox.datasets[1];
        rep1.data = data.ideal[this.lineMap[this.current]];
        rep2.data = data.actual[this.lineMap[this.current]];
        this.chart.update();
    }
    setText() {
        this.valueBox1.textContent = DataAPI.getInstance().getCurrentName();
        switch (this.current) {
            case 0: this.valueBox2.textContent = '1~12회차';
                break;
            case 1: this.valueBox2.textContent = '1~24회차';
                break;
            case 2: this.valueBox2.textContent = '1~48회차';
                break;
            case 3: this.valueBox2.textContent = '1~192회차';
                break;
            case 4: this.valueBox2.textContent = '전회차';
                break;
        }

        const data = [];
        data.push(DataAPI.getInstance().getLabels());
        const ideal: number[] = this.chart.dataBox.datasets[0].data as number[];
        const actual: number[] = this.chart.dataBox.datasets[1].data as number[];
        data.push(ideal.map(num => num.toFixed(2)));
        data.push(actual.map(num => num.toFixed(2)));
        const percent: number[] = [];
        for (let i = 0; i < ideal.length; i++) {
            percent[i] = (actual[i] - ideal[i]) / ideal[i]*100;
        }
        data.push(percent.map(num => num.toFixed(2)));

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
        const data = DataAPI.getInstance().getStats();
        this.chart.dataBox.labels = DataAPI.getInstance().getLabels();
        this.chart.dataBox.datasets[0].data = data.ideal['$12'];
        this.chart.dataBox.datasets[1].data = data.actual['$12'];
        this.chart.update();
        this.setText();
    }
}