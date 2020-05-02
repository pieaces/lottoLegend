import ChartBase from "../Chart/Charts";
import LineSlide from "./LineSlide";
import { IDataAPI } from "../Layout";
import {roundPointThree} from './functions';

export default class LineSlide2 extends LineSlide {
    protected dataAPI:IDataAPI;
    constructor(lineInstance: ChartBase, numBtns: NodeListOf<Element>, leftBtn: HTMLElement, rightBtn: HTMLElement, table?: HTMLElement, valueBox1?: HTMLElement, valueBox2?: HTMLElement) {
        super(lineInstance, numBtns, leftBtn, rightBtn, table, valueBox1, valueBox2);
    }
    setDataAPI(dataAPI:IDataAPI){
        this.dataAPI = dataAPI;
    }
    setText() {
        this.valueBox1.textContent = this.dataAPI.getCurrentName();
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
        data.push(this.dataAPI.getLabels());
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
        this.setData(this.dataAPI.getStats());
        this.numBtns[this.current].classList.remove(this.CURRENT_CSS);
        this.current = 0;
        this.numBtns[this.current].classList.add(this.CURRENT_CSS);
        this.chart.dataBox.labels = this.dataAPI.getLabels();
        this.chart.dataBox.datasets[0].data = this.data.ideal['$12'].map(num => roundPointThree(num));
        this.chart.dataBox.datasets[1].data = this.data.actual['$12'].map(num => roundPointThree(num));
        this.chart.update();
        this.setText();
    }
}