const LineNum = document.querySelectorAll('.chart-line-num > div');
const LineBox = document.querySelector('#chart-func1-line');
const leftLineBtn = document.querySelector('#left-line-chart-btn');
const rightLineBtn = document.querySelector('#right-line-chart-btn');
const main22 = document.querySelector('.main-2-2');

const LineDataBox = {
  labels: filter.getLabel(),
  datasets: [
    {
      label: '실제값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(199, 54, 44)',
      data: null
    },
    {
      label: '예측값',
      backgroundColor: 'rgba(91, 81,255, 0.2)',
      pointBackgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(14,99,132)',
      data: null
    }
  ]
};

const LineOptions = {
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

const LineInstance = new Chart(LineBox, {
  type: 'line',
  data: LineDataBox,
  options: LineOptions
});

function chartLineSlide(slideNum) {
  const currentObj = { slideCurrent: 0 };

  lineLeftBtnClick(slideNum, currentObj);
  lineRightBtnClick(slideNum, currentObj);
  lineNumClick(slideNum, currentObj);
}

function lineNumClick(slideNum, currentObj) {
  for (let i = 0; i < slideNum; i++) {
    LineNum[i].addEventListener('click', () => {
      LineNum[currentObj.slideCurrent].classList.remove('chart-slide-current');
      currentObj.slideCurrent = i;
      LineNum[currentObj.slideCurrent].classList.add('chart-slide-current');

      setLineChartData(currentObj);
      setChartLineText(slideNum, currentObj);
    });
  }
}

function setChartLineText(slideNum, currentObj) {
  for (let i = 0; i < slideNum; i++) {
    if (currentObj.slideCurrent === i) {
      main22.textContent = i;
    }
  }
}

function lineLeftBtnClick(slideNum, currentObj) {
  leftLineBtn.addEventListener('click', () => {
    if (currentObj.slideCurrent === 0) {
      LineNum[currentObj.slideCurrent].classList.remove('chart-slide-current');
      LineNum[slideNum - 1].classList.add('chart-slide-current');
      currentObj.slideCurrent = slideNum - 1;
    } else {
      LineNum[currentObj.slideCurrent].classList.remove('chart-slide-current');
      currentObj.slideCurrent--;
      LineNum[currentObj.slideCurrent].classList.add('chart-slide-current');
    }
    setLineChartData(currentObj);
    setChartLineText(slideNum, currentObj);
  });
}
function lineRightBtnClick(slideNum, currentObj) {
  rightLineBtn.addEventListener('click', () => {
    if (currentObj.slideCurrent === slideNum - 1) {
      currentObj.slideCurrent = 0;
      LineNum[slideNum - 1].classList.remove('chart-slide-current');
      LineNum[currentObj.slideCurrent].classList.add('chart-slide-current');
    } else {
      LineNum[currentObj.slideCurrent].classList.remove('chart-slide-current');
      currentObj.slideCurrent++;
      LineNum[currentObj.slideCurrent].classList.add('chart-slide-current');
    }

    setLineChartData(currentObj);
    setChartLineText(slideNum, currentObj);
  });
}

function setLineChartData(currentObj) {
  const lineMap = {
    0: '$12',
    1: '$24',
    2: '$48',
    3: '$192',
    4: 'all'
  };
  LineDataBox.datasets[0].data = filter.getStats().actual[
    lineMap[currentObj.slideCurrent]
  ];
  LineDataBox.datasets[1].data = filter.getStats().ideal[
    lineMap[currentObj.slideCurrent]
  ];
  LineInstance.update();
}

function initLineChartData() {
  LineDataBox.datasets[0].data = filter.getStats().actual['$12'];
  LineDataBox.datasets[1].data = filter.getStats().ideal['$12'];
  LineInstance.update();
}
