import factory from "./dynamoDB/factory";
import { scanUsers } from "./dynamoDB/userInfo";

exports.handler = async (event: any) => {
    console.log(event);
    
    const willWinNumberList:number[][] = [];
    willWinNumberList.push(...await factory());

    const users = await scanUsers();

    for(let i =0; i<users.length; i++){
        users[i]
    }
};

const start = new Date();
factory()
.then(data => {
    const end = new Date();
    console.log(data.length);
    console.log(Number(end) - Number(start));
})