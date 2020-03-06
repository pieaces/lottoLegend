import fs from 'fs'
import Probability from '../Lotto/class/Statistics/Probability'
import Calculate from '../Lotto/class/Calculate'

const C = Probability.C;
const pqc = Probability.pqc;

function traversal(pos: number[], method: (numbers: number[]) => number) {
    const ub = [40, 41, 42, 43, 44, 45];
    const moveBox = (box: number[]): void => {
        for (let i = SIZE - 2; i >= 0; i--) {
            if (box[i] < ub[i]) {
                box[i]++;
                for (let j = i + 1; j < SIZE; j++) {
                    box[j] = box[j - 1] + 1;
                }
                break;
            }
        }
    }

    const SIZE = 6;
    const box = [1, 2, 3, 4, 5, 6];

    while (true) {
        pos[method(box)]++;

        if (box[0] === ub[0]) {
            break;
        }

        box[SIZE - 1]++;
        if (box[SIZE - 1] > ub[SIZE - 1]) {
            moveBox(box);
        }
    }
    return pos.map(value => value / C(45, 6));
}

function lineCount() {
    const ub = [40, 41, 42, 43, 44, 45];
    const moveBox = (box: number[]): void => {
        for (let i = SIZE - 2; i >= 0; i--) {
            if (box[i] < ub[i]) {
                box[i]++;
                for (let j = i + 1; j < SIZE; j++) {
                    box[j] = box[j - 1] + 1;
                }
                break;
            }
        }
    }

    const SIZE = 6;
    const box = [1, 2, 3, 4, 5, 6];

    const pos = [0,0,0,0,0];
    while (true) {
        box.forEach(num => pos[Math.floor((num-1)/10)]++);

        if (box[0] === ub[0]) {
            break;
        }

        box[SIZE - 1]++;
        if (box[SIZE - 1] > ub[SIZE - 1]) {
            moveBox(box);
        }
    }
    return pos.map(value => value / C(45, 6));
}
function excludedLineCount() {
    return traversal(new Array<number>(5).fill(0),
        (box: number[]): number => {

            const doesExist = new Array<boolean>(5).fill(false);
            box.forEach(value => {
                doesExist[Math.floor(value / 10)] = true;
            });
            let sum = 0;
            doesExist.forEach(value => {
                if (value === false) sum++;
            })
            return sum;
        });
}

function sum$10(): number[] {
    return traversal(new Array<number>(25).fill(0), Calculate.sum$10);

}
function sum$1(): number[] {
    return traversal(new Array<number>(51).fill(0),
        (box: number[]): number => Calculate.sum$1(box) - 2);
}
function sum(): number[] {
    return traversal(new Array<number>(235).fill(0),
        (box: number[]): number => Calculate.sum(box) - 21);
}

function oddCount(): number[] {
    return pqc(6, 23 / 45);
}

function primeCount(): number[] {
    return pqc(6, 14 / 45);
}
function $3Count(): number[] {
    return pqc(6, 1 / 3);
}

function diffMaxMinData(): number[] {
    return traversal(new Array<number>(40).fill(0),
        (box: number[]): number => Calculate.diffMaxMin(box) - 5);

}
function carryCount(): number[] {
    const pos = new Array<number>(7).fill(0);
    pos[0] = C(39, 6) / C(45, 6);
    for (let i = 1; i <= 6; i++) {
        pos[i] = C(39, 6 - i) * C(6, i) / C(45, 6);
    }
    return pos;
}

function AC(): number[] {
    return traversal(new Array<number>(11).fill(0), Calculate.AC);
}

const lowCount = (): number[] => {
    const pos = new Array<number>(7);
    for (let i = 0; i <= 6; i++) {
        pos[i] = C(22, i) * C(23, 6 - i) / C(45, 6)
    }
    return pos;
}

function consecutiveExist(): number[] {
    return traversal(new Array<number>(2).fill(0), Calculate.consecutiveExist);
}

function execute(method:()=>number[]) {
    const pos = method();

    console.log(pos.reduce((acc, cur) => acc + cur, 0));

    let str = "[\n";
    pos.forEach(value => {
        str += `\t${value},\n`
    });
    str = str.slice(0, -2);
    str += '\n]'
    console.log(str);

    fs.writeFileSync(`./back-end/json/Expectation/${method.name}.json`, str);
    console.log('완료');
}