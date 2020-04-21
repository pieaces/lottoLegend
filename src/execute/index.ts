import factory, { supply } from "../dynamoDB/factory";
import { getWeekNumbers } from "../dynamoDB/queryStats";
import { getUsersCount, scanUsers } from "../dynamoDB/userInfo";
import { putNumbers, getNumbersCount, deleteNumbers, scanNumbers } from "../dynamoDB/Numbers";
import updateNumbers from "../dynamoDB/updateNumbers";
import { getCurrentRound } from "../funtions";

export async function generateAndPutNumbers(per: number, repeat: number) {
    const start = new Date();
    const { statsDataObj, include } = await supply();
    //const exclude = await getWeekNumbers();
    //const numbers = { exclude, include: include.filter(item => !exclude.some(num => num === item)) };
    const numbers = { include };
    const usersCount = await getUsersCount();

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

export async function distribute() {
    const start = new Date();
    const { statsDataObj, include } = await supply();
    const numbers = { include };
    const option = { per: 5, repeat: 250, numbers };

    const today = new Date();
    today.setHours(today.getHours() + 9);

    const users = await scanUsers(today.getDay());
    const { numbersList, count } = await scanNumbers();

    let sum = 0;
    for (let i = 0; i < users.length; i++) {
        while (numbersList.length < users[i].value) {
            numbersList.push(...factory(statsDataObj, option));
        }
        await updateNumbers(users[i].userName, users[i].tool, getCurrentRound() + 1, numbersList.splice(0, users[i].value));
        sum += users[i].value;
    }
    for (let index = count - 1; index >= count - sum; index--) {
        await deleteNumbers(index);
    }
    const end = new Date();
    console.log(`count: ${count}, sum: ${sum}`);
    console.log('end: ', Number(end) - Number(start));
}