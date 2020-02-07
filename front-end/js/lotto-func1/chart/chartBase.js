function initChartData() {
  initLineChartData();

  initBarChartData();

  initBubbleChartData();
}

function chartSlide() {
  chartLineSlide(5);
  chartBarSlide(3);
}

function chartInit() {
  initChartData();
  chartSlide();
}
