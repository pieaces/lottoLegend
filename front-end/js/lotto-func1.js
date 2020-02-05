const lottofunc1 = {
  lottoData: {
    oddCount: null
  }
};

function filterBoxCheck() {
  const filterBox = document.querySelector('.filter-box');
  const filterArrow = document.querySelector('.filter-arrow');
  const filterList = document.querySelector('.filter-list');
  let flag = true;
  filterBox.addEventListener('click', () => {
    if (flag) {
      filterArrow.classList.remove('fa-sort-down');
      filterArrow.classList.add('fa-sort-up');
      filterList.style.display = 'block';
    } else {
      filterArrow.classList.add('fa-sort-down');
      filterArrow.classList.remove('fa-sort-up');
      filterList.style.display = 'none';
    }
    flag = !flag;
  });
}

function drawBubbleChart() {
  const chartBubbleBox = document.querySelector('#chart-func1-bubble');
  const dataBubble = [['ID', '전체적 맥락', '부분적 맥락']];
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

    const data = [String(i), x, y];
    dataBubble.push(data);
  }

  const chartBubbleDataBox = google.visualization.arrayToDataTable(dataBubble);

  const chartBubbleOptions = {
    title:
      'Correlation between life expectancy, fertility rate ' +
      'and population of some world countries (2010)',

    bubble: { textStyle: { fontSize: 11 } },
    hAxis: { maxValue: 0.2, minValue: -0.2 },
    vAxis: { maxValue: 0.2, minValue: -0.2 }
  };

  const chart = new google.visualization.BubbleChart(chartBubbleBox);
  chart.draw(chartBubbleDataBox, chartBubbleOptions);
}

function chartSlide(chartSlideObj) {
  const {
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

  let chartSlideCurrent = 0;
  const main13 = document.querySelector('.main-1-3');
  const main14 = document.querySelector('.main-1-4');
  leftChartBtn.addEventListener('click', () => {
    if (chartSlideCurrent <= 0) {
      chartSlideCurrent = 0;
    } else {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent--;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
    }
    setChartData(chartDataObj, chartSlideCurrent);

    leftChartBtnToggle(chartSlideCurrent, leftChartBtn);
  });
  rightChartBtn.addEventListener('click', e => {
    if (chartSlideCurrent === slideNum - 1) {
      chartSlideCurrent = 0;
      slideOrder[slideNum - 1].classList.remove('chart-slide-current');
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
    } else {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent++;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
    }
    leftChartBtnToggle(chartSlideCurrent, leftChartBtn);
    setChartData(chartDataObj, chartSlideCurrent);
  });

  for (let i = 0; i < slideNum; i++) {
    slideOrder[i].addEventListener('click', () => {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent = i;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
      leftChartBtnToggle(chartSlideCurrent, leftChartBtn);
      setChartData(chartDataObj, chartSlideCurrent);
    });
  }
}

function leftChartBtnToggle(chartSlideCurrent, leftChartBtn) {
  if (chartSlideCurrent === 0) {
    leftChartBtn.style.display = 'none';
  } else {
    leftChartBtn.style.display = 'block';
  }
}

function setChartData(chartDataObj, chartSlideCurrent) {
  const { chartBox, chartDataBox, instance } = chartDataObj;
  const lineMap = new Map([
    [0, '$12'],
    [1, '$24'],
    [2, '$48'],
    [3, '$192'],
    [4, 'all']
  ]);

  if (chartBox.id === 'chart-func1-line') {
    chartDataBox.datasets[0].data =
      lottofunc1.lottoData.oddCount.data.actual[lineMap.get(chartSlideCurrent)];
    chartDataBox.datasets[1].data =
      lottofunc1.lottoData.oddCount.data.ideal[lineMap.get(chartSlideCurrent)];
    instance.update();
  }
  if (chartBox.id === 'chart-func1-bar') {
    if (chartSlideCurrent === 0) {
      chartDataBox.datasets[0].data =
        lottofunc1.lottoData.oddCount.data.actual['latest'];
      chartDataBox.datasets[1].data =
        lottofunc1.lottoData.oddCount.data.ideal['latest'];
      instance.update();
    } else if (chartSlideCurrent === 1) {
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

      chartDataBox.datasets[1].data = null;
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
  chartDataBox[1].datasets[1].data =
    lottofunc1.lottoData.oddCount.data.actual['latest'];
  instance[1].update();

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawBubbleChart);
}

function chartInit() {
  const leftLineChartBtn = document.querySelector('#left-line-chart-btn');
  const rightLineChartBtn = document.querySelector('#right-line-chart-btn');
  const leftBarChartBtn = document.querySelector('#left-bar-chart-btn');
  const rightBarChartBtn = document.querySelector('#right-bar-chart-btn');

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
    responsive: false,
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

  const chartBarOptions = {
    legend: false,
    title: {
      display: true,
      text: 'Ice Cream Truck Report'
    }
  };

  const chartBarInstance = new Chart(chartBarBox, {
    type: 'bar',
    data: chartBarDataBox,
    options: chartBarOptions
  });

  const chartBarSlideObj = {
    slideNum: 2,
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
