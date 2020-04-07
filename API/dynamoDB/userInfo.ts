import dynamoDB from ".";
import {  UpdateItemInput, GetItemInput, GetItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

export enum Point{
    post=5,
    comment=1,
    recommend=1,
    recommended=5,
}
export function addPoint(userName:string, point:Point):Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeValues: {
            ':operand': {
                N: point.toString()
            }
        },
        Key: {
            UserName: {
                S: userName
            }
        },
        UpdateExpression: 'ADD Point :operand'
    }
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}
export function subtractPoint(userName:string, point:Point):Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeValues: {
            ':operand': {
                N: point.toString()
            }
        },
        Key: {
            UserName: {
                S: userName
            }
        },
        UpdateExpression: 'SET Point = Point - :operand'
    }
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

export function getRank(userName: string): Promise<number> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Rank': 'Rank'
        },
        ProjectionExpression: '#Rank',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            resolve(Number(data.Item.Rank.N))
        });
    });
}

export enum Plan {
    "default" = "a",
    "basic" = "b",
    "premium" = "c",
    "premium+" = "d"
}

export function getPlanName(plan:Plan){
    switch(plan){
        case Plan.default: return '없음';
        case Plan.basic: return '기본';
        case Plan.premium: return '프리미엄';
        case Plan["premium+"]: return '프리미엄+';
    }
}
export function getMainUserInfo(userName: string): Promise<{ point: number, rank: number, plan:string }> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Rank': 'Rank',
            "#Plan": 'Plan',
            '#Until': 'Until'
        },
        ProjectionExpression: 'Point, #Rank, #Plan, #Until',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            let plan: Plan = Plan.default;
            if ('Plan' in data.Item && 'Until' in data.Item) {
                const _plan = data.Item.Plan.S;
                const now = Number(new Date());
                const until = Number(new Date(data.Item.Until.S));
                if (now <= until) {
                    switch (_plan) {
                        case Plan.basic:
                            plan = Plan.basic;
                            break;
                        case Plan.premium:
                            plan = Plan.premium;
                            break;
                        case Plan['premium+']:
                            plan = Plan['premium+']
                    }
                }
            }
            resolve({ point: Number(data.Item.Point.N), rank: Number(data.Item.Rank.N), plan:getPlanName(plan) });
        });
    });
}