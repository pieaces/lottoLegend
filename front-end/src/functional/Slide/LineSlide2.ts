import ChartBase from "../Chart/Charts";
import DataAPI from "../DataAPI";
import LineSlide from "./LineSlide";

export default class LineSlide2 extends LineSlide {
    constructor(lineInstance: ChartBase, numBtns: NodeListOf<Element>, leftBtn: HTMLElement, rightBtn: HTMLElement, table?: HTMLElement, valueBox1?: HTMLElement, valueBox2?: HTMLElement) {
        super(lineInstance, numBtns, leftBtn, rightBtn, table, valueBox1, valueBox2);
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
            percent[i] = (actual[i] - ideal[i]) / ideal[i] * 100;
        }
        data.push(percent.map(num => {
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
        super.init(DataAPI.getInstance().getStats());
        this.numBtns[this.current].classList.remove(this.CURRENT_CSS);
        this.current = 0;
        this.numBtns[this.current].classList.add(this.CURRENT_CSS);
        this.chart.dataBox.labels = DataAPI.getInstance().getLabels();
        this.chart.dataBox.datasets[0].data = this.data.ideal['$12'];
        this.chart.dataBox.datasets[1].data = this.data.actual['$12'];
        this.chart.update();
        this.setText();
    }
}