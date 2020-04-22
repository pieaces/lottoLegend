import Engine from "../Engine"

export default class Users extends Engine {
    private tableName:string = 'Users';
    constructor(){
        super();
    }
    async getNickNames() {
        const sql = `SELECT nickName FROM ${this.tableName}`;
        return await this.query(sql);
    }
    async delete(userName:string){
        const sql = `DELETE FROM ${this.tableName} WHERE userName=?`;
        await this.query(sql, [userName]);
    }
    async modifyNickName(userName:string, nickName:string){
        const sql = `UPDATE ${this.tableName} SET nickName=? WHERE userName=?`;
        await this.query(sql, [nickName, userName]);
    }
}