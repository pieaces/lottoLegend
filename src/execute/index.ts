import factory, { supply } from "../dynamoDB/factory";
import { getWeekNumbers } from "../dynamoDB/queryStats";
import { getUsersCount, scanUsers } from "../dynamoDB/userInfo";
import { putNumbers, getNumbersCount, deleteNumbers, scanNumbers } from "../dynamoDB/Numbers";
import updateNumbers, { SelectTool } from "../dynamoDB/updateNumbers";
import { getCurrentRound } from "../funtions";
import { putNumberMessage } from "../sns/publish";

export async function generateAndPutNumbers(per: number, repeat: number) {
    const start = new Date();
    const { statsDataObj, include } = await supply();
    //const exclude = await getWeekNumbers();
    //const numbers = { exclude, include: include.filter(item => !exclude.some(num => num === item)) };
    const numbers = { include };
    const usersCount = await getUsersCount();

    console.log('users: ', usersCount);
    const option = { per, repeat, numbers };
    const willWinNumberList: number[][] = [];
    willWinNumberList.push(...factory(statsDataObj, option));

    while (willWinNumberList.length < usersCount * 20) {
        willWinNumberList.push(...factory(statsDataObj, option));
    }
    const end1 = new Date();
    console.log('1: ', Number(end1) - Number(start));
    const size = willWinNumberList.length;
    console.log('size: ', size);

    for (let index = 0; index < size; index++) {
        await putNumbers(index, willWinNumberList[index]);
    }
    const end2 = new Date();
    console.log('2: ', Number(end2) - Number(start));
}

export async function deleteAllNumbers() {
    const start = new Date();
    const count = await getNumbersCount();
    console.log('count: ', count);
    for (let index = count - 1; index >= 0; index--) {
        await deleteNumbers(index);
    }
    const end = new Date();
    console.log('end: ', Number(end) - Number(start));
}
distribute();
export async function distribute() {
    const start = new Date();
    const { statsDataObj, include } = await supply();
    const numbers = { include };
    const option = { per: 3, repeat: 50, numbers };

    const today = new Date();
    today.setHours(today.getHours() + 9);

    const users = await scanUsers(today.getDay());
    const { numbersList, count } = await scanNumbers();

    const temp = factory(statsDataObj, option);
    let sum = 0;
    console.log('users: ', users.length);
    for (let index = 0; index < users.length; index++) {
        if(numbersList.length < users[index].value){
            numbersList.push(...factory(statsDataObj, option));
        }
        const willPutNumbers = numbersList.splice(0, users[index].value);

        for(let i = willPutNumbers.length-1; i>=0; i--){
            for(let j = i-1; j>=0; j--){
                if(sameNumberCouunt(willPutNumbers[i], willPutNumbers[j]) > 2){
                    if(temp.length === 0){
                        temp.push(...factory(statsDataObj, option));
                    }
                    willPutNumbers.splice(i, 1, temp.splice(0,1)[0]);
                    j=i;
                }
            }
        }
        await updateNumbers(users[index].userName, users[index].tool, getCurrentRound() + 1, willPutNumbers);
        if (users[index].tool === SelectTool.charge && users[index].phone && users[index].day === today.getDay()) {
            await putNumberMessage(users[index].userName, users[index].value, willPutNumbers, users[index].phone);
        }
        sum += users[index].value;
    }

    for (let index = count - 1; index >= count - sum; index--) {
        await deleteNumbers(index);
    }
    const end = new Date();
    console.log(`count: ${count}, sum: ${sum}`);
    console.log('end: ', Number(end) - Number(start));
}

function sameNumberCouunt(numbers1:number[], numbers2:number[]){
    let count = 0;
    numbers1.forEach(num =>{
        if(numbers2.some(item => item === num)) count++;
    });
    return count;
}