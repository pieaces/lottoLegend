import dynamoDB from ".";
import { AWSError } from "aws-sdk";
import { UpdateItemInput } from "aws-sdk/clients/dynamodb";

export function addPoint(userName:string, point:number):Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeValues: {
            ':operand': {
                N: point.toString()
            }
        },
        Key: {
            UserName: {
                S: userName
            }
        },
        UpdateExpression: 'ADD Point :operand'
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
export function rankToString(rank:number){
    switch(rank){
        case 1: return 'firstWinner';
        case 2: return 'secondWinner';
        case 3: return 'thirdWinner';
        case 4: return 'fourthWinner';
        case 5: return 'fifthWinner';
    }
}