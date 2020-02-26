import DB, { OrderOption } from "../Engine/Method"
import Comments, {Comment} from '../Comments/index'
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
    comments:Comments = new Comments();
    postsContents:PostsContents = new PostsContents();
    constructor(){
        super();
        this.tableName = 'Posts';
    }
    async scan(category:string = "free", index:number=1) {
        const MAX = 10;
        const option = {
            projection: ['id', 'title', 'writerName', 'created', 'hits'],
            condition: { category },
            order: {created: OrderOption.DESC},
            limit:[MAX*(index-1), MAX*index] as [number, number]
        }
        return await super._get(option);
    }
    async getCount(): Promise<number>{
        const rows = await this.query(`SELECT COUNT(*) FROM ${this.tableName}`);
        return rows[0]['COUNT(*)'];
    }
    async get(id: number) {
        const rows = await this.query(`SELECT title, writerId, writerName, created, hits, text FROM ${this.tableName} INNER JOIN PostsContents ON ${this.tableName}.id = PostsContents.post WHERE ${this.tableName}.id=?`, [id]);
        const post = rows[0];
        const comments = await this.comments.getByPost(id);
        if(comments) post.comments = comments;

        return post;
    }
    async addHits(id:number): Promise<void>{
        await this.query(`UPDATE ${this.tableName} set hits = hits + 1 WHERE id=1`, []);
    }
    async getWriterId(id: number): Promise<string>{
        const option:any = {
            projection: ['writerId'],
            condition: { id }
        }
        let rows = await super._get(option);
        const post = rows[0];

        return post.writerId;
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