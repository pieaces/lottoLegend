import { Response } from '../Response'

export function getCurrentRound(currentDate?: string): number {
    const theDate = new Date('2020-02-01:11:55');
    const today = currentDate && new Date(currentDate) || new Date();
    const between = Number(today) - Number(theDate);
    const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);
    return 896 + plusDate;
}

export function isIdentical(currentId: string, writerId: string): Response {
    if (currentId === writerId) {
        return new Response(false);
    } else {
        return new Response(true, '작성자가 아닙니다.');
    }
}

export function numsArrToString(numbers:number[][]){
    let result = '';
    for(let i =0; i<numbers.length; i++){
        numbers[i].sort((a,b) => a-b);
        result += `${i+1}>${numbers[i].join(',')}\n`;
    }
    return result;
}