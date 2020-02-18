import DB, { OrderOption } from ".."

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
        super._get(option);
    }
    async post(post:number, writerId: string, writerName: string, contents: string) {
        const comment = {
            post, writerId, writerName, contents
        };
        const insertId = await super._post(comment);
        return insertId;
    }

    async update(id: number, contents: string) {
        const changedRows = await super._update({ key: 'id', value: id }, { contents });
        return changedRows;
    }
    async delete(id: number) {
        const affectedRows = await super._delete({ key: 'id', value: id });
        return affectedRows;
    }
}