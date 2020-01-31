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

const chartGaussBox = document.querySelector('.chart-func2-gauss');
const chartGaussDataBox = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      steppedLine: true,
      data: [0, 1, 2, 3, 4, 5, 6],
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

const chartBarBox = document.querySelector('.chart-func2-bar');

// Data with datasets options
const chartBarDataBox = {
  labels: ['Vanilla', 'Chocolate', 'Strawberry'],
  datasets: [
    {
      label: 'Ice Cream Sales ',
      fill: true,
      backgroundColor: ['moccasin', 'saddlebrown', 'lightpink'],
      data: [11, 9, 4]
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
const myBarChart = new Chart(chartBarBox, {
  type: 'bar',
  data: chartBarDataBox,
  options: chartBarOptions
});

const lottoNum = document.querySelectorAll('.lotto-num-box> div > div');
const selectNumBox = document.querySelector('.select-num-box');
const numExcludeBtn = document.querySelector('.num-exclude-btn');
const resetNumBtn = document.querySelector('.reset-num-btn');

function numExclude() {
  const nums = new Set();
  let num = null;
  for (const node of lottoNum) {
    const nodeValue = parseInt(node.textContent);
    node.addEventListener('click', () => {
      if (!nums.has(nodeValue)) {
        if (num !== null) {
          if (!nums.has(num)) {
            lottoNum[num - 1].style.backgroundColor = 'rgb(91, 81, 253)';
          }
        }
        num = nodeValue;
        node.style.backgroundColor = 'yellow';
      } else {
        node.style.backgroundColor = 'rgb(91, 81, 253)';
        nums.delete(nodeValue);

        for (const node of selectNumBox.children) {
          if (parseInt(node.textContent) === nodeValue) {
            node.remove();
            break;
          }
        }
      }
    });
  }

  resetNumBtn.addEventListener('click', () => {
    nums.clear();
    while (selectNumBox.children.length !== 0) {
      let i = 0;
      lottoNum[
        parseInt(selectNumBox.children[i].textContent) - 1
      ].style.backgroundColor = 'rgb(91, 81, 253)';
      selectNumBox.children[i].remove();
      i++;
    }
  });

  numExcludeBtn.addEventListener('click', () => {
    if (nums.size < 9) {
      if (!nums.has(num) || nums.size === 0) {
        lottoNum[num - 1].style.backgroundColor = 'gray';
        nums.add(num);
        const numBox = document.createElement('div');
        numBox.textContent = num;
        selectNumBox.appendChild(numBox);
      }
    }
  });
}

function init() {
  numExclude();
}

init();
