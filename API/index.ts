import autoPutLotto from "./Lotto/dynamo/autoPutLotto";

exports.handler = async () => {
    await autoPutLotto();
    console.log('데이터 자동화 시스템 종료');
};