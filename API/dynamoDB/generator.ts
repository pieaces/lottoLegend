import Calculate from "../Lotto/class/Calculate";
import { dynamoDB } from ".";
import { getCurrentRound } from "../funtions";
import { getIncOrExcNumbers, IncOrExc } from "./Numbers";

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
async function generateNumberA(userName: string) {
    const currentRound = getCurrentRound();
    const include = await getIncOrExcNumbers(userName, currentRound, IncOrExc.include);
    const exclude = await getIncOrExcNumbers(userName, currentRound, IncOrExc.exclude);
    const choice: number[] = makeChoice(exclude);

    const numsArr: number[][] = [];
    const SIZE = choice.length;
    while (numsArr.length < 5) {
        const numberSet: Set<number> = new Set();

        if (include.length === 1) numberSet.add(include[0]);
        while (numberSet.size < 6) numberSet.add(choice[Math.floor(Math.random() * SIZE)]);
        const numbers = [...numberSet].sort((a, b) => a - b);

        if (include.length > 1) {
            if (doesExist(numbers, include)) numsArr.push(numbers);
        } else if (include.length === 0) numsArr.push(numbers);
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
async function generateNumberB(userName: string, lineCount?: number[]) {
    const currentRound = getCurrentRound();
    const include = await getIncOrExcNumbers(userName, currentRound, IncOrExc.include);
    const exclude = await getIncOrExcNumbers(userName, currentRound, IncOrExc.exclude);
    const choice: number[] = makeChoice(exclude);

    const compart = {
        choice: compartByLine(choice),
        include: compartByLine(include),
    };

    let choiceFlag = true;
    let includeFlag = false;
    for (let i = 0; i < 5; i++) {
        if (compart.choice[i].length < lineCount[i]) {
            choiceFlag = false;
            break;
        }
        if (!includeFlag && compart.include[i] && lineCount[i] > 0) {
            includeFlag = doesExist(compart.choice[i], compart.include[i]);
        }
    }
    if (!choiceFlag) throw new Error('impossible condition - choice');
    if(!includeFlag) throw new Error('impossible condition - include');

    const numsArr: number[][] = [];
    while (numsArr.length < 5) {
        const numbers: number[] = [];
        for (let i = 0; i < 5; i++) {
            const set = new Set<number>();
            while (set.size < lineCount[i]) {
                set.add(compart.choice[i][Math.floor(Math.random() * compart.choice[i].length)]);
            }
            numbers.push(...[...set]);
            if (!includeFlag && compart.include[i] && lineCount[i] > 0) {
                includeFlag = doesExist(numbers, compart.include[i]);
            }
        }
        if (includeFlag) {
            numsArr.push(numbers.sort((a, b) => a - b));
        }
    }

    return numsArr;
}

export async function numsArrToData(numsArr:number[][]){
    const lottoData = await scanLotto();
    return numsArr.map(numbers => {
        const winner = new Array<number>(5).fill(0);
        lottoData.forEach(lotto => {
            let count = 0;
            numbers.forEach(num => {
                if (lotto.Numbers.NS.indexOf(num.toString()) !== -1) count++;
            });
            switch (count) {
                case 3:
                    winner[4]++;
                    break;
                case 4:
                    winner[3]++;
                    break;
                case 5:
                    if (numbers.indexOf(Number(lotto.BonusNum.N)) !== -1) winner[1]++;
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
    });
}

export async function freeGenerator(userName: string, lineCount?: number[]) {
    let numsArr: number[][];
    if (!lineCount) numsArr = await generateNumberA(userName);
    else numsArr = await generateNumberB(userName, lineCount);
    return (await numsArrToData(numsArr));
}

async function scanLotto(): Promise<{ BonusNum: { N: string }, Numbers: { NS: string[] } }[]> {
    const params: AWS.DynamoDB.ScanInput = {
        TableName: 'LottoData',
        ProjectionExpression: 'Numbers, BonusNum'
    };
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data: any) => {
            if (err) reject(err);
            resolve(data.Items);
        });
    })
}