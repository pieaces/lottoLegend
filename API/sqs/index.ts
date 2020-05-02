import SQS from 'aws-sdk/clients/sqs';
const sqs = new SQS({ region: 'ap-northeast-2' });

export default async function queue(message:string): Promise<void> {
    const MessageBody = message;
    return new Promise((resolve, reject) => {
        var params = {
            MessageBody,
            QueueUrl: "https://sqs.ap-northeast-2.amazonaws.com/456509902517/lotto-alarm"
        };
        
        sqs.sendMessage(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                console.log("Success", data.MessageId);
                resolve();
            }
        });
    })
}