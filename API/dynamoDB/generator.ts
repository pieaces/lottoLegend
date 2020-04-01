import Calculate from "../Lotto/class/Calculate";
import { getCurrentRound, scanLotto } from "../funtions";
import { getIncOrExcNumbers } from "./Numbers";

function makeChoice(exclude: number[]) {
    const choice: number[] = [];
    if (exclude.length > 0) {
        exclude.forEach((num, index) => {
            for (let i = exclude[index - 1] + 1 || 1; i < num; i++) choice.push(i);
        });
        for (let i = exclude[exclude.length - 1] + 1; i <= 45; i++) choice.push(i);
    } else for (let i = 1; i <= 45; i++) choice.push(i);

    return choice;
}
function doesExist(one: number[], other: number[]) {
    let flag = false;
    for (let i = 0; i < one.length; i++) {
        for (let j = 0; j < other.length; j++) {
            if (one[i] === other[j]) {
                flag = true;
                break;
            }
        }
    }
    return flag;
}
async function generateNumberA(userName: string, include:number[]) {
    const currentRound = getCurrentRound() + 1;
    const exclude = await getIncOrExcNumbers(userName, currentRound, 'exclude');
    const choice: number[] = makeChoice(exclude);

    const numsArr: number[][] = [];
    const SIZE = choice.length;
    while (numsArr.length < 5) {
        const numberSet: Set<number> = new Set();

        include && include.forEach(num => numberSet.add(num));
        while (numberSet.size < 6) numberSet.add(choice[Math.floor(Math.random() * SIZE)]);
        const numbers = [...numberSet].sort((a, b) => a - b).slice(0,6);

        numsArr.push(numbers);
    }

    return numsArr;
}

function compartByLine(numbers: number[]) {
    const result = new Array<number[]>(5);
    numbers.forEach(num => {
        const index = Math.floor((num - 1) / 10);
        if (result[index]) result[index].push(num);
        else result[index] = [num];
    });

    return result;
}
async function generateNumberB(userName: string, lineCount?: number[], include?:number[]) {
    const currentRound = getCurrentRound() + 1;
    const exclude = await getIncOrExcNumbers(userName, currentRound, 'exclude');
    const choice: number[][] = compartByLine(makeChoice(exclude));

    const includeCompart = include && compartByLine(include);
    const numsArr: number[][] = [];
    while (numsArr.length < 5) {
        const numbers: number[] = [];
        for (let i = 0; i < 5; i++) {
            const set = new Set<number>();
            includeCompart && includeCompart[i] && includeCompart[i].forEach(num => set.add(num));
            while (set.size < lineCount[i]) {
                set.add(choice[i][Math.floor(Math.random() * choice[i].length)]);
            }
            numbers.push(...[...set]);

        }
        numsArr.push(numbers.sort((a, b) => a - b));
    }

    return numsArr;
}

export function numbersToData(numbers:number[], lottoData:{BonusNum:{N:string}, Numbers:{NS:string[]}}[]): {
    numbers:number[], winner:number[],
    lowCount:number, sum:number, oddCount:number, primeCount:number, $3Count:number, sum$10:number, diffMaxMin:number, AC:number}
    {
    const winner = new Array<number>(5).fill(0);
    lottoData.forEach(lotto => {
        let count = 0;
        numbers.forEach(num => {
            if (lotto.Numbers && lotto.Numbers.NS.some(item => Number(item) === num)) count++;
        });
        switch (count) {
            case 3:
                winner[4]++;
                break;
            case 4:
                winner[3]++;
                break;
            case 5:
                if (numbers.some(item => Number(lotto.BonusNum.N) === item)) winner[1]++;
                else winner[2]++;
                break;
            case 6:
                winner[0]++;
        }
    });
    return {
        numbers,
        winner,
        lowCount: Calculate.lowCount(numbers),
        sum: Calculate.sum(numbers),
        oddCount: Calculate.oddCount(numbers),
        primeCount: Calculate.primeCount(numbers),
        $3Count: Calculate.$3Count(numbers),
        sum$10: Calculate.sum$10(numbers),
        diffMaxMin: Calculate.diffMaxMin(numbers),
        AC: Calculate.AC(numbers)
    }
}

export async function freeGenerator(userName: string, param?:{lineCount?: number[], include?:number[]}) {
    let numsArr: number[][];
    const {lineCount, include} = param;
    if (!lineCount) numsArr = await generateNumberA(userName, include);
    else numsArr = await generateNumberB(userName, lineCount, include);
    const lottoData = await scanLotto();

    return numsArr.map((numbers) => {
        return numbersToData(numbers, lottoData);
    });
}