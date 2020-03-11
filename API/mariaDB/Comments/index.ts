import DB from "../Engine/Method"

export interface Comment{
    id:number;
    post:number;
    userName:string;
    writerName:string;
    contents:string;
    created:Date;
}
export default class Comments extends DB {
    constructor(){
        super();
        this.tableName = 'Comments';
    }
    async getByPost(post:number){
        const sql = `SELECT id, Users.userName AS 'userName', Users.nickName AS 'nickName', contents, created FROM Comments INNER JOIN Users ON Comments.userName = Users.userName WHERE post=? ORDER BY created ASC`;
        return await this.query(sql, [post]);
    }
    async getUserName(commentId:number): Promise<string>{
        const option = {
            projection:['userName'],
            condition:{id:commentId},
        };
        const rows = await super._get(option);
        
        return rows[0].userName;
    }
    async post(post:number, userName: string, contents: string) {
        const comment = {
            post, userName, contents
        };
        const insertId = await super._post(comment);
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