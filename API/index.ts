import createUser from "./dynamo/createUser";
import Users from "./mariaDB/Users";
import { Response } from "./Response";
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
        case '/accounts':
        case '/accounts/{userName}': {
            switch (method) {
                case 'GET': {
                    const nickName = event.queryStringParameters.nickName;
                    const users = await userDB.getNickNames() as { nickName: string }[];
                    if (users.some(user => user.nickName === nickName)) {
                        body = new Response(true, "이미 존재하는 닉네임입니다.");
                    } else {
                        body = new Response(false, "이미 존재하는 닉네임입니다.");
                    }
                }
                case 'POST': {
                    const userName = event.pathParameters.userName;
                    const { nickName } = JSON.parse(event.body);
                    await createUser(userName);
                    await userDB.create(userName, nickName);
                }
                case 'DELETE': {
                    const userName = event.pathParameters.userName;
                    await deleteUser(userName);
                    await userDB.delete(userName);
                }
                case 'PATCH': {
                    const userName = event.pathParameters.userName;
                    const { nickName } = JSON.parse(event.body);
                    await userDB.modifyNickName(userName, nickName);
                }
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