import { scanUsers } from "./dynamodb/functions";
import { getCurrentRound } from "./functions";
import publish from "./sns/publish";

exports.handler = async (event: any, context: any, callback: any) => {
    const round = getCurrentRound();
    const users = await scanUsers(round);
    for(let i =0; i<users.length; i++){
        await publish(JSON.stringify(users[i].numbers), users[i].phone);
    }
};
