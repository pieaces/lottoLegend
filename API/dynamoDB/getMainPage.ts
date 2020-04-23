import dynamoDB from ".";
import { AWSError } from "aws-sdk/lib/error";
import { GetItemOutput, GetItemInput } from "aws-sdk/clients/dynamodb";

export function getLottoData(round: number): Promise<{ round: number, numbers: number[], bonusNum: number, winner: number, winners: any[], winAmount: number, win: number[], info: any[] }> {
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
            if (err) reject(err);
            
            let numbers, bonusNum, winner, winAmount, win, winners, info;

            if ('Info' in data.Item) {
                info = [
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
                if ('Win' in data.Item) {
                    win = [
                        data.Item.Win.M.firstWinner && data.Item.Win.M.firstWinner.SS.length || 0,
                        data.Item.Win.M.secondWinner && data.Item.Win.M.secondWinner.SS.length || 0,
                        data.Item.Win.M.thirdWinner && data.Item.Win.M.thirdWinner.SS.length || 0,
                        data.Item.Win.M.fourthWinner && Number(data.Item.Win.M.fourthWinner.N) || 0,
                        data.Item.Win.M.fifthWinner && Number(data.Item.Win.M.fifthWinner.N) || 0
                    ];
                    winners = [
                        data.Item.Win.M.firstWinner && data.Item.Win.M.firstWinner.SS.map(userName => protectUserName(userName)),
                        data.Item.Win.M.secondWinner && data.Item.Win.M.secondWinner.SS.map(userName => protectUserName(userName)),
                        data.Item.Win.M.thirdWinner && data.Item.Win.M.thirdWinner.SS.map(userName => protectUserName(userName)),
                    ];
                }                
            }
            if ('Numbers' in data.Item) {
                numbers = data.Item.Numbers.NS.map(num => Number(num)).sort((a, b) => a - b);
                bonusNum = Number(data.Item.BonusNum.N);
                winner = Number(data.Item.Winner.N);
                winAmount = Number(data.Item.WinAmount.N);
                resolve({ round, numbers, bonusNum, winner, winners, winAmount, win, info });
            } else {
                resolve(await getLottoData(round - 1));
            }
        });
    });
}

export function getWinStats(): Promise<number[]> {
    const params: GetItemInput = {
        TableName: 'LottoStats',
        Key: {
            "Name": {
                S: 'win'
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            resolve([Number(data.Item.firstWinner.N), Number(data.Item.secondWinner.N), Number(data.Item.thirdWinner.N), Number(data.Item.fourthWinner.N), Number(data.Item.fifthWinner.N)]);
        });
    });
}

function protectUserName(userName:string){
    return userName.slice(0, -2) + '**';
}