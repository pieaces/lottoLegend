import DB from "../DB"

export default class Comments extends DB {
    async post(comment:{post: number, writerId: string, writerName: string, contents: string}) {
        super.put(comment);
    }
}