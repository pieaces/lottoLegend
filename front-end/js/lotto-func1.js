// [0, 0, 1, 5, 3, 2, 1][
//   (0.16384841642251924,
//   1.0277764302867114,
//   2.686233851885722,
//   3.7444471874770664,
//   2.9359869992717913,
//   1.2277763815136578,
//   0.21393073314253125)
// ][(1, 1, 4, 8, 5, 4, 1)][
//   (0.3276968328450385,
//   2.055552860573423,
//   5.372467703771444,
//   7.488894374954133,
//   5.871973998543583,
//   2.4555527630273155,
//   0.4278614662850625)
// ][(3, 4, 10, 12, 11, 7, 1)][
//   (0.655393665690077,
//   4.111105721146846,
//   10.744935407542888,
//   14.977788749908266,
//   11.743947997087165,
//   4.911105526054631,
//   0.855722932570125)
// ][(10, 60, 198, 309, 231, 70, 16)][
//   (12.206707023477684,
//   76.56934405636001,
//   200.1244219654863,
//   278.96131546704146,
//   218.73103144574847,
//   91.4693404227675,
//   15.937839619118579)
// ];

const lottofunc1 = {
  chartSlideNum: 6,
  chartSlideCurrent: 0,
  chartTopData: [
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
  ],
  chartBottomData: {
    '11': {
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
    '12': {
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
    '21': {
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
    '22': {
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
  }
};
const chartBottomContainer = document.querySelector('.chart-bottom-container');
const leftChartBtn = document.querySelector('#left-chart-btn');
const rightChartBtn = document.querySelector('#right-chart-btn');
const chartTopNum = document.querySelectorAll('.chart-top-num > div');
leftChartBtn.addEventListener('click', chartSlide());
rightChartBtn.addEventListener('click', chartSlide());

const chartTopBox = document.querySelector('.chart-top').getContext('2d');

const chartTopDataBox = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: lottofunc1.chartTopData[0].real
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: lottofunc1.chartTopData[0].ideal
    }
  ]
};

const chartOptions = {
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

const chartTopInstance = new Chart(chartTopBox, {
  type: 'line',
  data: chartTopDataBox,
  options: chartOptions
});

const chartBottomBox11 = document
  .querySelector('.chart-bottom-1-1')
  .getContext('2d');

const chartBottomDataBox11 = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: lottofunc1.chartBottomData['11'].real
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: lottofunc1.chartBottomData['11'].ideal
    }
  ]
};

const chartBottomInstance11 = new Chart(chartBottomBox11, {
  type: 'line',
  data: chartBottomDataBox11,
  options: chartOptions
});

const chartBottomBox21 = document
  .querySelector('.chart-bottom-2-1')
  .getContext('2d');

const chartBottomDataBox21 = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: lottofunc1.chartBottomData['21'].real
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: lottofunc1.chartBottomData['21'].ideal
    }
  ]
};

const chartBottomInstance21 = new Chart(chartBottomBox21, {
  type: 'line',
  data: chartBottomDataBox21,
  options: chartOptions
});

const chartBottomBox12 = document
  .querySelector('.chart-bottom-1-2')
  .getContext('2d');

const chartBottomDataBox12 = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: lottofunc1.chartBottomData['12'].real
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: lottofunc1.chartBottomData['12'].ideal
    }
  ]
};

const chartBottomInstance12 = new Chart(chartBottomBox12, {
  type: 'line',
  data: chartBottomDataBox12,
  options: chartOptions
});

const chartBottomBox22 = document
  .querySelector('.chart-bottom-2-2')
  .getContext('2d');

const chartBottomDataBox22 = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: lottofunc1.chartBottomData['22'].real
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: lottofunc1.chartBottomData['22'].ideal
    }
  ]
};

const chartBottomInstance22 = new Chart(chartBottomBox22, {
  type: 'line',
  data: chartBottomDataBox22,
  options: chartOptions
});

function chartSlide() {
  return function(e) {
    if (e.target.id === 'left-chart-btn') {
      if (lottofunc1.chartSlideCurrent === -1) {
        lottofunc1.chartSlideCurrent = 0;
      } else {
        chartTopNum[lottofunc1.chartSlideCurrent].style.backgroundColor =
          'gray';
        lottofunc1.chartSlideCurrent--;
        chartTopNum[lottofunc1.chartSlideCurrent].style.backgroundColor =
          'blue';
      }
    } else if (e.target.id === 'right-chart-btn') {
      if (lottofunc1.chartSlideCurrent === lottofunc1.chartSlideNum - 1) {
        lottofunc1.chartSlideCurrent = 0;
        chartTopNum[lottofunc1.chartSlideNum - 1].style.backgroundColor =
          'gray';
        chartTopNum[lottofunc1.chartSlideCurrent].style.backgroundColor =
          'blue';
        chartBottomContainer.scrollIntoView({
          behavior: 'smooth'
        });
      } else {
        chartTopNum[lottofunc1.chartSlideCurrent].style.backgroundColor =
          'gray';
        lottofunc1.chartSlideCurrent++;
        chartTopNum[lottofunc1.chartSlideCurrent].style.backgroundColor =
          'blue';
      }
    }

    leftChartBtnToggle();

    chartTopDataBox.datasets[0].data =
      lottofunc1.chartTopData[lottofunc1.chartSlideCurrent].real;
    chartTopDataBox.datasets[1].data =
      lottofunc1.chartTopData[lottofunc1.chartSlideCurrent].ideal;
    chartTopInstance.update();
  };
}
for (let i = 0; i < lottofunc1.chartSlideNum; i++) {
  chartTopNum[i].addEventListener('click', () => {
    chartTopDataBox.datasets[0].data = lottofunc1.chartTopData[i].real;
    chartTopDataBox.datasets[1].data = lottofunc1.chartTopData[i].ideal;
    chartTopNum[lottofunc1.chartSlideCurrent].style.backgroundColor = 'gray';
    lottofunc1.chartSlideCurrent = i;
    chartTopNum[lottofunc1.chartSlideCurrent].style.backgroundColor = 'blue';
    leftChartBtnToggle();
    chartTopInstance.update();
  });
}

function leftChartBtnToggle() {
  if (lottofunc1.chartSlideCurrent === 0) {
    leftChartBtn.style.display = 'none';
  } else {
    leftChartBtn.style.display = 'block';
  }
}
