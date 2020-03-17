import Engine from "../Engine"

export default class Users extends Engine {
    private tableName:string = 'Users';
    constructor(){
        super();
    }
    async create(userName:string, nickName:string){
        const sql = `INSERT INTO ${this.tableName}(userName, nickName) VALUES(?, ?)`;
        await this.query(sql, [userName, nickName]);
    }
    async getNickNames(){
        const sql = `SELECT nickName FROM ${this.tableName}`;
        return await this.query(sql);
    }

}