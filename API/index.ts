import Posts from "./DB/Posts";
import Comments from "./DB/Comments";

exports.handler = async (event: any, context: any, callback: any) => {
    const method: string = event.httpMethod;
    const resource: string = event.resource;

    let statusCode = 200;
    const headers = {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    }
    let body: any;

    const exp_posts = /^\/posts/; //^:시작, \/:/를 표현, $끝, /:시작과 끝을 명시
    //const exp_posts$id = /^\/posts\/[\d]+$/; //[\d]:숫자, +:1회이상의 
    if (exp_posts.test(resource)) {
        const db = new Posts();
        if (resource === '/posts') {
            switch (method) {
                case 'GET':
                    const posts = await db.scan();
                    body = posts;
                    break;
                case 'POST':
                    const { title, writerId, writerName, contents } = JSON.parse(event.body);
                    const insertId = await db.post(title, writerId, writerName, contents);
                    body = insertId;
                    break;
            }
        } else if (resource === '/posts/{postId}') {
            switch (method) {
                case 'GET':
                    const postId = event.pathParameters.postId;
                    const post = await db.get(postId);
                    body = post;
                    break;
            }
        } else if (resource === '/posts/{postId}/comments') {
            const db = new Comments();
            const postId = event.pathParameters.postId;
            switch (method) {
                case 'GET':
                    const comments = await db.getByPost(postId);
                    body = comments;
                    break;
                case 'POST':
                    const { writerId, writerName, contents } = JSON.parse(event.body);
                    const insertId = await db.post(postId, writerId, writerName, contents);
                    body = insertId;
                    break;
            }
        }
    }
    const response = {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
    return response;
};