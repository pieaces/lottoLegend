import AWS from 'aws-sdk'
const dynamoDB = new AWS.DynamoDB();

const TableName = 'LottoUsers';
export enum Plan {
    "default" = "a",
    "basic" = "b",
    "premium" = "c",
    "premiumplus" = "d"
}
export function getRank(userName:string):Promise<string>{
    const params = {
        TableName,
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


export enum IncOrExc {
    "include" = "Include",
    "exclude" = "Exclude"
}

export function getIncOrExcNumbers(userName: string, round: number, choice: IncOrExc): Promise<number[]> {
    const params = {
        TableName,
        ExpressionAttributeNames: {
            "#Choice": choice,
            "#Round": round.toString()
        },
        ProjectionExpression: '#Choice.#Round',
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
                if (choice in item) {
                    const result = item[choice].M && item[choice].M[round.toString()].L;
                    resolve(result.map(item => Number(item.N)));
                }
                resolve([]);
            }
        });
    });
}