import Engine from "../Engine"

export default class Users extends Engine {
    private tableName:string = 'Users';
    constructor(){
        super();
    }
    async getNickName(userName:string) {
        const sql = `SELECT nickName FROM ${this.tableName} where userName=?`;
        return (await this.query(sql, [userName]))[0].nickName;
    }
}