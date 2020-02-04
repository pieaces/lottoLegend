const lottofunc1 = {
  lottoData: {
    oddCount: null
  }
};

const chartLineBox = document
  .querySelector('#chart-func1-line')
  .getContext('2d');

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

const chartBubbleBox = document.querySelector('#chart-func1-bubble');

const chartBubbleDataBox = {
  datasets: [
    {
      label: ['Deer Population'],
      data: null,
      backgroundColor: '#9966FF',
      hoverBackgroundColor: '#000000',
      hoverBorderColor: '#9966FF',
      hoverBorderWidth: 5,
      hoverRadius: 5
    }
  ]
};

const chartBubbleOptions = {
  legend: false,
  title: {
    display: true,
    text: 'Ice Cream Truck Report'
  }
};

const chartBubbleInstance = new Chart(chartBubbleBox, {
  type: 'bubble',
  data: chartBubbleDataBox,
  options: chartBubbleOptions
});

const leftLineChartBtn = document.querySelector('#left-line-chart-btn');
const rightLineChartBtn = document.querySelector('#right-line-chart-btn');
const leftBarChartBtn = document.querySelector('#left-bar-chart-btn');
const rightBarChartBtn = document.querySelector('#right-bar-chart-btn');
const chartLineNum = document.querySelectorAll('.chart-line-num > div');
const chartBarNum = document.querySelectorAll('.chart-bar-num > div');
const main14 = document.querySelector('.main-1-4');
const main16 = document.querySelector('.main-1-6');

function chartSlide(
  slideNum,
  slideOrder,
  chartBox,
  chartDataBox,
  instance,
  leftBtn,
  rightBtn
) {
  let chartSlideCurrent = 0;
  leftBtn.addEventListener('click', () => {
    if (chartSlideCurrent <= 0) {
      chartSlideCurrent = 0;
    } else {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent--;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
    }
    setChartData(chartBox, chartDataBox, chartSlideCurrent, instance);

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
    setChartData(chartBox, chartDataBox, chartSlideCurrent, instance);
  });

  for (let i = 0; i < slideNum; i++) {
    slideOrder[i].addEventListener('click', () => {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent = i;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
      leftChartBtnToggle(chartSlideCurrent);
      setChartData(chartBox, chartDataBox, chartSlideCurrent, instance);
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

function setChartData(chartBox, chartDataBox, chartSlideCurrent, instance) {
  const map = new Map([
    [0, '$12'], [1, '$24'], [2, '$48'], [3, '$192'], [4, 'all']
  ]);
  for (let i = 0; i < 5; i++) {
    if (chartBox.id === 'chart-func1-line') {
        chartDataBox.datasets[0].data =
          lottofunc1.lottoData.oddCount.actual[map.get(i)];
        chartDataBox.datasets[1].data =
          lottofunc1.lottoData.oddCount.ideal[map.get(i)];
        instance.update();
    }
  }
  if (chartBox.id === 'chart-func1-bar') {
    if (chartSlideCurrent === 0) {
      chartDataBox.datasets[0].data =
        lottofunc1.lottoData.oddCount.actual['latest'];
      chartDataBox.datasets[1].data =
        lottofunc1.lottoData.oddCount.ideal['latest'];
      instance.update();
    } else if (chartSlideCurrent === 1) {
      //상쓰에게 맡김
      chartDataBox.datasets[0].data =
        lottofunc1.lottoData.oddCount.actual['$12'];

      instance.update();
    }
  }
}

function initLineChartData() {
  chartLineDataBox.datasets[0].data =
    lottofunc1.lottoData.oddCount.actual['$12'];
  chartLineDataBox.datasets[1].data =
    lottofunc1.lottoData.oddCount.ideal['$12'];
  chartLineInstance.update();
}

async function setLottoOddCount() {
  let response = await getLottoOddCount();
  lottofunc1.lottoData.oddCount = response;
}

async function getLottoOddCount() {
  let response = await fetch(
    'https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/stats?method=oddCount'
  );
  let data = await response.json();
  return data;
}

async function init() {
  await setLottoOddCount();
  initLineChartData();
  chartSlide(
    5,
    chartLineNum,
    chartLineBox,
    chartLineDataBox,
    chartLineInstance,
    leftLineChartBtn,
    rightLineChartBtn
  );
}

init();
