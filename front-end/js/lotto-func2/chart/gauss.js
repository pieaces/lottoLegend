const chartGaussBox = document.querySelector('.chart-func2-gauss');
const chartGaussDataBox = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  datasets: [
    {
      steppedLine: true,
      data: [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ],
      borderColor: 'red',
      fill: false
    }
  ]
};

const chartGaussOptions = {
  responsive: true,
  legend: false,
  title: {
    display: true,
    text: 'hi'
  }
};

const chartGaussInstance = new Chart(chartGaussBox, {
  type: 'line',
  data: chartGaussDataBox,
  options: chartGaussOptions
});
