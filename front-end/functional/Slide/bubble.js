import DataAPI from '../DataAPI'

export default class BubbleChart {
  constructor(element) {
    this.element = element;
  }
  drawChart() {
    const dataBubble = [['ID', '전체적 맥락', '부분적 맥락', '희소성', '확률']];
    //const X = { max: -1, min: 1 };
    //const Y = { max: -1, min: 1 };

    const statsData = DataAPI.getInstance().getStats();
    const labels = DataAPI.getInstance().getLabels();
    for (let i = 0; i < statsData.ideal['all'].length; i++) {
      let x = statsData.ideal['all'][i] - statsData.actual['all'][i];
      if (statsData.ideal['all'][i] >= statsData.actual['all'][i])
        x /= statsData.ideal['all'][i];
      else x /= statsData.actual['all'][i];
      x *= statsData.pos[i];
      let y =
        statsData.ideal['latest'][i] - statsData.actual['latest'][i];
      if (statsData.ideal['latest'][i] >= statsData.actual['latest'][i])
        y /= statsData.ideal['latest'][i];
      else y /= statsData.actual['latest'][i];
      y *= statsData.pos[i];

      //if (x > X.max) X.max = x;
      //if (x < X.min) X.min = x;
      //if (y > Y.max) Y.max = y;
      //if (y < Y.min) Y.min = y;

      const data = [labels[i].toString(), x, y, y, statsData.pos[i]];
      dataBubble.push(data);
    }
    const dataTable = google.visualization.arrayToDataTable(dataBubble);
    const option = {
      bubble: { textStyle: { fontSize: 11 } },
      //hAxis: { maxValue: X.max, minValue: X.min },
      //vAxis: { maxValue: Y.max, minValue: Y.min },
      chartArea:{width:'50%',height:'75%'}
    };
console.log(option);
    const chart = new google.visualization.BubbleChart(this.element);
    chart.draw(dataTable, option);
  }

  init() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.drawChart();
    });
  }
}