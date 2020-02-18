import DB from "../DB"
import { RowDataPacket } from "mysql2";
import {Comment} from '../Comments/index'

interface Post{
    postId:number;
    title:string;
    writerId:string;
    writerName:string;
    contents:string;
    created:Date,
    hits:number;
    commentId:Comment | null;
}
export default class Posts extends DB {
    constructor(){
        super();
        this.tableName = 'Posts';
    }
    async scan<Post>() {
        const [rows] =
            await this.promisePool.execute(
                'SELECT P.postId, P.title, P.writerId, P.writerName, P.created, P.hits FROM Posts AS P ORDER BY created DESC LIMIT 10');
        this.end();
        return rows as Post[];
    }
    async get<Post>(id: number) {
        const [rows] =
            await this.promisePool.execute(
                'SELECT P.postId, P.title, P.writerId, P.writerName, P.contents, P.created, P.hits, C.commentId, C.writerId as `commentWriterId`, C.writerName as `commentWriterName`, C.contents as `commentContents`, C.created as `commentCreatred` FROM Posts AS P LEFT JOIN Comments AS C ON P.postId = C.commentId WHERE P.postId = ?',
                [id]);
        this.end();
        return (<RowDataPacket>rows)[0] as Post;
    }
    async put(title: string, writerId: string, writerName: string, contents: string) {
        const post = {
            title, writerId, writerName, contents
        };
        const insertId = await super._put(post);
        return insertId;
    }

    async update(id: number, contents: string) {
        const changedRows = await super._update({ key: 'postId', value: id }, { contents });
        return changedRows;
    }
    async delete(id: number) {
        const affectedRows = await super._delete({ key: 'postId', value: id });
        return affectedRows;
    }
}