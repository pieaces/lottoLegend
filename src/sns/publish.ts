import AWS, { AWSError } from 'aws-sdk';
import { getCurrentRound, numsArrToString } from '../funtions';
import { GetItemInput } from 'aws-sdk/clients/dynamodb';
import { dynamoDB } from '../dynamoDB';

const sns = new AWS.SNS({ region: 'ap-northeast-1' });

export default function publish(message: string, PhoneNumber: string): Promise<void> {
    const params = {
        Message: message,
        PhoneNumber
    };
    return new Promise((resolve, reject) => {
        sns.publish(params, function (err: any, data: any) {
            if (err) reject(err);
            resolve();
        });
    })
}

export async function putNumberMessage(userName: string, numbersList: number[][]) {
    const round = getCurrentRound() + 1;
    const phone = await getPhoneNumber(userName);
    if (phone) {
        await publish(`[로또끝] ${round}회 프리미엄조합\n` + numsArrToString(numbersList), phone);
        console.log(userName, phone, '가입후 첫 번호 전송');
    }
};

export async function getPhoneNumber(userName: string): Promise<string> {
    const queryParams: GetItemInput = {
        TableName: "LottoUsers",
        ProjectionExpression: 'Phone',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return await new Promise((resolve, reject) => {
        dynamoDB.getItem(queryParams, (err: AWSError, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.Item.Phone && data.Item.Phone.S);
        })
    });
}