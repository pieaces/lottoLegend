import autoPutLotto from "./Lotto/dynamo/autoPutLotto";
import autoPutSecond from "./Lotto/dynamo/autoPutSecond";
import autoDelete from "./Lotto/dynamo/autoDelete";

exports.handler = async () => {
    const status = await autoPutLotto();
    if(status){
        await autoPutSecond();
        await autoDelete();
    }
    console.log('데이터 자동화 시스템 종료');
};