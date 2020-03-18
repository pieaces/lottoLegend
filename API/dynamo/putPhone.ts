import dynamoDB from ".";
import { AWSError } from "aws-sdk/lib/error";

export default function putPhone(userName:string, phone:string) {
    const params = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Phone": 'Phone',
        },
        ExpressionAttributeValues: {
            ":phone": {
                S: phone
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Phone = :phone`
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