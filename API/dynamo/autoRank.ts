import { ScanInput, ScanOutput, UpdateItemInput } from "aws-sdk/clients/dynamodb";
import dynamoDB from ".";
import { AWSError } from "aws-sdk";
import Users from "../mariaDB/Users";

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
function yourRankIs(percentile: number) {
    if (percentile < 0.05) { //5%
        return 1;
    } else if (percentile < 0.15) { //10%
        return 2;
    } else if (percentile < 0.3) { //15%
        return 3;
    } else if (percentile < 0.55) { //25%
        return 4;
    } else { //45%
        return 5;
    }
}
function setRank(userName: string, rank: number): Promise<void> {
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
        dynamoDB.updateItem(params, function (err: AWSError) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
export default async function autoRank() {
    const userDB = new Users();
    const users = await scanUsersPoint();
    users.sort((a, b) => b.point - a.point);

    //5, 10, 15, 25, 45
    for (let i = 1; i <= users.length; i++) {
        const userName = users[i - 1].userName;
        const rank = yourRankIs(i / users.length);
        await setRank(userName, rank);
        await userDB.setRank(rank, userName);
    }
    await setRank('lottoend', 0);
    await userDB.setRank(0, 'lottoend');
    await userDB.end();
}