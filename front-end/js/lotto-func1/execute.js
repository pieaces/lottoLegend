async function init() {
  filterBoxCheck();
  await stats.getData(generator.option.current);
  chartInit(generator.option.current);
}

init();
