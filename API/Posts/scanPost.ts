import AWS from 'aws-sdk';
import Post from './interface';
// AWS.config.update(require('./key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function read(): Promise<Post[]> {
    var params = {
        TableName: "LottoData"
    };
    return await new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject('scanPost 에러: ' + err);
            }
            else {
                const item = data.Items;
                const posts: Post[] = item.map(item => {
                    const post: Post = {
                        title: item.Title.S,
                        writerName: item.WriterName.S,
                        contents: item.Contents.S,
                        reportingDate: item.ReportingDate.S,
                        hits: Number(item.Hits.N)
                    };
                    if (item.Comments) {
                        post.comments = {
                            writerName: item.Comments.M.writerName.S,
                            contents: item.Comments.M.contents.S,
                            reportingDate: item.Comments.M.reportingDate.S
                        }
                    }
                    return post
                });
                resolve(posts);
            }
        });
    });
}