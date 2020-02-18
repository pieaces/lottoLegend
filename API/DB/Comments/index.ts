import DB from "../DB"
import { RowDataPacket } from "mysql2";

export interface Comment{
    commentId:number;
    postId:number;
    writerId:string;
    writerName:string;
    contents:string;
    created:Date;
}
export default class Comments extends DB {
    constructor(){
        super();
        this.tableName = 'Comments';
    }
    get<T>(id: number): never {
        throw new Error("Method not implemented.");
    }
    scan<T>(): never {
        throw new Error("Method not implemented.");
    }

    async put(postId:number, writerId: string, writerName: string, contents: string) {
        const post = {
            postId, writerId, writerName, contents
        };
        const insertId = await super._put(post);
        return insertId;
    }

    async update(id: number, contents: string) {
        const changedRows = await super._update({ key: 'commentId', value: id }, { contents });
        return changedRows;
    }
    async delete(id: number) {
        const affectedRows = await super._delete({ key: 'commentId', value: id });
        return affectedRows;
    }
}