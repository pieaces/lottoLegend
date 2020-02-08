class Bubble {
  constructor(ele, filter) {
    this.ele = ele;
    this.filter = filter;
  }
  drawBubbleChart() {
    const dataBubble = [['ID', '전체적 맥락', '부분적 맥락', '희소성', '확률']];
    const X = { max: -1, min: 1 };
    const Y = { max: -1, min: 1 };

    const statsData = this.filter.getStats();
    const labels = this.filter.getLabel();
    console.log(labels);
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

      if (x > X.max) X.max = x;
      if (x < X.min) X.min = x;
      if (y > Y.max) Y.max = y;
      if (y < Y.min) Y.min = y;

      const data = [labels[i].toString(), x, y, y, statsData.pos[i]];
      dataBubble.push(data);
    }

    const BubbleDataBox = google.visualization.arrayToDataTable(dataBubble);
    const C = 0.01;
    const BubbleOptions = {
      bubble: { textStyle: { fontSize: 11 } },
      hAxis: { maxValue: X.max + C, minValue: X.min - C },
      vAxis: { maxValue: Y.max + C, minValue: Y.min - C }
    };

    const chart = new google.visualization.BubbleChart(this.ele);
    chart.draw(BubbleDataBox, BubbleOptions);
  }

  init() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.drawBubbleChart();
    });
  }
}