import { scanUsers } from "./dynamodb/functions";
import { getCurrentRound, numsArrToString } from "./functions";
import publish from "./sns/publish";

exports.handler = async (event: any, context: any, callback: any) => {
    const round = getCurrentRound()+1;
    const users = await scanUsers(round);
    for(let i =0; i<users.length; i++){
        await publish(`[로또끝] ${round}회 프리미엄조합\n`+numsArrToString(users[i].numbers), users[i].phone);
    }
};