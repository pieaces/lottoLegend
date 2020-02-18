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
    if (resource === '/posts') {
        switch (method) {
            case 'GET':
                const posts = await db.scan();
                body = posts;
                break;
            case 'POST':
                const { title, writerId, writerName, contents } = event.body;
                const insertId = await db.post(title, writerId, writerName, contents);
                body = insertId;
                break;
            default:
                statusCode = 400;
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
    //if (event.queryStringParameters && event.queryStringParameters.name) name = event.queryStringParameters.name;