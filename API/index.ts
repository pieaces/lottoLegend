import autoPutSecond from "./dynamo/autoPutSecond";
import autoDelete from "./dynamo/autoDelete";
import autoRank from "./dynamo/autoRank";
import counterLotto, { getCurrentRound } from "./dynamo/functions";

exports.handler = async () => {
    const total = getCurrentRound();
    const count = await counterLotto() - 1;
    if (count < total) {
        await autoPutSecond();
        await autoDelete();
        await autoRank();
    }else{
        console.log('최신화 상태');
    }
    console.log('데이터 자동화 시스템 종료');
};