async function init() {
  filterBoxCheck();
  stats.getData();
  chartInit(generator.option.current);
}

init();
