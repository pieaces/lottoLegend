import { ScanInput, ScanOutput, UpdateItemInput } from "aws-sdk/clients/dynamodb";
import dynamoDB from ".";
import { AWSError } from "aws-sdk";
import { getCurrentRound } from "./functions";

enum Tool {
    'free' = 'a',
    'premium' = 'b'
}
function scanUsersTool(round: number): Promise<{ userName: string, tools?: Tool[] }[]> {
    const params: ScanInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Round': round.toString()
        },
        ProjectionExpression: 'UserName, Numbers.#Round'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);
            const result = data.Items.map(item => {
                return {
                    userName: item.UserName.S,
                    tools: item.Numbers && item.Numbers.M[round].L.map(myNumbers => myNumbers.M.tool.S) as Tool[],
                }
            });
            resolve(result);
        });
    });
}

export default async function autoDelete() {
    const round = getCurrentRound() - 3;
    const users = await scanUsersTool(round);
    for(let i=0; i<users.length; i++){
        const user = users[i];
        const deleteIndex: number[] = [];
        user.tools && user.tools.forEach((tool, index) => {
            if (tool === Tool.free)
                deleteIndex.push(index);
        });
        if (deleteIndex.length > 0) {
            await deleteUsersLotto(user.userName, round, deleteIndex);
        }
    }
    console.log('autoDelete 완료');
}

function deleteUsersLotto(userName: string, round: number, indexes: number[]): Promise<void> {
    let UpdateExpression = "Remove ";
    UpdateExpression += indexes.map(index => `Numbers.#Round[${index}]`).join(',');

    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Round': round.toString()
        },
        Key: {
            UserName: {
                S: userName
            }
        },
        UpdateExpression: UpdateExpression
    }
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    })
}