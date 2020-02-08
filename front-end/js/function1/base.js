class ChartBase {
  constructor(type, ele, dataBox, option, filter) {
    this.dataBox = dataBox;
    this.option = option;
    this.instance = new Chart(ele, {
      type: type,
      data: this.dataBox
    });
    this.filter = filter;
  }
}

class BarChart extends ChartBase {
  constructor(ele, filter) {
    const option = { legend: false }
    const dataBox = {
      labels: filter.getLabel(),
      datasets: [
        {
          label: '막대',
          backgroundColor: 'rgba(91, 81,255, 0.2)',
          pointBackgroundColor: 'white',
          borderWidth: 2,
          borderColor: 'rgb(14,99,132)',
          data: null
        }
      ]
    };
    super('bar', ele, dataBox, option, filter);

  }
}


class LineChart extends ChartBase {
  constructor(ele, filter) {
    const option = {
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
    }
    const dataBox = {
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
    super('line', ele, dataBox, option, filter);
  }
}

class Slide {
  constructor(size, chart, leftBtn, rightBtn, numBtn, textBox) {
    this.current = 0;
    this.size = size;
    this.chart = chart;
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.numBtn = numBtn;
    this.textBox = textBox;
  }
  init() { }
  setData() { }
  setText() {
    this.textBox.textContent = this.current;

  }
  leftBtnClickable() {
    this.leftBtn.addEventListener('click', () => {
      this.numBtn[this.current].classList.remove('chart-slide-current');
      if (this.current === 0) {
        this.numBtn[this.size - 1].classList.add('chart-slide-current');
        this.current = this.size - 1;
      } else {
        this.current--;
        this.numBtn[this.current].classList.add('chart-slide-current');
      }
      this.setData();
      this.setText();
    });
  }
  rightBtnClickable() {
    this.rightBtn.addEventListener('click', () => {
      if (this.current === this.size - 1) {
        this.numBtn[this.size - 1].classList.remove('chart-slide-current');
        this.current = 0;
      } else {
        this.numBtn[this.current].classList.remove('chart-slide-current');
        this.current++;
      }
      this.numBtn[this.current].classList.add('chart-slide-current');

      this.setData();
      this.setText();
    });
  }
  numBtnClickable() {
    for (let i = 0; i < this.numBtn.length; i++) {
      this.numBtn[i].addEventListener('click', () => {
        this.numBtn[this.current].classList.remove('chart-slide-current');
        this.current = i;
        this.numBtn[this.current].classList.add('chart-slide-current');

        this.setData();
        this.setText();
      });
    }
  }

  init() {
    this.leftBtnClickable();
    this.rightBtnClickable();
    this.numBtnClickable();
  }
}

class BarSlide extends Slide {
  constructor(barEle, filter, leftBtn, rightBtn, numBtn, textBox) {
    super(3, new BarChart(barEle, filter), leftBtn, rightBtn, numBtn, textBox);
  }
  setData() {
    const data = this.chart.filter.getStats();
    const rep = this.chart.dataBox.datasets[0];
    switch (this.current) {
      case 0:
        rep.data = data.ideal['latest'];
        break;
      case 1:
        rep.data = data.actual['latest'];
        break;
      case 2:
        const temp = [];
        for (let i = 0; i < data.ideal['latest'].length; i++) {
          const datum = data.ideal['latest'][i] - data.actual['latest'][i];
          temp.push(datum);
        }
        rep.data = temp;
        break;
    }
    this.chart.instance.update();
  }

  init() {
    super.init();
    this.chart.dataBox.datasets[0].data = filter.getStats().ideal['latest'];
    this.chart.instance.update();
  }
}

class LineSlide extends Slide {
  constructor(lineEle, filter, leftBtn, rightBtn, numBtn, textBox) {
    super(5, new LineChart(lineEle, filter), leftBtn, rightBtn, numBtn, textBox);
  }
  setData() {
    const data = this.chart.filter.getStats();
    const rep1 = this.chart.dataBox.datasets[0];
    const rep2 = this.chart.dataBox.datasets[1];
    const lineMap = {
      0: '$12',
      1: '$24',
      2: '$48',
      3: '$192',
      4: 'all'
    };
    rep1.data = data.actual[lineMap[this.current]];
    rep2.data = data.ideal[lineMap[this.current]];
    this.chart.instance.update();
  }
  init() {
    super.init();
    this.chart.dataBox.datasets[0].data = filter.getStats().actual['$12'];
    this.chart.dataBox.datasets[1].data = filter.getStats().ideal['$12'];
    this.chart.instance.update();
  }
}