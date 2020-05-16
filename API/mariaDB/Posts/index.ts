import Engine from "../Engine"

export default class Posts extends Engine {
    private tableName:string = 'Posts';
    constructor(){
        super();
    }
    async modifyComments(id:number, count:number){
        const sql = `UPDATE ${this.tableName} SET comments=comments-? WHERE id=?`;
        await this.query(sql, [count, id]);
    }
}