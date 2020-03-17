import createUser from "./dynamo/createUser";
import Users from "./mariaDB/Users";

exports.handler = async (event: any, context: any) => {
    const nickName = event.request.userAttributes.nickname.trim();
    const userName = event.userName.trim();

    const userDB = new Users();
    const users = await userDB.getNickNames() as { nickName: string }[];
    if (users.some(user => user.nickName === nickName)) {
        return context.fail("이미 존재하는 닉네임입니다");
    }

    try {
        await createUser(userName);
        await userDB.create(userName, nickName);
        event.response.autoConfirmUser = true;
        return context.succeed(event);
    } catch (err) {
        if (err.code === "ConditionalCheckFailedException") {
            return context.fail('이미 존재하는 아이디입니다');
        }
    }
};