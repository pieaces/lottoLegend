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
      data: [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
    },
    {
      fill: true,
      borderWidth: 1,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      data: [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
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
      data: [
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

const chartBarBox = document.querySelector('.chart-func2-bar');

// Data with datasets options
const chartBarDataBox = {
  labels: ['Vanilla', 'Chocolate', 'Strawberry'],
  datasets: [
    {
      label: 'Ice Cream Sales ',
      fill: true,
      backgroundColor: ['moccasin', 'saddlebrown', 'lightpink'],
      data: [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
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

const lottoNum = document.querySelectorAll('.lotto-num-box> div > div');
const selectNumBox = document.querySelector('.select-num-box');
const numExcludeBtn = document.querySelector('.num-exclude-btn');
const resetNumBtn = document.querySelector('.reset-num-btn');
const winNum = document.querySelectorAll('.win-num-box > div');
const filterCheckBox = document.querySelectorAll('.filter-checkbox');

for (const node of filterCheckBox) {
  node.addEventListener('click', () => {
    if (node.checked) {
      node.parentElement.style.backgroundColor = 'rgb(91, 81, 253)';
      node.parentElement.style.color = 'white';
    } else {
      node.parentElement.style.backgroundColor = 'white';
      node.parentElement.style.color = 'black';
    }
  });
}

function numExclude() {
  const lottoNumDefaultColor = 'rgba(231, 76, 60, 0.2)';
  const lottoNumSelectColor = '#e6e600';
  const lottoNumExcludeColor = 'gray';
  const nums = new Set();
  const numExcludeCount = 9;
  let num = null;

  for (const node of lottoNum) {
    node.addEventListener('click', () => {
      const nodeValue = parseInt(node.textContent);
      if (!nums.has(nodeValue)) {
        if (num !== null) {
          if (!nums.has(num)) {
            lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
          }
        }
        num = nodeValue;
        node.style.backgroundColor = lottoNumSelectColor;
      } else {
        if (!nums.has(num)) {
          lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
        }
        num = nodeValue;
        node.style.backgroundColor = lottoNumSelectColor;
        nums.delete(num);

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
      ].style.backgroundColor = lottoNumDefaultColor;
      selectNumBox.children[i].remove();
      i++;
    }
    lottoNum[num - 1].style.backgroundColor = lottoNumSelectColor;
  });

  numExcludeBtn.addEventListener('click', () => {
    if (nums.size < numExcludeCount) {
      if (!nums.has(num)) {
        lottoNum[num - 1].style.backgroundColor = lottoNumExcludeColor;
        nums.add(num);
        const numBox = document.createElement('div');
        numBox.textContent = num;
        setColorLotto(num, numBox);
        selectNumBox.appendChild(numBox);
        chartGaussDataBox.datasets[0].data = [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100)
        ];
        chartRadarDataBox.datasets[0].data = [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100)
        ];
        chartBarDataBox.datasets[0].data = [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100)
        ];

        chartGaussInstance.update();
        chartRadarInstance.update();
        chartBarInstance.update();
      }
    }
  });
}

function setColorLotto(num, Box) {
  if (1 <= num && num <= 10) {
    Box.style.backgroundColor = '#FBC400';
  } else if (num <= 20) {
    Box.style.backgroundColor = '#69C8F2';
  } else if (num <= 30) {
    Box.style.backgroundColor = '#FF7272';
  } else if (num <= 40) {
    Box.style.backgroundColor = '#AAAAAA';
  } else if (num <= 45) {
    Box.style.backgroundColor = '#B0D840';
  }
}

function setColorWinNum() {
  for (const node of winNum) {
    const nodeValue = parseInt(node.textContent);
    setColorLotto(nodeValue, node);
  }
}

function init() {
  setColorWinNum();
  numExclude();
}

init();
