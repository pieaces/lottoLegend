import factory, { supply } from "./dynamoDB/factory";
import { scanUsers } from "./dynamoDB/userInfo";
import updateNumbers from "./dynamoDB/updateNumbers";
import { getCurrentRound } from "./funtions";

exports.handler = async (event: any) => {
    console.log(event);
    
    const {statsDataObj} = await supply();
    const users = await scanUsers();

    const willWinNumberList:number[][] = [];
    willWinNumberList.push(...factory(statsDataObj));

    for(let i =0; i<users.length; i++){
        while(willWinNumberList.length < users[i].value){
            willWinNumberList.push(...factory(statsDataObj));
        }
        await updateNumbers(users[i].userName, getCurrentRound() + 1, willWinNumberList.splice(0, users[i].value));
    }
};