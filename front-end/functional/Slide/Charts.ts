import Chart from 'chart.js'

export class ChartBase {
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

export class BarChart extends ChartBase {
    constructor(canvas: HTMLCanvasElement) {
        const option = {
            legend: { display: false }
        }
        const dataBox = {
            labels: null,
            datasets: [
                {
                    backgroundColor: 'rgba(91, 81,255, 0.2)',
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: 'rgb(14,99,132)',
                    data: null
                }
            ]
        };
        super('bar', canvas, dataBox, option);
    }
}

export class LineChart extends ChartBase {
    constructor(ele: HTMLCanvasElement) {
        const option = {
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            color: 'rgba(200, 200, 200, 0.5)',
                            lineWidth: 1
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            color: 'rgba(200, 200, 200, 0.5)',
                            lineWidth: 1
                        }
                    }
                ]
            },
            legend: {
                display: false
            },
            tooltips: {
                titleFontFamily: 'Open Sans',
                backgroundColor: 'rgba(0,0,0,0.3)',
                titleFontColor: 'red',
                caretSize: 5,
                cornerRadius: 2,
                xPadding: 10,
                yPadding: 10
            }
        }
        const dataBox = {
            labels: null,
            datasets: [
                {
                    backgroundColor: 'rgba(91, 81,255, 0.2)',
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: 'rgb(199, 54, 44)',
                    data: null
                },
                {
                    backgroundColor: 'rgba(91, 81,255, 0.2)',
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: 'rgb(14,99,132)',
                    data: null
                }
            ]
        };
        super('line', ele, dataBox, option);
    }
}