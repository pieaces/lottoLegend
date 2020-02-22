import Posts from "./mariaDB/Posts";
import Comments from "./mariaDB/Comments";

exports.handler = async (event: any, context: any, callback: any) => {
    console.log(event);
    const method: string = event.httpMethod;
    const resource: string = event.resource;
    let statusCode = 200;
    const headers = {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    }

    let body: any;
    //const exp_posts$comments = /^\/posts\/{postId}\/comments/
    switch (resource) {
        case '/posts': {
            const db = new Posts();
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
        }
        case '/posts/{postId}': {
            const db = new Posts();
            const postId = event.pathParameters.postId;
            switch (method) {
                case 'GET':
                    const post = await db.get(postId);
                    body = post;
                    break;
                case 'PATCH':
                    const { contents } = JSON.parse(event.body)
                    const changedRows = await db.patch(postId, contents)
                    body = changedRows;
                    break;
                case 'DELETE':
                    const affectedRows = await db.delete(postId);
                    body = affectedRows;
                    break;
            }
        }
        case '/posts/{postId}/comments': {
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
        case '/posts/{postId}/comments': {
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
        case '/posts/{postId}/comments/{commentId}': {
            const db = new Comments();
            const commentId = event.pathParameters.commentId;
            switch (method) {
                case 'PATCH':
                    const { contents } = JSON.parse(event.body)
                    const changedRows = await db.patch(commentId, contents)
                    body = changedRows;
                    break;
                case 'DELETE':
                    const affectedRows = await db.delete(commentId);
                    body = affectedRows;
                    break;
            }
        }
        case '/users/numbers/{round}': {
        }
    }

    const response = {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
    return response;
};