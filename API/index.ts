import { scanUsers } from "./dynamodb/functions";
import { getCurrentRound, numsArrToString } from "./functions";
import publish from "./sns/publish";

exports.handler = async (event: any) => {
    console.log(event);
    const round = getCurrentRound()+1;
    const users = await scanUsers(round);
    console.log(`${dayToString(new Date().getDay())}요일, ${users.length}명 조합전송`);
    console.log(users.map(user => user.phone).join('\n'));
    for(let i =0; i<users.length; i++){
        await publish(`[로또끝] ${round}회 프리미엄조합\n`+numsArrToString(users[i].numbers), users[i].phone);
    }
    console.log('정상종료');
};

function dayToString(day:number){
    switch(day){
        case 0: return '일';
        case 1: return '월';
        case 2: return '화';
        case 3: return '수';
        case 4: return '목';
        case 5: return '금';
        case 6: return '토';
    }
}