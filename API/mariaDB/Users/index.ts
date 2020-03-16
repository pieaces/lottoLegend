import DB from "../Engine"

export default class Users extends DB {
    private tableName:string = 'Users';
    constructor(){
        super();
    }
    async setRank(rank:number, userName:string){
        const sql = `UPDATE ${this.tableName} SET rank=? WHERE userName = ?`;
        await this.query(sql, [rank, userName]);
    }
}