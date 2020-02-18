import Posts from "./DB/Posts";

exports.handler = async (event: any, context: any, callback: any) => {
    const method = event.httpMethod;
    const resource = event.resource;

    let statusCode = 200;
    const headers = {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    }
    let body: any;

    const db = new Posts();

    const exp_posts = /^\/posts$/;
    const exp_posts$id = /^\/posts\/[\d]+$/;
    if (exp_posts.test(resource)) {
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
            default:
                statusCode = 400;
        }
    } else if (exp_posts$id.test(resource)) {
        switch (method) {
            case 'GET':
                const id = event.queryStringParameters && event.queryStringParameters.name;
                if (id) {
                    const post = await db.get(id);
                    body = post;
                }
            break;
        }
    } else {
        statusCode = 400;
    }
    const response = {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
    return response;
};