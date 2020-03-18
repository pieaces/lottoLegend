import { UpdateItemInput } from "aws-sdk/clients/dynamodb";
import dynamoDB from ".";
import { AWSError } from "aws-sdk";

export default function setPhone(userName: string, phone: string): Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        Key: {
            UserName: {
                S: userName
            }
        },
        ExpressionAttributeNames: {
            "#Phone": 'Phone'
        },
        ExpressionAttributeValues: {
            ":phone": {
                S: phone
            }
        },
        UpdateExpression: 'SET #Phone = :phone'
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