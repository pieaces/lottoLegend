import { ScanInput, ScanOutput } from "aws-sdk/clients/dynamodb";
import dynamoDB from ".";
import { AWSError } from "aws-sdk";

export default function getUserNameByPhone(phone: string): Promise<string[]> {
    const params: ScanInput = {
        TableName: 'LottoUsers',
        ProjectionExpression: 'UserName, Phone'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, async (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);
            const users = data.Items.filter(item => item.Phone && item.Phone.S === phone).map(user => {
                let userName = user.UserName.S;
                if (userName.length >= 7) userName = userName.slice(0, -3) + '***';
                else userName = userName.slice(0, -2) + '**';
                return userName;
            });
            resolve(users);
        });
    });
}