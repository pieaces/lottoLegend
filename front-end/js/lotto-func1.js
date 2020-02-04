const lottofunc1 = {
  lottoData: {
    oddCount: null
  }
};

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

const chartLineObject = {
  chartBox: chartLineBox,
  chartDataBox: chartLineDataBox,
  instance: chartLineInstance
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

const chartBarObject = {
  chartBox: chartBarBox,
  chartDataBox: chartBarDataBox,
  instance: chartBarInstance
};

const chartBubbleBox = document.querySelector('#chart-func1-bubble');

function drawBubbleChart() {
  const dataBubble = [['ID', '전체적 맥락', '부분적 맥락']];
  for (
    let i = 0;
    i < lottofunc1.lottoData.oddCount.data.ideal['all'].length;
    i++
  ) {
    const data = [
      String(i),
      lottofunc1.lottoData.oddCount.data.coef[i],
      (lottofunc1.lottoData.oddCount.data.ideal['all'][i] -
        lottofunc1.lottoData.oddCount.data.actual['all'][i]) /
        lottofunc1.lottoData.oddCount.total
    ];
    dataBubble.push(data);
  }
  console.log(dataBubble);

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

const leftLineChartBtn = document.querySelector('#left-line-chart-btn');
const rightLineChartBtn = document.querySelector('#right-line-chart-btn');
const leftBarChartBtn = document.querySelector('#left-bar-chart-btn');
const rightBarChartBtn = document.querySelector('#right-bar-chart-btn');
const chartLineNum = document.querySelectorAll('.chart-line-num > div');
const chartBarNum = document.querySelectorAll('.chart-bar-num > div');
const main14 = document.querySelector('.main-1-4');
const main16 = document.querySelector('.main-1-6');

function chartSlide(slideNum, slideOrder, chartObject, leftBtn, rightBtn) {
  let chartSlideCurrent = 0;
  leftBtn.addEventListener('click', () => {
    if (chartSlideCurrent <= 0) {
      chartSlideCurrent = 0;
    } else {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent--;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
    }
    setChartData(chartObject, chartSlideCurrent);

    leftChartBtnToggle(chartSlideCurrent);
  });
  rightBtn.addEventListener('click', e => {
    if (chartSlideCurrent === slideNum - 1) {
      chartSlideCurrent = 0;
      slideOrder[slideNum - 1].classList.remove('chart-slide-current');
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');

      if (e.target.parentNode.children[2].id === 'chart-func1-line') {
        main14.scrollIntoView({
          behavior: 'smooth'
        });
      } else if (e.target.parentNode.children[3].id === 'chart-func1-bar') {
        main16.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } else {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent++;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
    }
    leftChartBtnToggle(chartSlideCurrent);
    setChartData(chartObject, chartSlideCurrent);
  });

  for (let i = 0; i < slideNum; i++) {
    slideOrder[i].addEventListener('click', () => {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent = i;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
      leftChartBtnToggle(chartSlideCurrent);
      setChartData(chartObject, chartSlideCurrent);
    });
  }

  function leftChartBtnToggle(chartSlideCurrent) {
    if (chartSlideCurrent === 0) {
      leftBtn.style.display = 'none';
    } else {
      leftBtn.style.display = 'block';
    }
  }
}

function setChartData(chartObject, chartSlideCurrent) {
  const { chartBox, chartDataBox, instance } = chartObject;
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

function initChartData() {
  const map = new Map([
    [chartLineDataBox, '$12'],
    [chartBarDataBox, '$latest']
  ]);
  chartLineDataBox.datasets[0].data =
    lottofunc1.lottoData.oddCount.data.actual['$12'];
  chartLineDataBox.datasets[1].data =
    lottofunc1.lottoData.oddCount.data.ideal['$12'];
  chartLineInstance.update();

  chartBarDataBox.datasets[0].data =
    lottofunc1.lottoData.oddCount.data.ideal['latest'];
  chartBarDataBox.datasets[1].data =
    lottofunc1.lottoData.oddCount.data.actual['latest'];
  chartBarInstance.update();

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawBubbleChart);
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
    'https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/stats?method=oddCount', //API 주소, querystring = name
    { method: 'GET', headers }
  );
  const data = JSON.parse(await fetchResult.text());
  return data;
}

async function init() {
  await setLottoOddCount();
  initChartData();

  chartSlide(
    5,
    chartLineNum,
    chartLineObject,
    leftLineChartBtn,
    rightLineChartBtn
  );

  chartSlide(2, chartBarNum, chartBarObject, leftBarChartBtn, rightBarChartBtn);
}

init();
