async function init() {
  filterBoxCheck();
  stats.getData(generator.option.current);
  chartInit(generator.option.current);
}

init();
