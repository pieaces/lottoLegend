const lottofunc1 = {
  lottoData: {
    oddCount: null
  }
};

function filterBoxCheck() {
  const filterBox = document.querySelector('.filter-box');
  const filterArrow = document.querySelector('.filter-arrow');
  const filterListBox = document.querySelector('.filter-list');
  const filterList = document.querySelectorAll('.filter-list > li');
  const filterSelectText = document.querySelector('.filter-box > a');

  let flag = true;
  filterBox.addEventListener('click', () => {
    if (flag) {
      filterArrow.classList.remove('fa-sort-down');
      filterArrow.classList.add('fa-sort-up');
      filterListBox.style.display = 'block';
      for (const node of filterList) {
        node.addEventListener('click', () => {
          filterSelectText.textContent = node.textContent;
        });
      }
    } else {
      filterArrow.classList.add('fa-sort-down');
      filterArrow.classList.remove('fa-sort-up');
      filterListBox.style.display = 'none';
    }
    flag = !flag;
  });
}

function drawBubbleChart() {
  const chartBubbleBox = document.querySelector('#chart-func1-bubble');
  const dataBubble = [['ID', '전체적 맥락', '부분적 맥락', '희소성', '확률']];
  const X = { max: -1, min: 1 };
  const Y = { max: -1, min: 1 };
  for (
    let i = 0;
    i < lottofunc1.lottoData.oddCount.data.ideal['all'].length;
    i++
  ) {
    let x =
      lottofunc1.lottoData.oddCount.data.ideal['all'][i] -
      lottofunc1.lottoData.oddCount.data.actual['all'][i];
    if (
      lottofunc1.lottoData.oddCount.data.ideal['all'][i] >=
      lottofunc1.lottoData.oddCount.data.actual['all'][i]
    )
      x /= lottofunc1.lottoData.oddCount.data.ideal['all'][i];
    else x /= lottofunc1.lottoData.oddCount.data.actual['all'][i];
    x *= lottofunc1.lottoData.oddCount.data.pos[i];
    let y =
      lottofunc1.lottoData.oddCount.data.ideal['latest'][i] -
      lottofunc1.lottoData.oddCount.data.actual['latest'][i];
    if (
      lottofunc1.lottoData.oddCount.data.ideal['latest'][i] >=
      lottofunc1.lottoData.oddCount.data.actual['latest'][i]
    )
      y /= lottofunc1.lottoData.oddCount.data.ideal['latest'][i];
    else y /= lottofunc1.lottoData.oddCount.data.actual['latest'][i];
    y *= lottofunc1.lottoData.oddCount.data.pos[i];

    if (x > X.max) X.max = x;
    if (x < X.min) X.min = x;
    if (y > Y.max) Y.max = y;
    if (y < Y.min) Y.min = y;

    const data = [
      String(i),
      x,
      y,
      y,
      lottofunc1.lottoData.oddCount.data.pos[i]
    ];
    dataBubble.push(data);
  }

  const chartBubbleDataBox = google.visualization.arrayToDataTable(dataBubble);
  const C = 0.01;
  const chartBubbleOptions = {
    bubble: { textStyle: { fontSize: 11 } },
    hAxis: { maxValue: X.max + C, minValue: X.min - C },
    vAxis: { maxValue: Y.max + C, minValue: Y.min - C }
  };

  const chart = new google.visualization.BubbleChart(chartBubbleBox);
  chart.draw(chartBubbleDataBox, chartBubbleOptions);
}

function chartSlide(chartSlideObj) {
  const {
    chartTextBox,
    slideNum,
    slideOrder,
    chartBox,
    chartDataBox,
    instance,
    leftChartBtn,
    rightChartBtn
  } = chartSlideObj;

  const chartDataObj = {
    chartBox: chartBox,
    chartDataBox: chartDataBox,
    instance: instance
  };

  const chartBtnObj = {
    chartTextBox: chartTextBox,
    slideNum: slideNum,
    slideOrder: slideOrder
  };

  const currentObj = {
    slideCurrent: 0
  };

  leftChartBtnClick(chartDataObj, chartBtnObj, leftChartBtn, currentObj);
  rightChartBtnClick(chartDataObj, chartBtnObj, rightChartBtn, currentObj);
  chartNumClick(chartDataObj, chartBtnObj, currentObj);
}

