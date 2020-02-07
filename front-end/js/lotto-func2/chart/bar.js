const chartBarBox = document.querySelector('.chart-func2-bar');

// Data with datasets options
const chartBarDataBox = {
  labels: ['Vanilla', 'Chocolate'],
  datasets: [
    {
      label: 'Ice Cream Sales ',
      fill: true,
      backgroundColor: ['moccasin', 'saddlebrown'],
      data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100)]
    }
  ]
};

// Notice how nested the beginAtZero is
const chartBarOptions = {
  legend: false,
  title: {
    display: true,
    text: 'Ice Cream Truck Report'
  }
};

// Chart declaration:
const chartBarInstance = new Chart(chartBarBox, {
  type: 'bar',
  data: chartBarDataBox,
  options: chartBarOptions
});
