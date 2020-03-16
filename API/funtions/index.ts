import { Response } from '../Response'
import dynamoDB from '../dynamoDB';
import { ScanInput, ScanOutput, GetItemInput, GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';

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
    const params:ScanInput = {
        TableName: 'LottoData',
        ProjectionExpression: 'Numbers, BonusNum'
    };
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err:AWSError, data: ScanOutput) => {
            if (err) reject(err);
            resolve(data.Items as { BonusNum: { N: string }, Numbers: { NS: string[] } }[]);
        });
    });
}

export async function getLotto(round: number): Promise<number[]> {
    const params:GetItemInput = {
        TableName: 'LottoData',
        ProjectionExpression: 'Numbers',
        Key: {
            "Round": {
                N: round.toString()
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) reject(err);
            if (data.Item) resolve(data.Item.Numbers.NS.map((item: string) => Number(item)).sort((a: number, b: number) => a - b));
            else resolve();
        });
    });
}

export function getLotto2(round: number): Promise<{numbers:number[], bonusNum:number}> {
    const params: GetItemInput = {
        ProjectionExpression: 'Numbers, BonusNum',
        TableName: "LottoData",
        Key: {
            'Round': {
                N: round.toString()
            }
        },
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, function (err, data) {
            if (err) {
                reject(err);
            }
            if (data.Item) {
                const numbers = data.Item.Numbers.NS.map(value => Number(value)).sort((a, b) => a - b);
                const bonusNum = Number(data.Item.BonusNum.N)
                resolve({ numbers, bonusNum });
            } else resolve();
        });
    });
}