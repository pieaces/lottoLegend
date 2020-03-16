import autoRank from "./dynamo/autoRank";

exports.handler = async () => {
    await autoRank();
    console.log('Rank 자동화 종료');
};