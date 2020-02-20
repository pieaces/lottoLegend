import DB, { OrderOption } from "../Engine/Method"
import {Comment} from '../Comments/index'
import PostsContents from "../PostsContents";

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
    postsContents:PostsContents = new PostsContents();
    constructor(){
        super();
        this.tableName = 'Posts';
    }
    async scan() {
        const option = {
            projection: ['id', 'title', 'writerId', 'writerName', 'created', 'hits'],
            order: {created: OrderOption.DESC},
            limit:10
        }
        return await super._get(option);
    }
    async get(id: number) {
        const option:any = {
            projection: ['id', 'title', 'writerId', 'writerName', 'created', 'hits'],
            condition: { id }
        }
        let rows = await super._get(option);
        const post = rows[0];
        rows = await this.postsContents.get(id);
        const contents = rows[0];
        post.contents = contents;

        return post;
    }
    async post(title: string, writerId: string, writerName: string, contents: string) {
        const post = {
            title, writerId, writerName
        };
        const insertId = await super._post(post);
        await this.postsContents.post(insertId, contents);
        return insertId;
    }

    async patch(id: number, contents: string) {
        const changedRows = await this.postsContents.patch(id, contents);
        return changedRows;
    }
    async delete(id: number) {
        const affectedRows = await super._delete({ key: 'id', value: id });
        return affectedRows;
    }
}