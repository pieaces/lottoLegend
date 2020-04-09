import AWS from 'aws-sdk';

const sns = new AWS.SNS({ region: 'ap-northeast-1' });

export default function publish(message: string, PhoneNumber: string):Promise<void> {
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