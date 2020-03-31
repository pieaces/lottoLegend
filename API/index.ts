import autoPutSecond from "./dynamo/autoPutSecond";
import autoDelete from "./dynamo/autoDelete";
import autoRank from "./dynamo/autoRank";
import counterLotto, { getCurrentRound } from "./dynamo/functions";
import lambda from "./lambda";

exports.handler = async () => {
    const params = {
        FunctionName: 'lotto-auto-put-lotto',
    };
    lambda.invoke(params, function (err) {
        if (err) console.log(err);
    });

    const total = getCurrentRound();
    const count = await counterLotto() - 1;
    if (count < total) {
        await autoPutSecond();
        await autoDelete();
        await autoRank();
    }
    console.log('데이터 자동화 시스템 종료');
};