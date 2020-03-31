import autoPutLotto from "./dynamo/autoPutLotto";
import autoPutSecond from "./dynamo/autoPutSecond";
import autoDelete from "./dynamo/autoDelete";
import autoRank from "./dynamo/autoRank";
import autoPutInfo from "./dynamo/autoPutInfo";

exports.handler = async () => {
    const status = await autoPutLotto();
    await autoPutInfo();
    if(status){
        await autoPutSecond();
        await autoDelete();
        await autoRank();
    }
    console.log('데이터 자동화 시스템 종료');
};