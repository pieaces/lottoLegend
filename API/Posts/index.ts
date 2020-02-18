import DB from "../DB"

export default class Posts extends DB {
    async scan() {
        const [rows] =
            await this.promisePool.execute(
                'SELECT P.postId, P.title, P.writerId, P.writerName, P.created, P.hits FROM Posts AS P ORDER BY created DESC LIMIT 10');
        this.end();
        return rows;
    }
    async get(id: number) {
        const [rows] =
            await this.promisePool.execute(
                'SELECT P.postId, P.title, P.writerId, P.writerName, P.contents, P.created, P.hits, C.commentId, C.writerId as `commentWriterId`, C.writerName as `commentWriterName`, C.contents as `commentContents`, C.created as `commentCreatred` FROM Posts AS P LEFT JOIN Comments AS C ON P.postId = C.commentId WHERE P.postId = ?',
                [id]);
        this.end();
        return rows;
    }
    async put(post:{title:string, writerId:string, writerName:string, contents:string}) {
        await super.put(post);
    }
}
