import dynamoDB from '.'
import { AWSError } from 'aws-sdk/lib/error';
import { GetItemOutput, GetItemInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb';

export enum Plan {
    "default" = "a",
    "basic" = "b",
    "premium" = "c",
    "premium+" = "d"
}
const ExpressionAttributeNames = {
    "#Plan": 'Plan',
    '#Until': 'Until'
};

export function getPlan(userName:string):Promise<Plan>{
    const params:GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ProjectionExpression: '#Plan, #Until',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err:AWSError, data:GetItemOutput) => {
            if (err) {
                reject(err);
            }
            else {
                const item = data.Item;
                let plan:Plan = Plan.default;
                if ('Plan' in item && 'Until' in item) {
                    const _plan = item.Plan.S;
                    const now = Number(new Date());
                    const until = Number(new Date(item.Until.S));
                    if (now <= until) {
                        switch (_plan) {
                            case Plan.basic:
                                plan = Plan.basic;
                                //availability = planValues[Plan.basic];
                                break;
                            case Plan.premium:
                                plan = Plan.premium;
                                //availability = planValues[Plan.premium];
                                break;
                            case Plan['premium+']:
                                plan = Plan['premium+']
                        }
                    }
                }
                resolve(plan);
            }
        });
    });
}

export function getPlanKeyAndUntil(userName:string):Promise<{plan:string, until:string}>{
    const params:GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ProjectionExpression: '#Plan, #Until',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err:AWSError, data:GetItemOutput) => {
            if (err) {
                reject(err);
            }
            else {
                const item = data.Item;
                let plan:Plan = Plan.default;
                if ('Plan' in item && 'Until' in item) {
                    const _plan = item.Plan.S;
                    const now = Number(new Date());
                    const until = Number(new Date(item.Until.S));
                    if (now <= until) {
                        switch (_plan) {
                            case Plan.basic:
                                plan = Plan.basic;
                                //availability = planValues[Plan.basic];
                                break;
                            case Plan.premium:
                                plan = Plan.premium;
                                //availability = planValues[Plan.premium];
                                break;
                            case Plan['premium+']:
                                plan = Plan['premium+'];
                        }
                    }
                }
                let planKey:string;
                Object.entries(Plan).forEach(value =>{
                    if(value[1] === plan) planKey = value[0];
                })
                resolve({plan:planKey, until:item.Until.S});
            }
        });
    });
}

export function makePlan(userName: string, plan: Plan, period: number): Promise<void> {
    const time = new Date();
    time.setMonth(time.getMonth() + period);
    const until = time.toISOString();

    const params:UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ExpressionAttributeValues: {
            ':value': {
                S: plan
            },
            ':until': {
                S: until
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Plan = :value, #Until = :until`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err:AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}


export function getPointAndRank(userName:string):Promise<{point:number, rank:number}>{
    const params:GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Rank': 'Rank'
        },
        ProjectionExpression: 'Point, #Rank',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err:AWSError, data:GetItemOutput) => {
            if (err) {
                reject(err);
            }
            resolve({point:Number(data.Item.Point.N), rank: Number(data.Item.Rank.N)})
        });
    });
}