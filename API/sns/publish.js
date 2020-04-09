const AWS = require('aws-sdk');

const sns = new AWS.SNS({ region: 'ap-northeast-1' });

export default function publish(message, PhoneNumber) {
    const params = {
        Message: message,
        PhoneNumber
    };
    return new Promise((resolve, reject) => {
        sns.publish(params, function (err, data) {
            if (err) reject(err);
            resolve();
        });
    })
}