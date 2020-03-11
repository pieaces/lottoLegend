import { dynamoDB } from ".";

export function getRank(userName: string): Promise<number> {
    const params = {
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
        dynamoDB.getItem(params, (err: any, data: any) => {
            if (err) {
                reject(err);
            }
            if(data.Item){
                resolve(Number(data.Item.Rank.S));
            }else resolve();
        });
    });
}