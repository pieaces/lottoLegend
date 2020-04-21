import AWS from 'aws-sdk';
import { getCurrentRound, numsArrToString } from '../funtions';

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

export async function numberMessage(numbersList: number[][]) {
    const round = getCurrentRound() + 1;
    await publish(`[로또끝] ${round}회 프리미엄조합\n` + numsArrToString(numbersList), phone);
    console.log('정상종료');
};