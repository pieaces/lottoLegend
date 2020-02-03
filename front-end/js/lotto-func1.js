const lottofunc1 = {
  chartLineData: [
    {
      real: [0, 0, 1, 5, 3, 2, 1],
      ideal: [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ]
    },
    {
      real: [1, 1, 4, 8, 5, 4, 1],
      ideal: [
        0.3276968328450385,
        2.055552860573423,
        5.372467703771444,
        7.488894374954133,
        5.871973998543583,
        2.4555527630273155,
        0.4278614662850625
      ]
    },
    {
      real: [0, 0, 1, 5, 3, 2, 1],
      ideal: [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ]
    },
    {
      real: [1, 1, 4, 8, 5, 4, 1],
      ideal: [
        0.3276968328450385,
        2.055552860573423,
        5.372467703771444,
        7.488894374954133,
        5.871973998543583,
        2.4555527630273155,
        0.4278614662850625
      ]
    },
    {
      real: [0, 0, 1, 5, 3, 2, 1],
      ideal: [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ]
    }
  ],
  chartBarData: [
    {
      real: [1, 1, 4, 8, 5, 4, 1],
      ideal: [
        0.3276968328450385,
        2.055552860573423,
        5.372467703771444,
        7.488894374954133,
        5.871973998543583,
        2.4555527630273155,
        0.4278614662850625
      ]
    },
    {
      real: [0, 0, 1, 5, 3, 2, 1],
      ideal: [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ]
    },
    {
      real: [1, 1, 4, 8, 5, 4, 1],
      ideal: [
        0.3276968328450385,
        2.055552860573423,
        5.372467703771444,
        7.488894374954133,
        5.871973998543583,
        2.4555527630273155,
        0.4278614662850625
      ]
    }
  ]
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
      data: lottofunc1.chartLineData[0].real
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: lottofunc1.chartLineData[0].ideal
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
      data: lottofunc1.chartLineData[0].real
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: lottofunc1.chartLineData[0].ideal
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
      data: [
        {
          x: 100,
          y: 0,
          r: 10
        },
        {
          x: 60,
          y: 30,
          r: 20
        },
        {
          x: 40,
          y: 60,
          r: 25
        },
        {
          x: 80,
          y: 80,
          r: 50
        },
        {
          x: 20,
          y: 30,
          r: 25
        },
        {
          x: 0,
          y: 100,
          r: 5
        }
      ],
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

function chartSlide(
  slideNum,
  slideOrder,
  chartDataBox,
  instance,
  datas,
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
    leftChartBtnToggle(chartSlideCurrent);
    chartDataSet(chartDataBox, instance, datas, chartSlideCurrent);
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
      }
    } else {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent++;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
    }
    leftChartBtnToggle(chartSlideCurrent);
    chartDataSet(chartDataBox, instance, datas, chartSlideCurrent);
  });

  for (let i = 0; i < slideNum; i++) {
    slideOrder[i].addEventListener('click', () => {
      slideOrder[chartSlideCurrent].classList.remove('chart-slide-current');
      chartSlideCurrent = i;
      slideOrder[chartSlideCurrent].classList.add('chart-slide-current');
      leftChartBtnToggle(chartSlideCurrent);

      chartDataSet(chartDataBox, instance, datas, chartSlideCurrent);
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

function chartDataSet(chartDataBox, instance, datas, datasIndex) {
  chartDataBox.datasets[0].data = datas[datasIndex].real;
  chartDataBox.datasets[1].data = datas[datasIndex].ideal;
  instance.update();
}

function init() {
  chartSlide(
    5,
    chartLineNum,
    chartLineDataBox,
    chartLineInstance,
    lottofunc1.chartLineData,
    leftLineChartBtn,
    rightLineChartBtn
  );

  chartSlide(
    3,
    chartBarNum,
    chartBarDataBox,
    chartBarInstance,
    lottofunc1.chartBarData,
    leftBarChartBtn,
    rightBarChartBtn
  );
}

init();
