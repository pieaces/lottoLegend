import factory, { supply } from "../dynamoDB/factory";
import { getWeekNumbers } from "../dynamoDB/queryStats";
import { getUsersCount } from "../dynamoDB/userInfo";
import { putNumbers, scanNumbersCount, deleteNumbers } from "../dynamoDB/Numbers";

export async function generateAndPutNumbers(per: number, repeat: number) {
    const start = new Date();
    const { statsDataObj, include } = await supply();
    const exclude = await getWeekNumbers();
    const numbers = { exclude, include: include.filter(item => !exclude.some(num => num === item)) };
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
    console.log(size);
    for (let index = 1; index <= size; index++) {
        await putNumbers(index, willWinNumberList[index]);
    }
    const end2 = new Date();
    console.log('2: ', Number(end2) - Number(start));
}

export async function deleteAllNumbers() {
    const start = new Date();
    const count = await scanNumbersCount();
    for (let index = count; index >= 1; index--) {
        await deleteNumbers(index);
    }
    const end = new Date();
    console.log('end: ', Number(end) - Number(start));
}