import AWS from 'aws-sdk';
import uuidv from 'uuid/v1';
import Post from './interface';

AWS.config.update(require('../key.json'));
const dynamodb = new AWS.DynamoDB();

function twoPosition(num: number) {
    if (num < 10) return '0' + num;
    return num;
}
function ISOFormat(d: Date) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    return `${year}-${twoPosition(month)}-${twoPosition(date)}T${twoPosition(hours)}:${twoPosition(minutes)}:${twoPosition(seconds)}Z`;
    //2020-02-17T19:37:34Z
}
export default async function putPost(post: Post): Promise<boolean> {
    const params = {
        Item: {
            "Id": {
                S: uuidv()
            },
            "Title": {
                S: post.title
            },
            "WriterId": {
                S: post.writerId
            },
            "WriterName": {
                S: post.writerName
            },
            "Contents": {
                S: post.contents
            },
            "ReportingDate": {
                S: ISOFormat(new Date())
            },
            "Hits": {
                N: '0'
            }
        },
        TableName: "Posts"
    };
    return await new Promise((resolve) => {
        dynamodb.putItem(params, function (err, data) {
            if (err) {
                console.log('putPost 에러: ', err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}