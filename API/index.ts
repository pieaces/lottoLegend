import Users from "./mariaDB/Users";
import deleteUser from "./dynamo/deleteUser";

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
exports.handler = async (event: any) => {
    console.log(event);

    const resource: string = event.resource;
    const method: string = event.httpMethod;
    let statusCode: number = 200;
    let body: any;

    const userDB = new Users();
    switch (resource) {
        case '/accounts/{userName}': {
            switch (method) {
                case 'DELETE': {
                    const userName = event.pathParameters.userName;
                    await deleteUser(userName);
                    await userDB.delete(userName);
                }
                    break;
                case 'PATCH': {
                    const userName = event.pathParameters.userName;
                    const { nickName } = JSON.parse(event.body);
                    await userDB.modifyNickName(userName, nickName);
                }
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