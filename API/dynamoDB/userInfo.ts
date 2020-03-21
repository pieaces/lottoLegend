import { dynamoDB } from '.'
import { ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';

export enum Plan {
    "default" = "a",
    "basic" = "b",
    "premium" = "c",
    "premium+" = "d"
}

function planValue(plan: Plan, _until: string) {
    const now = Number(new Date());
    const until = Number(new Date(_until));
    if (now <= until) {
        switch (plan) {
            case Plan.basic:
                return 10;
            case Plan.premium:
                return 20;
            case Plan['premium+']:
                return 40;
            default: return 0;
        }
    }
}
function isCharged(user: { plan: Plan, until?: string }) {
    if(!user.until || planValue(user.plan, user.until) === 0) return false;
    if (planValue(user.plan, user.until) > 0) return true;
}
export function scanUsers(): Promise<{ userName: string, value: number }[]> {
    const params: ScanInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#UserName": 'UserName',
            "#Plan": 'Plan',
            "#Until": 'Until'
        },
        ProjectionExpression: '#UserName, #Plan, #Until'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);
            const result = data.Items
                .filter(item => isCharged({ plan: item.Plan.S as Plan, until: item.Until && item.Until.S }))
                .map(item => {
                    return {
                        userName: item.UserName.S,
                        value: planValue(item.Plan.S as Plan, item.Until.S)
                    }
                });
            resolve(result);
        });
    });
}
