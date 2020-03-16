import { ScanInput, ScanOutput, UpdateItemInput } from "aws-sdk/clients/dynamodb"; import dynamoDB from "."; import { AWSError } from "aws-sdk";

function scanUsersPoint(): Promise<{ userName: string, point: number }[]> {
    const params: ScanInput = {
        TableName: 'LottoUsers',
        ProjectionExpression: 'UserName, Point',
    };
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) {
                reject(err);
            }
            resolve(data.Items.map(item => {
                return {
                    userName: item.UserName.S,
                    point: Number(item.Point.N)
                }
            }));
        });
    });
}
function yourRankIs(percentile:number){
    if(percentile<0.05){
        return 1;
    }else if(percentile<0.15){
        return 2;
    }else if(percentile<0.3){
        return 3;
    }else if(percentile<0.55){
        return 4;
    }else{
        return 5;
    }
}
function setRank(userName: string, rank:number):Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        Key: {
            'UserName': {
                S: userName
            }
        },
        ExpressionAttributeNames: {
            '#Rank': 'Rank'
        },
        ExpressionAttributeValues: {
            ':rank': {
                N: rank.toString()
            }
        },
        UpdateExpression: `Set #Rank = :rank`
    };
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, function (err:AWSError) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
export default async function autoRank() {
    const users = await scanUsersPoint();
    users.sort((a, b) => b.point - a.point);
    //5, 10, 15, 25, 45
    for(let i =1; i<=users.length; i++){
        await setRank(users[i-1].userName, yourRankIs(i/users.length));
    }
}