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
    async scan(category:string = "free") {
        const option = {
            projection: ['id', 'title', 'writerName', 'created', 'hits'],
            condition: { category },
            order: {created: OrderOption.DESC},
            limit:10
        }
        return await super._get(option);
    }
    async get(id: number) {
        const rows = await this.query(`SELECT title, writerId, writerName, created, hits, text FROM Posts INNER JOIN PostsContents ON Posts.id = PostsContents.post WHERE Posts.id=?`, [id]);
        const post = rows[0];
        const comments = await this.comments.getByPost(id);
        if(comments) post.comments = comments;

        return post;
    }
    async addHits(id:number): Promise<void>{
        await this.query(`UPDATE Posts set hits = hits + 1 WHERE id=1`, []);
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