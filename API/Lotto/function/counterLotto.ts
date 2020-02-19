import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB();

export default function counterLotto():Promise<number> {
    var params = {
        TableName: "LottoData"
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject("counterLotto 오류: " + err)
            }
            else {
                resolve(data.Count);
            };
        });
    })
}