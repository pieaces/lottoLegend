/*
[
  0, 0, 1, 5,
  3, 2, 1
] [
  0.16384841642251924,
  1.0277764302867114,
  2.686233851885722,
  3.7444471874770664,
  2.9359869992717913,
  1.2277763815136578,
  0.21393073314253125
]
[
  1, 1, 4, 8,
  5, 4, 1
] [
  0.3276968328450385,
  2.055552860573423,
  5.372467703771444,
  7.488894374954133,
  5.871973998543583,
  2.4555527630273155,
  0.4278614662850625
]
[
   3, 4, 10, 12,
  11, 7,  1
] [
  0.655393665690077,
  4.111105721146846,
  10.744935407542888,
  14.977788749908266,
  11.743947997087165,
  4.911105526054631,
  0.855722932570125
]
[
   10, 60, 198, 309,
  231, 70,  16
] [
  12.206707023477684,
  76.56934405636001,
  200.1244219654863,
  278.96131546704146,
  218.73103144574847,
  91.4693404227675,
  15.937839619118579
]
*/

const lottofunc1 = {
  chartSlideParam: 1
};
const chartBottomContainer = document.querySelector('.chart-bottom-container');
const leftChart = document.querySelector('#left-chart-btn');
const rightChart = document.querySelector('#right-chart-btn');
const chartTopNum = document.querySelectorAll('.chart-top-num > div');
leftChart.addEventListener('click', chartSlide());
rightChart.addEventListener('click', chartSlide());

function chartSlide() {
  return function(e) {
    if (e.target.id === 'left-chart-btn') {
      lottofunc1.chartSlideParam--;
      if (lottofunc1.chartSlideParam === 0) {
        lottofunc1.chartSlideParam = 6;
      }
    } else if (e.target.id === 'right-chart-btn') {
      lottofunc1.chartSlideParam++;
      if (lottofunc1.chartSlideParam === 7) {
        lottofunc1.chartSlideParam = 1;
        chartBottomContainer.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }

    if (lottofunc1.chartSlideParam === 1) {
      chartTopData.datasets[0].data = [0, 0, 1, 5, 3, 2, 1];
      chartTopData.datasets[1].data = [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ];
      chartTopInstance.update();
      for (node of chartTopNum) {
        node.style.backgroundColor = 'gray';
      }
      chartTopNum[0].style.backgroundColor = 'blue';
    } else if (lottofunc1.chartSlideParam === 2) {
      chartTopData.datasets[0].data = [1, 1, 4, 8, 5, 4, 1];
      chartTopData.datasets[1].data = [
        0.3276968328450385,
        2.055552860573423,
        5.372467703771444,
        7.488894374954133,
        5.871973998543583,
        2.4555527630273155,
        0.4278614662850625
      ];
      chartTopInstance.update();
      for (node of chartTopNum) {
        node.style.backgroundColor = 'gray';
      }
      chartTopNum[1].style.backgroundColor = 'blue';
    } else if (lottofunc1.chartSlideParam === 3) {
      chartTopData.datasets[0].data = [3, 4, 10, 12, 11, 7, 1];
      chartTopData.datasets[1].data = [
        0.655393665690077,
        4.111105721146846,
        10.744935407542888,
        14.977788749908266,
        11.743947997087165,
        4.911105526054631,
        0.855722932570125
      ];
      chartTopInstance.update();
      for (node of chartTopNum) {
        node.style.backgroundColor = 'gray';
      }
      chartTopNum[2].style.backgroundColor = 'blue';
    } else if (lottofunc1.chartSlideParam === 4) {
      chartTopData.datasets[0].data = [10, 60, 198, 309, 231, 70, 16];
      chartTopData.datasets[1].data = [
        12.206707023477684,
        76.56934405636001,
        200.1244219654863,
        278.96131546704146,
        218.73103144574847,
        91.4693404227675,
        15.937839619118579
      ];
      chartTopInstance.update();
      for (node of chartTopNum) {
        node.style.backgroundColor = 'gray';
      }
      chartTopNum[3].style.backgroundColor = 'blue';
    } else if (lottofunc1.chartSlideParam === 5) {
      chartTopData.datasets[0].data = [3, 4, 10, 12, 11, 7, 1];
      chartTopData.datasets[1].data = [
        0.655393665690077,
        4.111105721146846,
        10.744935407542888,
        14.977788749908266,
        11.743947997087165,
        4.911105526054631,
        0.855722932570125
      ];
      chartTopInstance.update();
      for (node of chartTopNum) {
        node.style.backgroundColor = 'gray';
      }
      chartTopNum[4].style.backgroundColor = 'blue';
    } else if (lottofunc1.chartSlideParam === 6) {
      chartTopData.datasets[0].data = [10, 60, 198, 309, 231, 70, 16];
      chartTopData.datasets[1].data = [
        12.206707023477684,
        76.56934405636001,
        200.1244219654863,
        278.96131546704146,
        218.73103144574847,
        91.4693404227675,
        15.937839619118579
      ];
      chartTopInstance.update();
      for (node of chartTopNum) {
        node.style.backgroundColor = 'gray';
      }
      chartTopNum[5].style.backgroundColor = 'blue';
    }

    if (lottofunc1.chartSlideParam === 1) {
      leftChart.style.display = 'none';
    } else {
      leftChart.style.display = 'block';
    }
  };
}

const chartTop = document.querySelector('.chart-top').getContext('2d');

const chartTopData = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: [0, 0, 1, 5, 3, 2, 1]
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ]
    }
  ]
};

const chartOptions = {
  responsive: true,
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

const chartTopInstance = new Chart(chartTop, {
  type: 'line',
  data: chartTopData,
  options: chartOptions
});

const chartBottom11 = document
  .querySelector('.chart-bottom-1-1')
  .getContext('2d');

const chartBottomData11 = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: [0, 0, 1, 5, 3, 2, 1]
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ]
    }
  ]
};

const chartBottomInstance11 = new Chart(chartBottom11, {
  type: 'line',
  data: chartBottomData11,
  options: chartOptions
});

const chartBottom21 = document
  .querySelector('.chart-bottom-2-1')
  .getContext('2d');

const chartBottomData21 = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: [0, 0, 1, 5, 3, 2, 1]
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ]
    }
  ]
};

const chartBottomInstance21 = new Chart(chartBottom21, {
  type: 'line',
  data: chartBottomData21,
  options: chartOptions
});

const chartBottom12 = document
  .querySelector('.chart-bottom-1-2')
  .getContext('2d');

const chartBottomData12 = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: [0, 0, 1, 5, 3, 2, 1]
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ]
    }
  ]
};

const chartBottomInstance12 = new Chart(chartBottom12, {
  type: 'line',
  data: chartBottomData12,
  options: chartOptions
});

const chartBottom22 = document
  .querySelector('.chart-bottom-2-2')
  .getContext('2d');

const chartBottomData22 = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: [0, 0, 1, 5, 3, 2, 1]
    },
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ]
    }
  ]
};

const chartBottomInstance22 = new Chart(chartBottom22, {
  type: 'line',
  data: chartBottomData22,
  options: chartOptions
});

// const chart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//         datasets: [
//             {
//                 label: "Population (millions)",
//                 backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
//                 data: [2478, 5267, 734, 784, 433]
//             }
//         ]
//     },
//     options: {
//         legend: { display: false },
//         title: {
//             display: true,
//             text: 'Predicted world population (millions) in 2050'
//         }
//     }
// });
