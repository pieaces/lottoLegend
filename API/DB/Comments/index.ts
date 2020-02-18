import DB from ".."

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
    get<T>(id: number): never {
        throw new Error("Method not implemented.");
    }
    scan<T>(): never {
        throw new Error("Method not implemented.");
    }

    async put(post:number, writerId: string, writerName: string, contents: string) {
        const comment = {
            post, writerId, writerName, contents
        };
        const insertId = await super._put(comment);
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