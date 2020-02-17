import AWS from 'aws-sdk';
import Post from './interface';
import getPost from './getPost';
AWS.config.update(require('../key.json'));
const dynamoDB = new AWS.DynamoDB();

export default async function read(): Promise<Post[]> {
    var params = {
        TableName: "Posts"
    };
    return await new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject('scanPost 에러: ' + err);
            }
            else {
                const items = data.Items;
                const posts: Post[] = items.map(item => {
                    return getPost(item);
                });
                resolve(posts);
            }
        });
    });
}