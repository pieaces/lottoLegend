import DB from "../Engine/Method"
import Comments, { Comment } from '../Comments/index'
import PostsContents from "../PostsContents";
import { updateRecommendUsers } from "../../dynamoDB/recommend";

type category = "incl" | "excl" | "qna";
interface Post {
    id: number;
    category: category;
    title: string;
    userName: string;
    contents: string;
    created: string,
    hits: number;
    comments: Comment[] | null;
    incl?: number[];
    excl?: number[];
}
export default class Posts extends DB {
    static readonly SCAN_MAX = 15;
    comments: Comments = new Comments();
    postsContents: PostsContents = new PostsContents();
    constructor() {
        super();
        this.tableName = 'Posts';
    }
    async scan(category: string = "free", index: number = 1) {
        const sql = `SELECT id, title, Users.nickName AS 'nickName', Users.rank AS 'rank', created, hits, recommendation FROM Posts INNER JOIN Users ON Posts.userName = Users.userName WHERE category = ? ORDER BY created DESC LIMIT ?, ?`;
        return await this.query(sql, [category, Posts.SCAN_MAX * (index - 1), Posts.SCAN_MAX]);
    }
    async getCount(category: string): Promise<number> {
        const rows = await this.query(`SELECT COUNT(*) FROM ${this.tableName} WHERE category=?`, [category]);
        return rows[0]['COUNT(*)'];
    }
    async get(id: number) {
        const rows = await this.query(`SELECT category, title, Users.userName AS 'userName', Users.nickName AS 'nickName', Users.rank AS 'rank', created, hits, recommendation, text as 'contents' FROM ${this.tableName} INNER JOIN PostsContents ON ${this.tableName}.id = PostsContents.post INNER JOIN Users On ${this.tableName}.userName = Users.userName WHERE ${this.tableName}.id=?`, [id]);
        const post = rows[0] as Post;
        const comments = (await this.comments.getByPost(id)) as Comment[];
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
        if (!title || title === "") throw new Error('Not Empty Title!');

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
    async updateRecommends(id: number, userName: string) {
        let operand = 1;
        const response = await updateRecommendUsers(id, userName);
        if (response.error) operand = -1;
        const sql = `UPDATE ${this.tableName} SET recommendation = recommendation + ? WHERE id = ?`;
        return this.engine.promisePool.execute(sql, [operand, id]);
    }
    async delete(id: number) {
        const affectedRows = await super._delete({ key: 'id', value: id });
        return affectedRows;
    }

    async search(param:{category: string, index: number, title?: string, text?: string, writer?:string}) {
        const values: (string | number)[] = [param.category];
        let match = "";
        if (param.writer) {
            match = "userName=?"
            values.push(param.writer);
        } else {
            match = `MATCH(title) AGAINST('?' IN BOOLEAN MODE)`;//against('+사진*+테스트*' in boolean mode)
            values.push(param.title);
            if (param.text) {
                match += ` + MATCH(text) AGAINST('?' IN BOOLEAN MODE)`;
                values.push(param.text);
            }
        }
        values.push(Posts.SCAN_MAX * (param.index - 1), Posts.SCAN_MAX);
        const sql = `SELECT id, title, Users.nickName AS 'nickName', Users.rank AS 'rank', created, hits, recommendation FROM ${this.tableName} INNER JOIN PostsContents ON ${this.tableName}.id=PostsContents.post INNER JOIN Users ON ${this.tableName}.userName=Users.userName WHERE category=? AND ${match} ORDER BY created DESC LIMIT ?, ?`

        return await this.query(sql, values);
    }
    async getCountBySearch(category: string = "free", title: string, text?: string): Promise<number> {
        let match = `MATCH(title) AGAINST('?' IN BOOLEAN MODE)`;//against('+사진*+테스트*' in boolean mode)
        const values = [category, title];
        if (text) {
            match += ` + MATCH(text) AGAINST('?' IN BOOLEAN MODE)`;
            values.push(text);
        }
        const sql = `SELECT COUNT(*) FROM ${this.tableName} INNER JOIN PostsContents ON ${this.tableName}.id=PostsContents.post WHERE category=? AND ${match}`
        const rows = await this.query(sql, values);
        return rows[0]['COUNT(*)'];
    }
}