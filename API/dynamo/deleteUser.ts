import { DeleteItemInput } from "aws-sdk/clients/dynamodb";
import dynamoDB from ".";
import { AWSError } from "aws-sdk";

export default function deleteUser(userName: string): Promise<void> {
    const params: DeleteItemInput = {
        TableName: 'LottoUsers',
        Key:{
            UserName:{
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.deleteItem(params, function (err:AWSError) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}