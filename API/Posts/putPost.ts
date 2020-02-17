import AWS from 'aws-sdk';
import uuidv from 'uuid/v1';
import Post from './interface';

AWS.config.update(require('../key.json'));
const dynamodb = new AWS.DynamoDB();

export default async function putPost(post: Post): Promise<boolean> {
    const d = new Date();
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
                S: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
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