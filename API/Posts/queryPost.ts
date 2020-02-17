import AWS from 'aws-sdk';
import Post from './interface';
import getPost from './getPost';
//AWS.config.update(require('./key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function queryPost(id: string): Promise<Post> {
    const queryParams = {
        ProjectionExpression: 'Title, WriterName, Contents, ReportingDate, Hits, Comments, ',
        TableName: "Posts",
        ExpressionAttributeNames: {
            "#Id": "Id"
        },
        KeyConditionExpression: "#Id = :id ",
        ExpressionAttributeValues: {
            ":id": { S: id },
        }
    };

    return await new Promise((resolve, reject) => {
        dynamoDB.query(queryParams, function (err, data) {
            if (err) {
                reject('queryPost 에러' + err);
            }
            else {
                const item = data.Items[0];
                const post = getPost(item);
                resolve(post);
            }
        });
    });
}