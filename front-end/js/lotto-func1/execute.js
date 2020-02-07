async function lottoFunc1() {
  filterBoxCheck();
  await stats.getData(generator.option.current);
  chartData.data = stats[generator.option.current];
  chartInit();
}

lottoFunc1();
