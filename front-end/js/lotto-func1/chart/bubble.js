const BubbleBox = document.querySelector('#chart-func1-bubble');

function drawBubbleChart() {
  const dataBubble = [['ID', '전체적 맥락', '부분적 맥락', '희소성', '확률']];
  const X = { max: -1, min: 1 };
  const Y = { max: -1, min: 1 };

  for (let i = 0; i < filter.getStats().ideal['all'].length; i++) {
    let x = filter.getStats().ideal['all'][i] - filter.getStats().actual['all'][i];
    if (filter.getStats().ideal['all'][i] >= filter.getStats().actual['all'][i])
      x /= filter.getStats().ideal['all'][i];
    else x /= filter.getStats().actual['all'][i];
    x *= filter.getStats().pos[i];
    let y =
      filter.getStats().ideal['latest'][i] - filter.getStats().actual['latest'][i];
    if (filter.getStats().ideal['latest'][i] >= filter.getStats().actual['latest'][i])
      y /= filter.getStats().ideal['latest'][i];
    else y /= filter.getStats().actual['latest'][i];
    y *= filter.getStats().pos[i];

    if (x > X.max) X.max = x;
    if (x < X.min) X.min = x;
    if (y > Y.max) Y.max = y;
    if (y < Y.min) Y.min = y;

    const data = [String(i), x, y, y, filter.getStats().pos[i]];
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
    drawBubbleChart(filter.getStats());
  });
}
