import Chart from 'chart.js'

export default class ChartBase {
    dataBox: Chart.ChartData;
    option: Chart.ChartOptions;
    instance: Chart;
    constructor(type: string, canvas: HTMLCanvasElement, dataBox: Chart.ChartData, option: Chart.ChartOptions) {
        this.dataBox = dataBox;
        this.option = option;
        this.instance = new Chart(canvas, {
            type: type,
            data: this.dataBox,
            options: this.option
        });
    }
    update(){
        this.instance.update();
    }
}