import DB from "../Engine"

export default class Users extends DB {
    private tableName:string = 'Users';
    constructor(){
        super();
    }
    async create(userName:string, nickName:string){
        const sql = `INSERT INTO ${this.tableName}(userName, nickName) VALUES(?, ?)`;
        await this.query(sql, [userName, nickName]);
    }
    async delete(userName:string){
        const sql = `DELETE FROM ${this.tableName} WHERE userName=?`;
        await this.query(sql, [userName]);
    }
    async getNickNames(){
        const sql = `SELECT nickName FROM ${this.tableName}`;
        return await this.query(sql);
    }
    async modifyNickName(userName:string, nickName:string){
        const sql = `UPDATE ${this.tableName} SET nickName=? WHERE userName=?`;
        await this.query(sql, [nickName, userName]);
    }
    async setRank(rank:number, userName:string){
        const sql = `UPDATE ${this.tableName} SET rank=? WHERE userName = ?`;
        await this.query(sql, [rank, userName]);
    }
}