function chartNumClick(chartDataObj, chartBtnObj, currentObj) {
  const { slideNum, slideOrder, chartTextBox } = chartBtnObj;
  const { chartBox } = chartDataObj;
  for (let i = 0; i < slideNum; i++) {
    slideOrder[i].addEventListener('click', () => {
      slideOrder[currentObj.slideCurrent].classList.remove(
        'chart-slide-current'
      );
      currentObj.slideCurrent = i;
      slideOrder[currentObj.slideCurrent].classList.add('chart-slide-current');

      setChartData(chartDataObj, currentObj, slideNum);
      setChartText(chartBox, chartTextBox, currentObj, slideNum);
    });
  }
}

function setChartText(chartBox, chartTextBox, currentObj, slideNum) {
  if (chartBox.id === 'chart-func1-line') {
    for (let i = 0; i < slideNum; i++) {
      if (currentObj.slideCurrent === i) {
        chartTextBox.textContent = i;
      }
    }
  } else if (chartBox.id === 'chart-func1-bar') {
    for (let i = 0; i < slideNum; i++) {
      if (currentObj.slideCurrent === i) {
        chartTextBox.textContent = i;
      }
    }
  }
}

function leftChartBtnClick(
  chartDataObj,
  chartBtnObj,
  leftChartBtn,
  currentObj
) {
  const { chartBox } = chartDataObj;
  const { slideNum, slideOrder, chartTextBox } = chartBtnObj;

  leftChartBtn.addEventListener('click', () => {
    if (currentObj.slideCurrent === 0) {
      slideOrder[currentObj.slideCurrent].classList.remove(
        'chart-slide-current'
      );
      slideOrder[slideNum - 1].classList.add('chart-slide-current');
      currentObj.slideCurrent = slideNum - 1;
    } else {
      slideOrder[currentObj.slideCurrent].classList.remove(
        'chart-slide-current'
      );
      currentObj.slideCurrent--;
      slideOrder[currentObj.slideCurrent].classList.add('chart-slide-current');
    }
    setChartData(chartDataObj, currentObj, slideNum);
    setChartText(chartBox, chartTextBox, currentObj, slideNum);
  });
}
function rightChartBtnClick(
  chartDataObj,
  chartBtnObj,
  rightChartBtn,
  currentObj
) {
  const { chartBox } = chartDataObj;
  const { slideNum, slideOrder, chartTextBox } = chartBtnObj;

  rightChartBtn.addEventListener('click', e => {
    if (currentObj.slideCurrent === slideNum - 1) {
      currentObj.slideCurrent = 0;
      slideOrder[slideNum - 1].classList.remove('chart-slide-current');
      slideOrder[currentObj.slideCurrent].classList.add('chart-slide-current');
    } else {
      slideOrder[currentObj.slideCurrent].classList.remove(
        'chart-slide-current'
      );
      currentObj.slideCurrent++;
      slideOrder[currentObj.slideCurrent].classList.add('chart-slide-current');
    }

    setChartData(chartDataObj, currentObj, slideNum);
    setChartText(chartBox, chartTextBox, currentObj, slideNum);
  });
}

function setChartData(chartDataObj, currentObj, slideNum) {
  const { chartBox, chartDataBox, instance } = chartDataObj;

  if (chartBox.id === 'chart-func1-line') {
    const lineMap = new Map([
      [0, '$12'],
      [1, '$24'],
      [2, '$48'],
      [3, '$192'],
      [4, 'all']
    ]);
    chartDataBox.datasets[0].data =
      lottofunc1.lottoData.oddCount.data.actual[
        lineMap.get(currentObj.slideCurrent)
      ];
    chartDataBox.datasets[1].data =
      lottofunc1.lottoData.oddCount.data.ideal[
        lineMap.get(currentObj.slideCurrent)
      ];
    instance.update();
  }
  if (chartBox.id === 'chart-func1-bar') {
    for (let i = 0; i < slideNum - 1; i++) {
      if (currentObj.slideCurrent === i) {
        chartDataBox.datasets[0].data =
          lottofunc1.lottoData.oddCount.data.ideal['latest'];
        instance.update();
      }
    }
    if (currentObj.slideCurrent === slideNum - 1) {
      const datas = [];

      for (
        let i = 0;
        i < lottofunc1.lottoData.oddCount.data.ideal['latest'].length;
        i++
      ) {
        const data =
          lottofunc1.lottoData.oddCount.data.ideal['latest'][i] -
          lottofunc1.lottoData.oddCount.data.actual['latest'][i];
        datas.push(data);
      }
      chartDataBox.datasets[0].data = datas;

      instance.update();
    }
  }
}

