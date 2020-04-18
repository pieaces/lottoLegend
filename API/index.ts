import factory, { supply } from "./dynamoDB/factory";
import { scanUsers } from "./dynamoDB/userInfo";
import updateNumbers from "./dynamoDB/updateNumbers";
import { getCurrentRound } from "./funtions";
import { getWeekNumbers } from "./dynamoDB/queryStats";

exports.handler = async (event: any) => {
    console.log(event);
    
    const {statsDataObj,include} = await supply();
    const exclude = await getWeekNumbers();
    //const numbers = {exclude, include:include.filter(item => !exclude.some(num => num === item))};
    const numbers = {include};
    const users = await scanUsers();

    const willWinNumberList:number[][] = [];
    willWinNumberList.push(...factory(statsDataObj, numbers));

    for(let i =0; i<users.length; i++){
        while(willWinNumberList.length < users[i].value){
            willWinNumberList.push(...factory(statsDataObj, numbers));
        }
        await updateNumbers(users[i].userName, users[i].tool, getCurrentRound() + 1, willWinNumberList.splice(0, users[i].value));
    }
};

/*async function a(){
    const {statsDataObj,include} = await supply();
    const numbers = {include};
    const willWinNumberList:number[][] = [];
    willWinNumberList.push(...factory(statsDataObj, numbers));
    console.log(willWinNumberList);
}a();*/