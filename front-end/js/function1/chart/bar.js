const leftBarBtn = document.querySelector('#left-bar-chart-btn');
const rightBarBtn = document.querySelector('#right-bar-chart-btn');
const BarNum = document.querySelectorAll('.chart-bar-num > div');
const BarBox = document.querySelector('#chart-func1-bar');
const main23 = document.querySelector('.main-2-3');

class Chart {
  constructor(type, ele, dataSets, option, filter) {
    this.dataSets = dataSets;
    this.option = option;
    this.instance = new Chart(ele, {
      type: type,
      data: this.dataSets
    });
    this.filter = filter;
  }
}

class BarChart extends Chart {
  constructor(ele, filter) {
    const option = { legend: false }
    const dataSets = {
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
    super('bar', ele, dataSets, option, filter);
  }
}


class LineChart extends Chart {
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
    const dataSets = {
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
    super('line', ele, dataSets, option, filter);

  }
}

class Slide {
  constructor(size, chart, leftBtn, rightBtn, numBtn, textBox) {
    super();
    this.current = 0;
    this.size = size;
    this.chart = chart;
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.numBtn = numBtn;
    this.textBox = textBox;
  }
  setData() { }
  setText() { }
}

class BarSlide extends Slide {
  constructor(leftBtn, rightBtn, numBtn, textBox) {
    super(3, leftBtn, rightBtn, numBtn, textBox);
  }
  setData() {
    const data = this.chart.filter.getStats();
    const rep = this.dataSets.datasets[0];
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
  setText() {
    for (let i = 0; i < this.size; i++) {
      if (this.current === i) {
        this.textBox.textContent = i;
      }
    }
  }
}

class LineSlide extends Slide {
  constructor(leftBtn, rightBtn, numBtn, textBox) {
    super(5, leftBtn, rightBtn, numBtn, textBox);
  }
  setData() {
    const data = this.chart.filter.getStats();
    const rep1 = this.dataSets.datasets[0];
    const rep2 = this.dataSets.datasets[1];
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
  setText() {
    if (this.current === i) {
      this.textBox.textContent = i;
    }
  }
}