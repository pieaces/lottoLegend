import AWS from 'aws-sdk'
import Post from './interface'

export default function (item: AWS.DynamoDB.AttributeMap): Post {
    const post: Post = {
        title: item.Title.S,
        writerName: item.WriterName.S,
        contents: item.Contents.S,
        timestamp: item.Timestamp.S,
        hits: Number(item.Hits.N)
    }
    if (item.Comments) {
        post.comments = {
            writerName: item.Comments.M.writerName.S,
            contents: item.Comments.M.contents.S,
            timestamp: item.Comments.M.timestamp.S
        }
    }
    return post;
}