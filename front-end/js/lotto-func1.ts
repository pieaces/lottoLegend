import Chart from 'chart.js';

import Lotto from '../../back-end/class/Lotto/Lotto';

const lotto = new Lotto(require('../../back-end/json/lotto.json'));
const method1 = lotto.gather$3Count.bind(lotto);
const method2 = lotto.expected$3Count.bind(lotto);

const chart11 = new Chart(
  (<HTMLCanvasElement>document.querySelector('.chart-1-1')).getContext('2d'),
  {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: [
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        ' 38',
        '39',
        '40',
        '41'
      ],
      datasets: [
        {
          label: '실제 홀수',
          borderColor: '#0026ca',
          data: lotto.gatherDiffMaxMinData({ from: 30, to: 41 }),
          fill: false
        },
        {
          label: '이상적',
          borderColor: '#388e3c',
          data: lotto.expectedDiffMaxMinData({ from: 30, to: 41 }),
          fill: false
        }
      ]
    },

    // Configuration options go here
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: '로또리나'
      }
    }
  }
);

const chart12 = new Chart(
  (<HTMLCanvasElement>document.querySelector('.chart-1-2')).getContext('2d'),
  {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '실제 홀수',
          borderColor: '#0026ca',
          data: method1({ mode: 24 }),
          fill: false
        },
        {
          label: '이상적',
          borderColor: '#388e3c',
          data: method2({ mode: 24 }),
          fill: false
        }
      ]
    },

    // Configuration options go here
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: '로또리나'
      }
    }
  }
);

const chart21 = new Chart(
  (<HTMLCanvasElement>document.querySelector('.chart-2-1')).getContext('2d'),
  {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '실제 홀수',
          borderColor: '#0026ca',
          data: method1({ mode: 48 }),
          fill: false
        },
        {
          label: '이상적',
          borderColor: '#388e3c',
          data: method2({ mode: 48 }),
          fill: false
        }
      ]
    },

    // Configuration options go here
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: '로또리나'
      }
    }
  }
);

const chart22 = new Chart(
  (<HTMLCanvasElement>document.querySelector('.chart-2-2')).getContext('2d'),
  {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '실제 홀수',
          borderColor: '#0026ca',
          data: method1(),
          fill: false
        },
        {
          label: '이상적',
          borderColor: '#388e3c',
          data: method2(),
          fill: false
        }
      ]
    },

    // Configuration options go here
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: '로또리나'
      }
    }
  }
);

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
