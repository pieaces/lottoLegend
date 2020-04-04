import autoPutSecond from "./dynamo/autoPutSecond";
import autoDelete from "./dynamo/autoDelete";
import autoRank from "./dynamo/autoRank";

exports.handler = async () => {
    await autoPutSecond();
    await autoDelete();
    await autoRank();

    console.log('데이터 자동화 시스템 종료');
};