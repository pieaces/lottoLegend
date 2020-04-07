import Slide from ".";
import ChartBase from "../Chart/Charts";

export default class LineSlide extends Slide<ChartBase> {
    static readonly SIZE = 5;
    protected data:any;
    private lineMap = ['$12', '$24', '$48', '$192', 'all'];
    constructor(lineInstance: ChartBase, numBtns: NodeListOf<Element>, leftBtn?: HTMLElement, rightBtn?: HTMLElement, table?: HTMLElement, valueBox1?: HTMLElement, valueBox2?: HTMLElement) {
        super(LineSlide.SIZE, lineInstance, numBtns, leftBtn, rightBtn, table, valueBox1, valueBox2);
    }
    setData() {
        const rep1 = this.chart.dataBox.datasets[0];
        const rep2 = this.chart.dataBox.datasets[1];
        rep1.data = this.data.ideal[this.lineMap[this.current]];
        rep2.data = this.data.actual[this.lineMap[this.current]];
        this.chart.update();
    }
    init(data:any){
        this.data = data;
        this.current = 0;
        this.chart.dataBox.datasets[0].data = this.data.ideal['$12'];
        this.chart.dataBox.datasets[1].data = this.data.actual['$12'];
        this.chart.update();
    }
}