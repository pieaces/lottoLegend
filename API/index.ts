import Users from "./mariaDB/Users";
import deleteUser from "./dynamo/deleteUser";
import { Response } from "./Response";

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
        case '/accounts': {
            switch (method) {
                case 'DELETE': {
                    await deleteUser(currentId);
                    await userDB.delete(currentId);
                }
                    break;
                case 'PATCH': {
                    const { nickName } = JSON.parse(event.body);

                    const users = await userDB.getNickNames();
                    if (users.some(user => user.nickName === nickName)) {
                        body = new Response(true, "이미 존재하는 닉네임입니다");
                    } else {
                        await userDB.modifyNickName(currentId, nickName);
                        body = new Response(false);
                    }
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