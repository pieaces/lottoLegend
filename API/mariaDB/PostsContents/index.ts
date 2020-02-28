import DB from "../Engine/Method"

export default class PostsContents extends DB {
    constructor() {
        super();
        this.tableName = 'PostsContents';
    }

    async get(id: number) {
        const option = {
            projection: ['text'],
            condition: { post: id }
        }
        return await super._get(option);
    }
    async post(postId:number, text: string): Promise<void> {
        const post = {
            post:postId, text
        };
        await super._post(post);
    }
    async patch(id: number, text: string) {
        const changedRows = await super._patch({ key: 'post', value: id }, { text });
        return changedRows;
    }
}