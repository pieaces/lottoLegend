google.charts.load('current', { packages: ['corechart'] });

export default class BubbleChart {
    constructor(element) {
        this.element = element;
    }
    setDataAPI(dataAPI) {
        this.dataAPI = dataAPI;
    }
    drawChart() {
        const dataBubble = [['ID', '전체 포화도', '최근 포화도', '종합계수', '확률']];

        const statsData = this.dataAPI.getStats();
        const labels = this.dataAPI.getLabels();
        const X = [];
        const Y = [];
        for (let i = 0; i < labels.length; i++) {
            let x = statsData.ideal['all'][i] - statsData.actual['all'][i];
            if (statsData.ideal['all'][i] >= statsData.actual['all'][i]) x /= statsData.ideal['all'][i];
            else x /= statsData.actual['all'][i];
            x *= statsData.pos[i];
            let y = statsData.ideal['latest'][i] - statsData.actual['latest'][i];
            if (statsData.ideal['latest'][i] >= statsData.actual['latest'][i]) y /= statsData.ideal['latest'][i];
            else y /= statsData.actual['latest'][i];
            y *= statsData.pos[i];

            X.push(x), Y.push(y);
            const data = [labels[i].toString(), x, y, Math.pow(2, x) * Math.pow(2, y), statsData.pos[i]];
            dataBubble.push(data);
        }
        let xmin = { value: X[0], index: 0 }, xmax = { value: X[0], index: 0 }, ymin = { value: Y[0], index: 0 }, ymax = { value: Y[0], index: 0 };
        for (let i = 1; i < labels.length; i++) {
            if (xmin.value > X[i]) {
                xmin.value = X[i];
                xmin.index = i;
            }
            if (ymin.value > Y[i]) {
                ymin.value = Y[i];
                ymin.index = i;
            }
            if (xmax.value < X[i]) {
                xmax.value = X[i];
                xmax.index = i;
            }
            if (ymax.value < Y[i]) {
                ymax.value = Y[i];
                ymax.index = i;
            }
        }
        document.getElementById('func1-bubble-all-most-value').textContent = labels[xmin.index];
        document.getElementById('func1-bubble-all-less-value').textContent = labels[xmax.index];
        document.getElementById('func1-bubble-five-most-value').textContent = labels[ymin.index];
        document.getElementById('func1-bubble-five-less-value').textContent = labels[ymax.index];

        const dataTable = google.visualization.arrayToDataTable(dataBubble);
        const option = {
            bubble: { textStyle: { fontSize: 11 } },
            chartArea: { width: '50%', height: '75%' },
        };
        const chart = new google.visualization.BubbleChart(this.element);
        chart.draw(dataTable, option);
    }

    init() {
        google.charts.setOnLoadCallback(() => {
            this.drawChart();
        });
    }
}