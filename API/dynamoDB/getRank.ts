import AWS from 'aws-sdk'
const dynamoDB = new AWS.DynamoDB();

export enum Plan {
    "default" = "a",
    "basic" = "b",
    "premium" = "c"
}
export function getRank(userName:string):Promise<string>{
    const params = {
        TableName:'lottoUsers',
        ExpressionAttributeNames: {
            "#Plan": 'Plan',
            '#Until': 'Until'
        },
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
                let rank = Plan.default;
                if ('Plan' in item && 'Until' in item) {
                    const plan = item.Plan.S;
                    const now = Number(new Date());
                    const until = Number(new Date(item.Until.S));
                    if (now <= until) {
                        switch (plan) {
                            case Plan.basic:
                                rank = Plan.basic;
                                //availability = planValues[Plan.basic];
                                break;
                            case Plan.premium:
                                rank = Plan.premium;
                                //availability = planValues[Plan.premium];
                                break;
                        }
                    }
                }
                resolve(rank);
            }
        });
    });
}