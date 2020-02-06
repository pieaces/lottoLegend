function filterBoxCheck() {
  const filterBox = document.querySelector('.filter-box');
  const filterArrow = document.querySelector('.filter-arrow');
  const filterListBox = document.querySelector('.filter-list');
  const filterList = document.querySelectorAll('.filter-list > li');
  const filterSelectText = document.querySelector('.filter-box > a');

  let flag = true;
  filterBox.addEventListener('click', () => {
    if (flag) {
      filterArrow.classList.remove('fa-sort-down');
      filterArrow.classList.add('fa-sort-up');
      filterListBox.style.display = 'block';
      for (const node of filterList) {
        node.addEventListener('click', () => {
          filterSelectText.textContent = node.textContent;
        });
      }
    } else {
      filterArrow.classList.add('fa-sort-down');
      filterArrow.classList.remove('fa-sort-up');
      filterListBox.style.display = 'none';
    }
    flag = !flag;
  });
}

function drawBubbleChart() {
  const BubbleBox = document.querySelector('#chart-func1-bubble');
  const dataBubble = [['ID', '전체적 맥락', '부분적 맥락', '희소성', '확률']];
  const X = { max: -1, min: 1 };
  const Y = { max: -1, min: 1 };
  for (
    let i = 0;
    i < lottofunc1.lottoData.oddCount.data.ideal['all'].length;
    i++
  ) {
    let x =
      lottofunc1.lottoData.oddCount.data.ideal['all'][i] -
      lottofunc1.lottoData.oddCount.data.actual['all'][i];
    if (
      lottofunc1.lottoData.oddCount.data.ideal['all'][i] >=
      lottofunc1.lottoData.oddCount.data.actual['all'][i]
    )
      x /= lottofunc1.lottoData.oddCount.data.ideal['all'][i];
    else x /= lottofunc1.lottoData.oddCount.data.actual['all'][i];
    x *= lottofunc1.lottoData.oddCount.data.pos[i];
    let y =
      lottofunc1.lottoData.oddCount.data.ideal['latest'][i] -
      lottofunc1.lottoData.oddCount.data.actual['latest'][i];
    if (
      lottofunc1.lottoData.oddCount.data.ideal['latest'][i] >=
      lottofunc1.lottoData.oddCount.data.actual['latest'][i]
    )
      y /= lottofunc1.lottoData.oddCount.data.ideal['latest'][i];
    else y /= lottofunc1.lottoData.oddCount.data.actual['latest'][i];
    y *= lottofunc1.lottoData.oddCount.data.pos[i];

    if (x > X.max) X.max = x;
    if (x < X.min) X.min = x;
    if (y > Y.max) Y.max = y;
    if (y < Y.min) Y.min = y;

    const data = [
      String(i),
      x,
      y,
      y,
      lottofunc1.lottoData.oddCount.data.pos[i]
    ];
    dataBubble.push(data);
  }

  const BubbleDataBox = google.visualization.arrayToDataTable(dataBubble);
  const C = 0.01;
  const BubbleOptions = {
    bubble: { textStyle: { fontSize: 11 } },
    hAxis: { maxValue: X.max + C, minValue: X.min - C },
    vAxis: { maxValue: Y.max + C, minValue: Y.min - C }
  };

  const chart = new google.visualization.BubbleChart(BubbleBox);
  chart.draw(BubbleDataBox, BubbleOptions);
}

function chartSlide(slideObj) {
  const {
    TextBox,
    slideNum,
    slideOrder,
    Box,
    DataBox,
    instance,
    leftBtn,
    rightBtn
  } = slideObj;

  const DataObj = {
    Box: Box,
    DataBox: DataBox,
    instance: instance
  };

  const BtnObj = {
    TextBox: TextBox,
    slideNum: slideNum,
    slideOrder: slideOrder
  };

  const currentObj = {
    slideCurrent: 0
  };

  leftBtnClick(DataObj, BtnObj, leftBtn, currentObj);
  rightBtnClick(DataObj, BtnObj, rightBtn, currentObj);
  chartNumClick(DataObj, BtnObj, currentObj);
}

function chartNumClick(DataObj, BtnObj, currentObj) {
  const { slideNum, slideOrder, TextBox } = BtnObj;
  const { Box } = DataObj;
  for (let i = 0; i < slideNum; i++) {
    slideOrder[i].addEventListener('click', () => {
      slideOrder[currentObj.slideCurrent].classList.remove(
        'chart-slide-current'
      );
      currentObj.slideCurrent = i;
      slideOrder[currentObj.slideCurrent].classList.add('chart-slide-current');

      setChartData(DataObj, currentObj, slideNum);
      setChartText(Box, TextBox, currentObj, slideNum);
    });
  }
}

function setChartText(Box, TextBox, currentObj, slideNum) {
  if (Box.id === 'chart-func1-line') {
    for (let i = 0; i < slideNum; i++) {
      if (currentObj.slideCurrent === i) {
        TextBox.textContent = i;
      }
    }
  } else if (Box.id === 'chart-func1-bar') {
    for (let i = 0; i < slideNum; i++) {
      if (currentObj.slideCurrent === i) {
        TextBox.textContent = i;
      }
    }
  }
}

