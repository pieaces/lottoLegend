import DB from "../Engine/Method"
import Comments, { Comment } from '../Comments/index'
import PostsContents from "../PostsContents";
import { updateRecommendUsers } from "../../dynamoDB/recommend";

interface Post {
    id: number;
    title: string;
    userName: string;
    contents: string;
    created: Date,
    hits: number;
    comment: Comment | null;
}
export default class Posts extends DB {
    comments: Comments = new Comments();
    postsContents: PostsContents = new PostsContents();
    constructor() {
        super();
        this.tableName = 'Posts';
    }
    async scan(category: string = "free", index: number = 1) {
        const MAX = 10;
        const sql = `SELECT id, title, Users.userName AS 'userName', Users.nickName AS 'nickName', Users.rank created, hits, recommendation FROM Posts INNER JOIN Users ON Posts.userName = Users.userName WHERE category = ? ORDER BY created DESC LIMIT ?, ?`;
        return await this.query(sql, [category, MAX*(index-1), MAX]);
    }
    async getCount(category: string): Promise<number> {
        const rows = await this.query(`SELECT COUNT(*) FROM ${this.tableName} WHERE category=?`, [category]);
        return rows[0]['COUNT(*)'];
    }
    async get(id: number) {
        const rows = await this.query(`SELECT category, title, Users.userName AS 'userName', Users.nickName AS 'nickName', created, hits, recommendation, text as 'contents' FROM ${this.tableName} INNER JOIN PostsContents ON ${this.tableName}.id = PostsContents.post INNER JOIN Users On ${this.tableName}.userName = Users.userName WHERE ${this.tableName}.id=?`, [id]);
        const post = rows[0];
        const comments = await this.comments.getByPost(id);
        if (comments) post.comments = comments;

        return post;
    }
    async getTitleContents(id: number) {
        const rows = await this.query(`SELECT title, text as 'contents' FROM ${this.tableName} INNER JOIN PostsContents ON ${this.tableName}.id = PostsContents.post WHERE ${this.tableName}.id=?`, [id]);
        const post = rows[0];

        return post;
    }
    async addHits(id: number): Promise<void> {
        await this.query(`UPDATE ${this.tableName} set hits = hits + 1 WHERE id=?`, [id]);
    }
    async getUserName(id: number): Promise<string> {
        const option: any = {
            projection: ['userName'],
            condition: { id }
        }
        let rows = await super._get(option);
        const post = rows[0];

        return post.userName;
    }
    async post(category: string, title: string, userName: string, contents: string) {
        const post = {
            category, title, userName
        };
        const insertId = await super._post(post);
        await this.postsContents.post(insertId, contents);
        return insertId;
    }

    async updateContents(id: number, title: string, contents: string) {
        await this._patch({ key: 'id', value: id }, { title })
        const changedRows = await this.postsContents.patch(id, contents);
        return changedRows;
    }
    async updateRecommends(id: number, userName:string) {
        let operand = 1;
        const response = await updateRecommendUsers(id, userName);
        if(response.error) operand = -1;
        const sql = `UPDATE ${this.tableName} SET recommendation = recommendation + ? WHERE num = ?`;
        return this.engine.promisePool.execute(sql, [operand, id]);
    }
    async delete(id: number) {
        const affectedRows = await super._delete({ key: 'id', value: id });
        return affectedRows;
    }
}