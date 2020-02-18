import DB from ".."
import { RowDataPacket } from "mysql2";
import {Comment} from '../Comments/index'

interface Post{
    id:number;
    title:string;
    writerId:string;
    writerName:string;
    contents:string;
    created:Date,
    hits:number;
    comment:Comment | null;
}
export default class Posts extends DB {
    constructor(){
        super();
        this.tableName = 'Posts';
    }
    async scan<Post>():Promise<Post[]> {
        const LIMIT = 10;
        const [rows] =
            await this.promisePool.execute(
                `SELECT P.id, P.title, P.writerId, P.writerName, P.created, P.hits FROM Posts AS P ORDER BY created DESC LIMIT ${LIMIT}`);
        this.end();
        return rows as Post[];
    }
    async get<Post>(id: number) {
        const [rows] =
            await this.promisePool.execute(
                'SELECT P.id, P.title, P.writerId, P.writerName, P.contents, P.created, P.hits, C.id AS `commentId`, C.writerId as `commentWriterId`, C.writerName as `commentWriterName`, C.contents as `commentContents`, C.created as `commentCreatred` FROM Posts AS P LEFT JOIN Comments AS C ON P.id = C.id WHERE P.id = ?',
                [id]);
        this.end();
        return (<RowDataPacket>rows)[0] as Post;
    }
    async post(title: string, writerId: string, writerName: string, contents: string) {
        const post = {
            title, writerId, writerName, contents
        };
        const insertId = await super._post(post);
        return insertId;
    }

    async update(id: number, contents: string) {
        const changedRows = await super._update({ key: 'id', value: id }, { contents });
        return changedRows;
    }
    async delete(id: number) {
        const affectedRows = await super._delete({ key: 'id', value: id });
        return affectedRows;
    }
}