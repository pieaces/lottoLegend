import DB from "../Engine/Method"

export default class PostsContents extends DB {
    constructor() {
        super();
        this.tableName = 'PostsContents';
    }

    async get(id: number) {
        const option = {
            projection: ['contents'],
            condition: { id }
        }
        return await super._get(option);
    }
    async post(contents: string): Promise<void> {
        const post = {
            contents
        };
        await super._post(post);
    }
    async patch(id: number, contents: string) {
        const changedRows = await super._patch({ key: 'post', value: id }, { contents });
        return changedRows;
    }
}