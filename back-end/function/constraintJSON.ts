import fs from 'fs'
import Calculate from '../class/Statistics/Calculate'

function constraintJSON(method: (box: number[]) => number) {
    const exceptedLines = (box: number[]) => {
        const check = new Array<boolean>(5).fill(true);
        box.forEach((value) => {
            check[Math.floor(value / 10)] = false;
        });
        const result: number[] = [Calculate.lowCount(box)];
        check.forEach((value, i) => {
            if (value) result.push(i);
        });
        return result;
    };
    const ub = [45, 44, 43, 42, 41, 40];
    const moveBox = (box: number[]): void => {
        for (let i = 1; i < box.length; i++) {
            if (box[i] < ub[i]) {
                box[i]++;
                for (let j = i - 1; j >= 0; j--) {
                    box[j] = box[j + 1] + 1;
                }
                break;
            }
        }
    }

    const SIZE = 6;
    const box = [6, 5, 4, 3, 2, 1];

    const obj:any = {};

    while (true) {
        const excepted = exceptedLines(box);

        const key = excepted.join('');
        if(obj.hasOwnProperty(key)){
            obj[key].add(method(box));
        }else{
            obj[key] = new Set<number>([method(box)]);
        }

        if (box[SIZE - 1] === ub[SIZE - 1]) {
            break;
        }

        box[0]++;
        if (box[0] > ub[0]) {
            moveBox(box);
        }
    }
    let str = "{\n";
    for(let prop in obj){
        const key = prop;
        const value = obj[prop];
        const arr = [...value].sort((a:number, b:number) => a - b);
        //압축시키는 코드 예) 1,2,3,4 => 1,4
        let flag = true;
        for(let i =1; i<arr.length; i++){
            if(arr[i] !== arr[i-1] + 1){
                flag = false;
                break;
            }
        }
        let temp;
        if(flag){
            temp = [arr[0], arr[arr.length-1]];
        }else{
            temp = arr;
        }
        ////
        str += (`\t"${key}": [${temp.join(', ')}],\n`);
    }

    str = str.slice(0, -2);
    str += '\n}';
    return str;
}

//"저값+제외라인"
//1(box: number[]) => Math.round(Calculate.sum(box)/10)*10;
//2(box: number[]) => Calculate.sum$10(box)
//3(box: number[]) => Calculate.diffMaxMin(box);
//4(box: number[]) => Calculate.AC(box)

const mode: number = 5;
let method, str;
switch (mode) {
    case 1:
        method = (box: number[]) => Calculate.sum(box);
        str = 'sum'
        break;
    case 2:
        method = (box: number[]) => Calculate.sum$10(box);
        str = 'sum$10'
        break;
    case 3:
        method = (box: number[]) => Calculate.diffMaxMin(box);
        str = 'diffMaxMin'
        break;
    case 4:
        method = (box: number[]) => Calculate.AC(box);
        str = 'AC'
        break;
    case 5:
        method = (box: number[]) => Calculate.lowCount(box);
        str = 'lowCount'
        break;
}

const data: string = constraintJSON(method);
fs.writeFileSync(`./back-end/json/Generator/${str}_compressed.json`, data);
console.log('완료');