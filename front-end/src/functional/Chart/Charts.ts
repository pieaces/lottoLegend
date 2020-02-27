import Chart from 'chart.js'

export default class ChartBase {
    type: string;
    dataBox: Chart.ChartData;
    option: Chart.ChartOptions;
    instance: Chart;
    canvas: HTMLCanvasElement;
    constructor(type: string, canvas: HTMLCanvasElement, dataBox: Chart.ChartData, option: Chart.ChartOptions) {
        this.type = type;
        this.dataBox = dataBox;
        this.option = option;
        this.canvas = canvas;
    }
    create() {
        this.instance = new Chart(this.canvas, {
            type: this.type,
            data: this.dataBox,
            options: this.option
        });
    }
    update() {
        this.instance.update();
    }
    clear() {
        this.instance.data.datasets[0].data = null;
    }
}