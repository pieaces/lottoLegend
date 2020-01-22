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

    const map = new Map<number[], Set<number>>();

    while (true) {
        const excepted = exceptedLines(box);

        const mapDArr = [...map.keys()];
        let outCheck = true;
        for (let i = 0; i < mapDArr.length; i++) {
            if (mapDArr[i].length === excepted.length) {
                let innerCheck = true;
                for (let j = 0; j < mapDArr[i].length; j++) {
                    if (mapDArr[i][j] !== excepted[j]) {
                        innerCheck = false;
                        break;
                    }
                }
                if (innerCheck) {
                    const target = mapDArr[i];
                    const value = map.get(target);
                    value.add(method(box));
                    map.set(target, value);
                    outCheck = false;
                }
            }
        }
        if (outCheck) {
            map.set(excepted, new Set<number>([method(box)]));
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
    map.forEach((value, key) => {
        const arr = [...value].sort((a, b) => a - b);
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
        str += (`\t"${key.join('')}": [${temp.join(', ')}],\n`);
    });
    str = str.slice(0, -2);
    str += '\n}';
    return str;
}

//"저값+제외라인"
//1(box: number[]) => Math.round(Calculate.sum(box)/10)*10;
//2(box: number[]) => Calculate.sum$10(box)
//3(box: number[]) => Calculate.diffMaxMin(box);
//4(box: number[]) => Calculate.AC(box)

const mode: number = 4;
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
}

const data: string = constraintJSON(method);
fs.writeFileSync(`./back-end/json/${str}_compressed.json`, data);
console.log('완료');