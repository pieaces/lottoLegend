import Calculate from "../Calculate";
import { dynamoDB } from ".";
import { getCurrentRound } from "../funtions";
import { getIncOrExcNumbers, IncOrExc } from "./myNumbers";

async function generateNumberA(userName:string) {
    const currentRound = getCurrentRound();
    const include = await getIncOrExcNumbers(userName, currentRound, IncOrExc.include);
    const exclude = await getIncOrExcNumbers(userName, currentRound, IncOrExc.exclude);
    const choice: number[] = [];

    exclude.forEach((num, index) => {
        for (let i = exclude[index - 1] + 1 || 1; i < num; i++) {
            choice.push(i);
        }
    });
    for (let i = exclude[exclude.length - 1] + 1; i <= 45; i++) {
        choice.push(i);
    }

    const numsArr: number[][] = [];

    while (numsArr.length <= 5) {
        const SIZE = choice.length;
        const numberSet: Set<number> = new Set();
        while (numberSet.size < 6) {
            numberSet.add(choice[Math.floor(Math.random() * SIZE)]);
        }
        const numbers = [...numberSet].sort((a, b) => a - b);

        let flag = false;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < include.length; j++) {
                if (numbers[i] === include[j]) {
                    flag = true;
                    break;
                }
            }
        }
        if (flag) {
            numsArr.push(numbers);
        }
    }

    return numsArr;
}
export async function generatorA(userName:string) {
    const numsArr = await generateNumberA(userName);
    numsArr.push([2, 9, 16, 25, 26, 40]);
    numsArr.push([2, 9, 16, 25, 26, 39]);
    const lottoData = await scanLotto();
    const body = numsArr.map(numbers => {
        const winner = new Array<number>(5).fill(0);

        lottoData.forEach(lotto => {
            let count = 0;
            numbers.forEach(num => {
                if (lotto.Numbers.NS.indexOf(num.toString()) !== -1) {
                    count++;
                }
            });
            switch (count) {
                case 3:
                    winner[4]++;
                    break;
                case 4:
                    winner[3]++;
                    break;
                case 5:
                    if (numbers.indexOf(Number(lotto.BonusNum.N)) !== -1) {
                        winner[1]++;
                    } else {
                        winner[2]++;
                    }
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
    return body;
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