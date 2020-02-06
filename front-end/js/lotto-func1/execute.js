async function init() {
    filterBoxCheck();
    await setLottoOddCount();
    chartInit();
}

init();