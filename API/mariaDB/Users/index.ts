import DB from "../Engine/Method"

export default class Users extends DB {
    constructor(){
        super();
        this.tableName = 'Users';
    }
    async setRank(rank:number, userName:string){
        const sql = `UPDATE ${this.tableName} SET rank=? WHERE userName = ?`;
        await this.query(sql, [rank, userName]);
    }
}