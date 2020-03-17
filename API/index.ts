import createUser from "./dynamo/createUser";
import Users from "./mariaDB/Users";

exports.handler = async (event: any, context: any) => {
    const nickName = event.request.userAttributes.nickname;
    const userName = event.userName;

    const userDB = new Users();
    const users = await userDB.getNickNames() as { nickName: string }[];
    if (users.some(user => user.nickName === nickName)) {
        context.fail("이미 존재하는 닉네임입니다.");
    }

    await createUser(userName);
    await userDB.create(userName, nickName);
    event.response.autoConfirmUser = true;
    context.succeed(event);
};