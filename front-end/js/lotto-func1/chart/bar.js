const leftBarBtn = document.querySelector('#left-bar-chart-btn');
const rightBarBtn = document.querySelector('#right-bar-chart-btn');
const BarNum = document.querySelectorAll('.chart-bar-num > div');
const BarBox = document.querySelector('#chart-func1-bar');
const main23 = document.querySelector('.main-2-3');
const BarDataBox = {
  labels: filter.getLabel(),
  datasets: [
    {
      label: '예측',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: null
    }
  ]
};

const BarOptions = {
  legend: false
};

const BarInstance = new Chart(BarBox, {
  type: 'bar',
  data: BarDataBox,
  options: BarOptions
});

function chartBarSlide(slideNum) {
  const currentObj = { slideCurrent: 0 };

  barLeftBtnClick(slideNum, currentObj);
  barRightBtnClick(slideNum, currentObj);
  barNumClick(slideNum, currentObj);
}

function barNumClick(slideNum, currentObj) {
  for (let i = 0; i < slideNum; i++) {
    BarNum[i].addEventListener('click', () => {
      BarNum[currentObj.slideCurrent].classList.remove('chart-slide-current');
      currentObj.slideCurrent = i;
      BarNum[currentObj.slideCurrent].classList.add('chart-slide-current');

      setBarChartData(slideNum, currentObj);
      setChartBarText(slideNum, currentObj);
    });
  }
}

function setChartBarText(slideNum, currentObj) {
  for (let i = 0; i < slideNum; i++) {
    if (currentObj.slideCurrent === i) {
      main23.textContent = i;
    }
  }
}

function barLeftBtnClick(slideNum, currentObj) {
  leftBarBtn.addEventListener('click', () => {
    if (currentObj.slideCurrent === 0) {
      BarNum[currentObj.slideCurrent].classList.remove('chart-slide-current');
      BarNum[slideNum - 1].classList.add('chart-slide-current');
      currentObj.slideCurrent = slideNum - 1;
    } else {
      BarNum[currentObj.slideCurrent].classList.remove('chart-slide-current');
      currentObj.slideCurrent--;
      BarNum[currentObj.slideCurrent].classList.add('chart-slide-current');
    }
    setBarChartData(slideNum, currentObj);
    setChartBarText(slideNum, currentObj);
  });
}
function barRightBtnClick(slideNum, currentObj) {
  rightBarBtn.addEventListener('click', () => {
    if (currentObj.slideCurrent === slideNum - 1) {
      currentObj.slideCurrent = 0;
      BarNum[slideNum - 1].classList.remove('chart-slide-current');
      BarNum[currentObj.slideCurrent].classList.add('chart-slide-current');
    } else {
      BarNum[currentObj.slideCurrent].classList.remove('chart-slide-current');
      currentObj.slideCurrent++;
      BarNum[currentObj.slideCurrent].classList.add('chart-slide-current');
    }

    setBarChartData(slideNum, currentObj);
    setChartBarText(slideNum, currentObj);
  });
}

function setBarChartData(slideNum, currentObj) {
  for (let i = 0; i < slideNum - 1; i++) {
    if (currentObj.slideCurrent === i) {
      BarDataBox.datasets[0].data = filter.getStats().ideal['latest'];
      BarInstance.update();
    }
  }
  if (currentObj.slideCurrent === slideNum - 1) {
    const datas = [];

    for (let i = 0; i < filter.getStats().ideal['latest'].length; i++) {
      const data =
        filter.getStats().ideal['latest'][i] - filter.getStats().actual['latest'][i];
      datas.push(data);
    }
    BarDataBox.datasets[0].data = datas;

    BarInstance.update();
  }
}

function initBarChartData() {
  BarDataBox.datasets[0].data = filter.getStats().ideal['latest'];
  BarInstance.update();
}
