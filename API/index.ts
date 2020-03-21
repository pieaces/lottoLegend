import factory, { supply } from "./dynamoDB/factory";
import { scanUsers } from "./dynamoDB/userInfo";
import updateNumbers from "./dynamoDB/updateNumbers";
import { getCurrentRound } from "./funtions";
import { getWeekNumbers } from "./dynamoDB/queryStats";

exports.handler = async (event: any) => {
    console.log(event);
    
    const {statsDataObj,include} = await supply();
    const exclude = await getWeekNumbers();
    const numbers = {exclude, include:include.filter(item => !exclude.some(num => num === item))};
    console.log(numbers);
    const users = await scanUsers();

    const willWinNumberList:number[][] = [];
    willWinNumberList.push(...factory(statsDataObj, numbers));

    for(let i =0; i<users.length; i++){
        while(willWinNumberList.length < users[i].value){
            willWinNumberList.push(...factory(statsDataObj, numbers));
        }
        await updateNumbers(users[i].userName, getCurrentRound() + 1, willWinNumberList.splice(0, users[i].value));
    }
};

a();
async function a(){
    const start = new Date();
    const {statsDataObj} = await supply();
    const exclude = await getWeekNumbers();
    const numbers = {exclude};
    const users = await scanUsers();

    const willWinNumberList:number[][] = [];
    willWinNumberList.push(...factory(statsDataObj, numbers));

    for(let i =0; i<users.length; i++){
        while(willWinNumberList.length < users[i].value){
            willWinNumberList.push(...factory(statsDataObj, numbers));
        }
        await updateNumbers(users[i].userName, getCurrentRound() + 1, willWinNumberList.splice(0, users[i].value));
    }
    const end = new Date();
    console.log(Number(end) - Number(start));
}