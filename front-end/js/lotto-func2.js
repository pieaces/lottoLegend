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

window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

window.randomScalingFactor = function() {
  return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};

function createConfig(details, data) {
  return {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
      datasets: [
        {
          label:
            'steppedLine: ' +
            (typeof details.steppedLine === 'boolean'
              ? details.steppedLine
              : `'${details.steppedLine}'`),
          steppedLine: details.steppedLine,
          data: data,
          borderColor: details.color,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: details.label
      }
    }
  };
}
window.onload = function() {
  var data = [1, 2, 3, 4, 5, 6];
  var steppedLineSettings = [
    {
      steppedLine: true,
      label: 'No Step Interpolation',
      color: window.chartColors.red
    },
    {
      steppedLine: true,
      label: 'Step Before Interpolation',
      color: window.chartColors.green
    },
    {
      steppedLine: 'before',
      label: 'Step Before Interpolation',
      color: window.chartColors.green
    },
    {
      steppedLine: 'after',
      label: 'Step After Interpolation',
      color: window.chartColors.purple
    }
  ];
  steppedLineSettings.forEach(function(details) {
    var config = createConfig(details, data);
    new Chart(
      document.querySelector('.chart-func2-gauss').getContext('2d'),
      config
    );
  });
};
