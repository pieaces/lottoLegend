import { Response } from '../Response'
import { dynamoDB } from '../dynamoDB';

export function getCurrentRound(currentDate?: string): number {
    const theDate = new Date('2020-02-01:11:50');
    const today = currentDate && new Date(currentDate) || new Date();
    const between = Number(today) - Number(theDate);
    const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);
    return 896 + plusDate;
}

export function isIdentical(currentId: string, writerId: string): Response {
    if (currentId === writerId) {
        return new Response(false);
    } else {
        return new Response(true, '작성자가 아닙니다.');
    }
}

export async function scanLotto(): Promise<{ BonusNum: { N: string }, Numbers: { NS: string[] } }[]> {
    const params = {
        TableName: 'LottoData',
        ProjectionExpression: 'Numbers, BonusNum'
    };
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data: any) => {
            if (err) reject(err);
            resolve(data.Items);
        });
    });
}

export async function getLotto(round: number): Promise<number[]> {
    const params = {
        TableName: 'LottoData',
        ProjectionExpression: 'Numbers',
        Key: {
            "Round": {
                N: round.toString()
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: any, data: any) => {
            if (err) reject(err);
            if (data.Item) resolve(data.Item.Numbers.NS.map((item: string) => Number(item)).sort((a: number, b: number) => a - b));
            else resolve();
        });
    });
}