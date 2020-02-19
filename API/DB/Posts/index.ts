import DB, { OrderOption } from "../Engine/Method"
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
    async scan() {
        const option = {
            projection: ['id', 'title', 'writerId', 'writerName', 'created', 'hits'],
            order: {created: OrderOption.DESC},
            limit:10
        }
        return await super._get(option);
    }
    async get(id: number) {
        const option = {
            projection: ['id', 'title', 'writerId', 'writerName', 'contents', 'created', 'hits'],
            condition: { id }
        }
        return await super._get(option);
    }
    async post(title: string, writerId: string, writerName: string, contents: string) {
        const post = {
            title, writerId, writerName, contents
        };
        const insertId = await super._post(post);
        return insertId;
    }

    async patch(id: number, contents: string) {
        const changedRows = await super._patch({ key: 'id', value: id }, { contents });
        return changedRows;
    }
    async delete(id: number) {
        const affectedRows = await super._delete({ key: 'id', value: id });
        return affectedRows;
    }
}