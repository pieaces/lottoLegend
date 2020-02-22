import { dynamoDB, TableName } from '.'

enum Plan {
    "basic" = "basic",
    "premium" = "premium"
}
const planValues = {
    default: 10,
    [Plan.basic]: 12,
    [Plan.premium]: 24
};
const ExpressionAttributeNames = {
    "#Plan": 'Plan',
    '#Until': 'Until'
};

export function numsAvailability(userName:string):Promise<number>{
    const params = {
        TableName,
        ExpressionAttributeNames,
        ProjectionExpression: '#Plan, #Until',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                const item = data.Item;
                let availability = planValues.default;
                if ('Plan' in item && 'Until' in item) {
                    const plan = item.Plan.S;
                    const now = Number(new Date());
                    const until = Number(new Date(item.Until.S));
                    if (now <= until) {
                        switch (plan) {
                            case Plan.basic:
                                availability = planValues[Plan.basic];
                                break;
                            case Plan.premium:
                                availability = planValues[Plan.premium];
                                break;
                        }
                    }
                }
                resolve(availability);
            }
        });
    });
}
export function makePlan(userName: string, plan: Plan, period: number): Promise<void> {
    const time = new Date();
    time.setMonth(time.getMonth() + period);
    const until = time.toISOString();

    const params = {
        TableName,
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
        dynamoDB.updateItem(params, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}