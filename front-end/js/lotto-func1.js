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

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(data);
  });
  chart.update();
}

function chartSlide() {
  return function(e) {
    if (e.target.id === 'left-chart-btn') {
      lottofunc1.chartSlideParam--;
    } else if (e.target.id === 'right-chart-btn') {
      lottofunc1.chartSlideParam++;
    }
    if (lottofunc1.chartSlideParam === 0) {
      lottofunc1.chartSlideParam = 4;
    }
    if (lottofunc1.chartSlideParam === 5) {
      lottofunc1.chartSlideParam = 1;
    }
    if (lottofunc1.chartSlideParam === 1) {
      chartData11.datasets[0].data = [0, 0, 1, 5, 3, 2, 1];
      chartData11.datasets[1].data = [
        0.16384841642251924,
        1.0277764302867114,
        2.686233851885722,
        3.7444471874770664,
        2.9359869992717913,
        1.2277763815136578,
        0.21393073314253125
      ];
      chartInstance11.update();
    } else if (lottofunc1.chartSlideParam === 2) {
      chartData11.datasets[0].data = [1, 1, 4, 8, 5, 4, 1];
      chartData11.datasets[1].data = [
        0.3276968328450385,
        2.055552860573423,
        5.372467703771444,
        7.488894374954133,
        5.871973998543583,
        2.4555527630273155,
        0.4278614662850625
      ];
      chartInstance11.update();
    } else if (lottofunc1.chartSlideParam === 3) {
      chartData11.datasets[0].data = [3, 4, 10, 12, 11, 7, 1];
      chartData11.datasets[1].data = [
        0.655393665690077,
        4.111105721146846,
        10.744935407542888,
        14.977788749908266,
        11.743947997087165,
        4.911105526054631,
        0.855722932570125
      ];
      chartInstance11.update();
    } else if (lottofunc1.chartSlideParam === 4) {
      chartData11.datasets[0].data = [10, 60, 198, 309, 231, 70, 16];
      chartData11.datasets[1].data = [
        12.206707023477684,
        76.56934405636001,
        200.1244219654863,
        278.96131546704146,
        218.73103144574847,
        91.4693404227675,
        15.937839619118579
      ];
      chartInstance11.update();
    }
  };
}

const leftChart = document.querySelector('#left-chart-btn');
const rightChart = document.querySelector('#right-chart-btn');

leftChart.addEventListener('click', chartSlide());
rightChart.addEventListener('click', chartSlide());

const chart11 = document.querySelector('.chart-1-1').getContext('2d');
const chartGrad11 = chart11.createLinearGradient(0, 0, 0, 600);
chartGrad11.addColorStop(0, 'rgba(91, 81,255, 0.5)');
chartGrad11.addColorStop(0.5, 'rgba(91, 81,255, 0.2)');
chartGrad11.addColorStop(1, 'rgba(91, 81,255, 0)');

const chartData11 = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: 'Custom Label Name',
      backgroundColor: chartGrad11,
      pointBackgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'blue',
      data: [0, 0, 1, 5, 3, 2, 1]
    },
    {
      label: 'Custom Label Name',
      backgroundColor: chartGrad11,
      pointBackgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'blue',
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

const chartOptions11 = {
  responsive: true,
  maintainAspectRatio: true,
  animation: {
    easing: 'easeInOutQuad',
    duration: 520
  },
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
  elements: {
    line: {
      tension: 0.4
    }
  },
  legend: {
    display: false
  },
  point: {
    backgroundColor: 'white'
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

const chartInstance11 = new Chart(chart11, {
  type: 'line',
  data: chartData11,
  options: chartOptions11
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
