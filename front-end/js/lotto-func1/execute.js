async function init() {
  filterBoxCheck();
  await stats.getData(generator.option.current);
  chartInit(stats[generator.option.current]);
}

init();
