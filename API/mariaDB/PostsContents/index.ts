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
    async post(postId:number, contents: string): Promise<void> {
        const post = {
            post:postId, contents
        };
        await super._post(post);
    }
    async patch(id: number, contents: string) {
        const changedRows = await super._patch({ key: 'post', value: id }, { contents });
        return changedRows;
    }
}