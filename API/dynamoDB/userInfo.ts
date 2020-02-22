import { dynamoDB, TableName } from '.'

enum Plan {
    "basic" = "basic",
    "premium" = "premium"
}

function makePlan(userName: string, plan: Plan): Promise<void> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Plan": 'Plan',
        },
        ExpressionAttributeValues: {
            ':value': {
                S: plan
            }
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        ReturnValues: "ALL_NEW",
        UpdateExpression: `SET #Plan = :value, `
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

const userName = 'pieaces';
const plan = Plan.premium;
makePlan(userName, plan);