function initChartData(chartInitDataBoxObj) {
  const { chartDataBox, instance } = chartInitDataBoxObj;

  chartDataBox[0].datasets[0].data =
    lottofunc1.lottoData.oddCount.data.actual['$12'];
  chartDataBox[0].datasets[1].data =
    lottofunc1.lottoData.oddCount.data.ideal['$12'];
  instance[0].update();

  chartDataBox[1].datasets[0].data =
    lottofunc1.lottoData.oddCount.data.ideal['latest'];
  instance[1].update();

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawBubbleChart);
}

function chartInit() {
  const leftLineChartBtn = document.querySelector('#left-line-chart-btn');
  const rightLineChartBtn = document.querySelector('#right-line-chart-btn');
  const leftBarChartBtn = document.querySelector('#left-bar-chart-btn');
  const rightBarChartBtn = document.querySelector('#right-bar-chart-btn');
  const main22 = document.querySelector('.main-2-2');
  const main23 = document.querySelector('.main-2-3');
  const chartLineNum = document.querySelectorAll('.chart-line-num > div');
  const chartBarNum = document.querySelectorAll('.chart-bar-num > div');
  const chartLineBox = document.querySelector('#chart-func1-line');

  const chartLineDataBox = {
    labels: [0, 1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: '실제값',
        backgroundColor: 'rgba(91, 81,255, 0.2)',
        pointBackgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'rgb(199, 54, 44)',
        data: null
      },
      {
        label: '이상값',
        backgroundColor: 'rgba(91, 81,255, 0.2)',
        pointBackgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'rgb(14,99,132)',
        data: null
      }
    ]
  };

  const chartLineOptions = {
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
  };

  const chartLineInstance = new Chart(chartLineBox, {
    type: 'line',
    data: chartLineDataBox,
    options: chartLineOptions
  });

  const chartLineSlideObj = {
    chartTextBox: main22,
    slideNum: 5,
    slideOrder: chartLineNum,
    chartBox: chartLineBox,
    chartDataBox: chartLineDataBox,
    instance: chartLineInstance,
    leftChartBtn: leftLineChartBtn,
    rightChartBtn: rightLineChartBtn
  };

  const chartBarBox = document.querySelector('#chart-func1-bar');

  const chartBarDataBox = {
    labels: [0, 1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: '이상값',
        backgroundColor: 'rgba(91, 81,255, 0.2)',
        pointBackgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'rgb(14,99,132)',
        data: null
      }
    ]
  };

  const chartBarOptions = {
    legend: false
  };

  const chartBarInstance = new Chart(chartBarBox, {
    type: 'bar',
    data: chartBarDataBox,
    options: chartBarOptions
  });

  const chartBarSlideObj = {
    chartTextBox: main23,
    slideNum: 3,
    slideOrder: chartBarNum,
    chartBox: chartBarBox,
    chartDataBox: chartBarDataBox,
    instance: chartBarInstance,
    leftChartBtn: leftBarChartBtn,
    rightChartBtn: rightBarChartBtn
  };

  const chartInitDataBoxObj = {
    chartDataBox: [chartLineDataBox, chartBarDataBox],
    instance: [chartLineInstance, chartBarInstance]
  };

  initChartData(chartInitDataBoxObj);

  chartSlide(chartLineSlideObj);

  chartSlide(chartBarSlideObj);
}

async function setLottoOddCount() {
  let response = await getLottoOddCount();
  lottofunc1.lottoData.oddCount = response;
}

async function getLottoOddCount() {
  const headers = {
    'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k' //API KEY
  };
  const fetchResult = await fetch(
    'https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/stats/oddCount?from=0&to=6', //API 주소, querystring = name
    { method: 'GET', headers }
  );
  const data = JSON.parse(await fetchResult.text());
  return data;
}

async function init() {
  filterBoxCheck();
  await setLottoOddCount();
  chartInit();
}

init();
