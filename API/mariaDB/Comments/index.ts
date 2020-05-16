import Engine from "../Engine"

export default class Comments extends Engine {
    private tableName:string = 'Comments';
    constructor(){
        super();
    }
    async getPostsByUserName(userName:string) {
        const sql = `SELECT post FROM ${this.tableName} WHERE userName=?`;
        return await this.query(sql, [userName]);
    }
}