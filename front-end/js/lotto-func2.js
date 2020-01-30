const chartRadarBox = document.querySelector('.chart-func2-radar');
const chartRadarDataBox = {
  labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
  datasets: [
    {
      fill: true,
      borderWidth: 1,
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      data: [8.77, 55.61, 21.69, 6.62, 6.82]
    },
    {
      fill: true,
      borderWidth: 1,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      data: [25.48, 54.16, 7.61, 8.06, 4.45]
    }
  ]
};

const chartRadarOptions = {
  responsive: false,
  title: {
    display: true,
    text: 'Distribution in % of world population'
  },
  legend: {
    display: false
  }
};

const chartRadarInstance = new Chart(chartRadarBox, {
  type: 'radar',
  data: chartRadarDataBox,
  options: chartRadarOptions
});

const chartGaussBox = document
  .querySelector('.chart-func2-gauss')
  .getContext('2d');

const chartGaussDataBox = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: '이상값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: [0, 0, 2, 5, 4, 7, 2]
    }
  ]
};

const chartGaussOptions = {
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

const chartGaussInstance = new Chart(chartGaussBox, {
  type: 'line',
  data: chartGaussDataBox,
  options: chartGaussOptions
});