function leftBtnClick(DataObj, BtnObj, leftBtn, currentObj) {
  const { Box } = DataObj;
  const { slideNum, slideOrder, TextBox } = BtnObj;

  leftBtn.addEventListener('click', () => {
    if (currentObj.slideCurrent === 0) {
      slideOrder[currentObj.slideCurrent].classList.remove(
        'chart-slide-current'
      );
      slideOrder[slideNum - 1].classList.add('chart-slide-current');
      currentObj.slideCurrent = slideNum - 1;
    } else {
      slideOrder[currentObj.slideCurrent].classList.remove(
        'chart-slide-current'
      );
      currentObj.slideCurrent--;
      slideOrder[currentObj.slideCurrent].classList.add('chart-slide-current');
    }
    setChartData(DataObj, currentObj, slideNum);
    setChartText(Box, TextBox, currentObj, slideNum);
  });
}
function rightBtnClick(DataObj, BtnObj, rightBtn, currentObj) {
  const { Box } = DataObj;
  const { slideNum, slideOrder, TextBox } = BtnObj;

  rightBtn.addEventListener('click', e => {
    if (currentObj.slideCurrent === slideNum - 1) {
      currentObj.slideCurrent = 0;
      slideOrder[slideNum - 1].classList.remove('chart-slide-current');
      slideOrder[currentObj.slideCurrent].classList.add('chart-slide-current');
    } else {
      slideOrder[currentObj.slideCurrent].classList.remove(
        'chart-slide-current'
      );
      currentObj.slideCurrent++;
      slideOrder[currentObj.slideCurrent].classList.add('chart-slide-current');
    }

    setChartData(DataObj, currentObj, slideNum);
    setChartText(Box, TextBox, currentObj, slideNum);
  });
}

function setChartData(DataObj, currentObj, slideNum) {
  const { Box, DataBox, instance } = DataObj;

  if (Box.id === 'chart-func1-line') {
    const lineMap = new Map([
      [0, '$12'],
      [1, '$24'],
      [2, '$48'],
      [3, '$192'],
      [4, 'all']
    ]);
    DataBox.datasets[0].data =
      lottofunc1.lottoData.oddCount.data.actual[
        lineMap.get(currentObj.slideCurrent)
      ];
    DataBox.datasets[1].data =
      lottofunc1.lottoData.oddCount.data.ideal[
        lineMap.get(currentObj.slideCurrent)
      ];
    instance.update();
  }
  if (Box.id === 'chart-func1-bar') {
    for (let i = 0; i < slideNum - 1; i++) {
      if (currentObj.slideCurrent === i) {
        DataBox.datasets[0].data =
          lottofunc1.lottoData.oddCount.data.ideal['latest'];
        instance.update();
      }
    }
    if (currentObj.slideCurrent === slideNum - 1) {
      const datas = [];

      for (
        let i = 0;
        i < lottofunc1.lottoData.oddCount.data.ideal['latest'].length;
        i++
      ) {
        const data =
          lottofunc1.lottoData.oddCount.data.ideal['latest'][i] -
          lottofunc1.lottoData.oddCount.data.actual['latest'][i];
        datas.push(data);
      }
      DataBox.datasets[0].data = datas;

      instance.update();
    }
  }
}

function initChartData(InitDataBoxObj) {
  const { DataBox, instance } = InitDataBoxObj;

  DataBox[0].datasets[0].data =
    lottofunc1.lottoData.oddCount.data.actual['$12'];
  DataBox[0].datasets[1].data = lottofunc1.lottoData.oddCount.data.ideal['$12'];
  instance[0].update();

  DataBox[1].datasets[0].data =
    lottofunc1.lottoData.oddCount.data.ideal['latest'];
  instance[1].update();

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawBubbleChart);
}

function chartInit() {
  const leftLineBtn = document.querySelector('#left-line-chart-btn');
  const rightLineBtn = document.querySelector('#right-line-chart-btn');
  const leftBarBtn = document.querySelector('#left-bar-chart-btn');
  const rightBarBtn = document.querySelector('#right-bar-chart-btn');
  const main22 = document.querySelector('.main-2-2');
  const main23 = document.querySelector('.main-2-3');
  const LineNum = document.querySelectorAll('.chart-line-num > div');
  const BarNum = document.querySelectorAll('.chart-bar-num > div');
  const LineBox = document.querySelector('#chart-func1-line');

  const LineDataBox = {
    labels: [0, 1, 2, 3, 4, 5, 6],
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
        label: '이상값',
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

  const LineSlideObj = {
    TextBox: main22,
    slideNum: 5,
    slideOrder: LineNum,
    Box: LineBox,
    DataBox: LineDataBox,
    instance: LineInstance,
    leftBtn: leftLineBtn,
    rightBtn: rightLineBtn
  };

  const BarBox = document.querySelector('#chart-func1-bar');

  const BarDataBox = {
    labels: [0, 1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: '이상값',
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

  const BarSlideObj = {
    TextBox: main23,
    slideNum: 3,
    slideOrder: BarNum,
    Box: BarBox,
    DataBox: BarDataBox,
    instance: BarInstance,
    leftBtn: leftBarBtn,
    rightBtn: rightBarBtn
  };

  const InitDataBoxObj = {
    DataBox: [LineDataBox, BarDataBox],
    instance: [LineInstance, BarInstance]
  };

  initChartData(InitDataBoxObj);

  chartSlide(LineSlideObj);

  chartSlide(BarSlideObj);
}
