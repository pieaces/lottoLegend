import factory, { supply } from "./dynamoDB/factory";
import { scanUsers } from "./dynamoDB/userInfo";
import updateNumbers from "./dynamoDB/updateNumbers";
import { getCurrentRound } from "./funtions";

exports.handler = async (event: any) => {
    console.log(event);
    
    const {statsDataObj, numberList} = await supply();
    const users = await scanUsers();

    const willWinNumberList:number[][] = [];
    willWinNumberList.push(...factory(statsDataObj, numberList));

    for(let i =0; i<users.length; i++){
        if(willWinNumberList.length < users[i].value){
            willWinNumberList.push(...factory(statsDataObj, numberList));
        }
        await updateNumbers(users[i].userName, getCurrentRound() + 1, willWinNumberList.splice(0, users[i].value));
    }
};