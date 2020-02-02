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

function filterCheckBoxToggle() {
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
}

function numExclude() {
  const lottoNumDefaultColor = 'rgba(231, 76, 60, 0.2)';
  const lottoNumSelectColor = '#e6e600';
  const lottoNumExcludeColor = 'gray';
  const nums = new Array();
  const numExcludeCount = 9;
  let num = null;

  // 번호판 색깔 설정과 번호판 번호 삭제와 선택번호배열,선택번호 삭제

  for (const node of lottoNum) {
    node.addEventListener('click', e => {
      const nodeValue = parseInt(node.textContent);
      if (nums.indexOf(nodeValue) === -1) {
        if (num !== null) {
          if (nums.indexOf(num) === -1) {
            lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
          }
        }
        num = nodeValue;
        node.style.backgroundColor = lottoNumSelectColor;
      } else {
        if (num !== null) {
          lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
        }
        num = nodeValue;
        node.style.backgroundColor = lottoNumSelectColor;
        selectNumBox.children[nums.length - 1].classList.remove(
          `select-num-box${nums.length}`
        );
        for (let i = 0; i < selectNumBox.children.length; i++) {
          if (nums.indexOf(nodeValue) !== -1) {
            selectNumBox.children[nums.indexOf(nodeValue)].textContent = '';
            nums.splice(nums.indexOf(nodeValue), 1);
            break;
          }
        }

        for (let i = 0; i < selectNumBox.children.length; i++) {
          selectNumBox.children[i].textContent = nums[i];
          selectNumBox.children[i].style.backgroundColor = '';
        }

        for (let i = 0; i < nums.length; i++) {
          setColorLotto(
            parseInt(selectNumBox.children[i].textContent),
            selectNumBox.children[i]
          );
        }
      }
      e.stopPropagation();
    });
  }

  //초기화함수: 선택번호배열,선택번호, 번호판 초기화

  resetNumBtn.addEventListener('click', () => {
    for (const node of [...selectNumBox.children]) {
      node.textContent = '';
      node.style.backgroundColor = '';
    }

    for (let i = 0; i < nums.length; i++) {
      lottoNum[nums[i] - 1].style.backgroundColor = lottoNumDefaultColor;
    }

    nums.splice(0, nums.length);
    if (num !== null) {
      lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
      num = null;
    }
  });

  //번호제외함수: 선택번호 배열 추가(중복x), 번호판 색깔 설정, 선택번호 추가

  numExcludeBtn.addEventListener('click', e => {
    if (nums.length < numExcludeCount) {
      if (nums.indexOf(num) === -1) {
        if (num !== null) {
          lottoNum[num - 1].style.backgroundColor = lottoNumExcludeColor;
          nums.push(num);
          const numOrder = nums.indexOf(num);
          selectNumBox.children[numOrder].classList.add(
            `select-num-box${numOrder + 1}`
          );
          selectNumBox.children[numOrder].textContent = num;
          setColorLotto(num, selectNumBox.children[numOrder]);
          num = null;
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
    }
    e.stopPropagation();
  });

  // 번호판 다른 곳 누르면 선택색깔 초기화, 다른 함수들 이벤트 전파 막아야 함

  let myExclusiveEl = document.querySelectorAll('body *');
  let myEls = document.querySelectorAll('.main-1-3 *');

  myExclusiveEl = [...myExclusiveEl].filter(parent => {
    let containedByExclusionNode = [...myEls].filter(child => {
      if (parent === child) {
        return true;
      } else {
        return false;
      }
    });
    if (containedByExclusionNode.length === 0) {
      return true;
    } else {
      return false;
    }
  });

  for (const node of myExclusiveEl) {
    node.addEventListener('click', e => {
      if (num !== null) {
        lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
        num = null;
      }
    });
  }
}

// 번호색깔지정함수

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

// 당첨번호색깔설정함수

function setColorWinNum() {
  for (const node of winNum) {
    const nodeValue = parseInt(node.textContent);
    setColorLotto(nodeValue, node);
  }
}

// 함수 실행
function init() {
  setColorWinNum();
  numExclude();
  filterCheckBoxToggle();
}

init();
