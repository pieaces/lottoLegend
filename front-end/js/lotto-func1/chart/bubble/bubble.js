const BubbleBox = document.querySelector('#chart-func1-bubble');

function drawBubbleChart() {
  const dataBubble = [['ID', '전체적 맥락', '부분적 맥락', '희소성', '확률']];
  const X = { max: -1, min: 1 };
  const Y = { max: -1, min: 1 };

  for (let i = 0; i < chartData.data.ideal['all'].length; i++) {
    let x = chartData.data.ideal['all'][i] - chartData.data.actual['all'][i];
    if (chartData.data.ideal['all'][i] >= chartData.data.actual['all'][i])
      x /= chartData.data.ideal['all'][i];
    else x /= chartData.data.actual['all'][i];
    x *= chartData.data.pos[i];
    let y =
      chartData.data.ideal['latest'][i] - chartData.data.actual['latest'][i];
    if (chartData.data.ideal['latest'][i] >= chartData.data.actual['latest'][i])
      y /= chartData.data.ideal['latest'][i];
    else y /= chartData.data.actual['latest'][i];
    y *= chartData.data.pos[i];

    if (x > X.max) X.max = x;
    if (x < X.min) X.min = x;
    if (y > Y.max) Y.max = y;
    if (y < Y.min) Y.min = y;

    const data = [String(i), x, y, y, chartData.data.pos[i]];
    dataBubble.push(data);
  }

  const BubbleDataBox = google.visualization.arrayToDataTable(dataBubble);
  const C = 0.01;
  const BubbleOptions = {
    bubble: { textStyle: { fontSize: 11 } },
    hAxis: { maxValue: X.max + C, minValue: X.min - C },
    vAxis: { maxValue: Y.max + C, minValue: Y.min - C }
  };

  const chart = new google.visualization.BubbleChart(BubbleBox);
  chart.draw(BubbleDataBox, BubbleOptions);
}

function initBubbleChartData() {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(function() {
    drawBubbleChart(chartData.data);
  });
}
