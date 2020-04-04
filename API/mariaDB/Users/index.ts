import DB from "../Engine/Method"

export default class Users extends DB {
    constructor(){
        super();
        this.tableName = 'Users';
    }
    async getRank(userName:string): Promise<number>{
        const sql = `SELECT rank FROM ${this.tableName} WHERE userName = ?`;
        return ((await this.query(sql, [userName]))[0]).rank;
    }
}