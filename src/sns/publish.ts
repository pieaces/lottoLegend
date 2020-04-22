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

export async function putNumberMessage(userName: string, planValue:number, numbersList: number[][], phone?:string) {
    const round = getCurrentRound() + 1;
    await publish(`[로또끝] ${userName}님의 당첨을 기원합니다!\n${round}회 프리미엄 ${planValue}조합\n` + numsArrToString(numbersList), phone);
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