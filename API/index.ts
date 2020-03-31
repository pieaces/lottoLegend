import autoPutLotto from "./dynamo/autoPutLotto";
import autoPutInfo from "./dynamo/autoPutInfo";

exports.handler = async () => {
    await autoPutLotto();
    await autoPutInfo();
    console.log('데이터 입력단계 종료');
};