function drawBubbleChart(ele, statData) {
  const dataBubble = [['ID', '전체적 맥락', '부분적 맥락', '희소성', '확률']];
  const X = { max: -1, min: 1 };
  const Y = { max: -1, min: 1 };

  for (let i = 0; i < statData.ideal['all'].length; i++) {
    let x = statData.ideal['all'][i] - statData.actual['all'][i];
    if (statData.ideal['all'][i] >= statData.actual['all'][i])
      x /= statData.ideal['all'][i];
    else x /= statData.actual['all'][i];
    x *= statData.pos[i];
    let y =
      statData.ideal['latest'][i] - statData.actual['latest'][i];
    if (statData.ideal['latest'][i] >= statData.actual['latest'][i])
      y /= statData.ideal['latest'][i];
    else y /= statData.actual['latest'][i];
    y *= statData.pos[i];

    if (x > X.max) X.max = x;
    if (x < X.min) X.min = x;
    if (y > Y.max) Y.max = y;
    if (y < Y.min) Y.min = y;

    const data = [String(i), x, y, y, statData.pos[i]];
    dataBubble.push(data);
  }

  const BubbleDataBox = google.visualization.arrayToDataTable(dataBubble);
  const C = 0.01;
  const BubbleOptions = {
    bubble: { textStyle: { fontSize: 11 } },
    hAxis: { maxValue: X.max + C, minValue: X.min - C },
    vAxis: { maxValue: Y.max + C, minValue: Y.min - C }
  };

  const chart = new google.visualization.BubbleChart(ele);
  chart.draw(BubbleDataBox, BubbleOptions);
}

function initBubbleChart(ele, statData) {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(function() {
    drawBubbleChart(ele, statData);
  });
}
