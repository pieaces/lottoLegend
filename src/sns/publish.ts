import { AWSError } from 'aws-sdk';
import { getCurrentRound, numsArrToString } from '../funtions';
import { GetItemInput } from 'aws-sdk/clients/dynamodb';
import { dynamoDB } from '../dynamoDB';

//
import querystring from 'querystring';
import request from 'request';
//
export default function publish(message: string, phoneNumber: string, title="로또끝"): Promise<void> {
    const params = {
        "key": "46srm39zvo8hbsv9rkrk3z67ja56p5wc",
        "user_id": "lottoend",
        "sender": "15991707",
        "receiver": '0' + phoneNumber.slice(3),
        "msg": message,
        "title": title,
        "msg_type": "MMS",
    };

    return new Promise((resolve, reject) => {
        request.post({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // important to interect with PHP
            url: 'https://apis.aligo.in/send/',
            body: querystring.stringify(params),
        }, function (error, response, body) {
            if(error) reject(error);
            else resolve(body);
        });
    })
}

export async function putNumberMessage(nickName: string, planValue:number, numbersList: number[][], phone:string) {
    const round = getCurrentRound() + 1;
    if(nickName === ''){
        await publish(`[로또끝] 함께해주셔서 감사합니다!\n${round}회 프리미엄 ${planValue}조합\n` + numsArrToString(numbersList), phone, '로또끝 프리미엄 결제 완료');
    }else{
        await publish(`[로또끝] ${nickName}님의 당첨을 기원합니다!\n${round}회 프리미엄 ${planValue}조합\n` + numsArrToString(numbersList), phone, '로또끝 프리미엄 조합');
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