import DB, { OrderOption } from "../Engine/Method"

export interface Comment{
    id:number;
    post:number;
    writerId:string;
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
        const option = {
            projection:['id', 'writerId', 'writerName', 'contents', 'created'],
            condition:{post},
            order:{created:OrderOption.ASC}
        };
        return await super._get(option);
    }
    async getWriterId(commentId:number): Promise<string>{
        const option = {
            projection:['writerId'],
            condition:{id:commentId},
        };
        const rows = await super._get(option);
        
        return rows[0].writerId;
    }
    async post(post:number, writerId: string, writerName: string, contents: string) {
        const comment = {
            post, writerId, writerName, contents
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