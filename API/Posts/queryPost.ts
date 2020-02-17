import AWS from 'aws-sdk';
import Post from './interface';
//AWS.config.update(require('./key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function queryPost(id: string): Promise<Post> {
    const queryParams = {
        ProjectionExpression: 'Title, WriterName, ReportingDate, Contents, Comments, Hits',
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
                const post: Post = {
                    title: item.Title.S,
                    writerName: item.WriterName.S,
                    contents: item.Contents.S,
                    reportingDate: item.ReportingDate.S,
                    hits: Number(item.Hits.N)
                }
                if (item.Comments) {
                    post.comments = {
                        writerName: item.Comments.M.writerName.S,
                        contents: item.Comments.M.contents.S,
                        reportingDate: item.Comments.M.reportingDate.S
                    }
                }
                resolve(post);
            }
        });
    });
}