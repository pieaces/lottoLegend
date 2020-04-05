import dynamoDB from ".";
import { AWSError } from "aws-sdk/lib/error";
import { GetItemOutput } from "aws-sdk/clients/dynamodb";

export default function getMainPage(round: number): Promise<{ round:number, numbers:number[], bonusNum:number, winner:number, winAmount:number, win:number[], info:any[] }> {
    const params = {
        TableName: 'LottoData',
        ProjectionExpression: 'Numbers, BonusNum, WinAmount, Winner, Win, Info',
        Key: {
            "Round": {
                N: round.toString()
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, async (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            if ('Win' in data.Item && 'Info' in data.Item) {
                const numbers = data.Item.Numbers.NS.map(num => Number(num)).sort((a, b) => a - b);
                const bonusNum = Number(data.Item.BonusNum.N);
                const winner = Number(data.Item.Winner.N);
                const winAmount = Number(data.Item.WinAmount.N);
                const win = [
                    data.Item.Win.M.firstWinner && data.Item.Win.M.firstWinner.SS.length || 0,
                    data.Item.Win.M.secondWinner && data.Item.Win.M.secondWinner.SS.length || 0,
                    data.Item.Win.M.thirdWinner && data.Item.Win.M.thirdWinner.SS.length || 0,
                    data.Item.Win.M.fourthWinner && Number(data.Item.Win.M.fourthWinner.N) || 0,
                    data.Item.Win.M.fifthWinner && Number(data.Item.Win.M.fifthWinner.N) || 0
                ];
                const info = [
                    data.Item.Info.M.first.M,
                    data.Item.Info.M.second.M,
                    data.Item.Info.M.third.M,
                    data.Item.Info.M.fourth.M,
                    data.Item.Info.M.fifth.M
                ].map(item => {
                    return {
                        winner: Number(item.winner.N),
                        winAmount: Number(item.winAmount.N)
                    }
                });
                resolve({ round, numbers, bonusNum, winner, winAmount, win, info });
            } else {
                resolve(await getMainPage(round - 1));
            }
        });
    });
}