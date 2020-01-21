import Probability from '../class/Statistics/Probability'
import Calculate from '../class/Statistics/Calculate'

const AC = Calculate.AC;
const C = Probability.C;
const pqc = Probability.pqc;

function expectedAnnhilationCount() {
    const ub = [45, 44, 43, 42, 41, 40];
    const check =(box:number[]): number => {

        const doesExist = new Array<boolean>(5).fill(false);
        box.forEach(value => {
            doesExist[Math.floor(value/10)] = true;
        });
        let sum = 0;
        doesExist.forEach(value => {
            if(value === false) sum++;
        })
        return sum;
    }
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
    const pos = new Array<number>(5).fill(0);//5~44

    while (true) {
        pos[check(box)]++;

        if (box[SIZE - 1] === ub[SIZE - 1]) {
            break;
        }

        box[0]++;
        if (box[0] > ub[0]) {
            moveBox(box);
        }
    }
    return pos.map(value => value / C(45, 6));
}

function expectedSum$10(): number[] {
    const moveBox = (box: number[]): void => {
        let start = 0;
        for (let i = 0; i < box.length - 1; i++) {
            if (box[i] > 0) {
                start = i;
                break;
            }
        }
        box[start] = 0;
        box[start + 1]++;
    }
    const sumBox = (box: number[]): number => box.reduce((acc, cur) => acc + cur, 0);

    const FULL = 6;
    const SIZE = 5;
    const weight = [0, 1, 2, 3, 4];
    const total = [9, 10, 10, 10, 6];
    const pos = new Array<number>(25).fill(0);
    const box = new Array<number>(SIZE).fill(0);

    while (box[SIZE - 1] < FULL) {
        box[0]++;
        while (sumBox(box) === FULL && box[SIZE - 1] < FULL) {
            let totalSum = 0, totalPro = 1;
            box.forEach((value, i) => {
                totalSum += value * weight[i];
                totalPro *= C(total[i], value);
            });
            pos[totalSum] += totalPro / C(45, 6);
            moveBox(box);
        }
    }
    pos[24] = 1 / C(45, 6);
    return pos;
}

function expectedOddCount(): number[] {
    return pqc(7, 23 / 45);
}

function expected$3Count(): number[] {
    return pqc(7, 1 / 3);
}

function expectedDiffMaxMinData(): number[] {
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
    const pos = new Array<number>(40).fill(0);//5~44

    while (true) {
        pos[box[0] - box[SIZE - 1] - 5]++;

        if (box[SIZE - 1] === ub[SIZE - 1]) {
            break;
        }

        box[0]++;
        if (box[0] > ub[0]) {
            moveBox(box);
        }

    }
    return pos.map(value => value / C(45, 6));
}
function expectedCarry(): number[] {
    const pos = new Array<number>(7).fill(0);
    pos[0] = C(39, 6) / C(45, 6);
    for (let i = 1; i <= 6; i++) {
        pos[i] = C(39, 6 - i) * C(6, i) / C(45, 6);
    }
    return pos;
}

function expectedAC(): number[] {
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
    const pos = new Array<number>(11).fill(0);//5~44

    while (true) {
        pos[AC(box)]++;

        if (box[SIZE - 1] === ub[SIZE - 1]) {
            break;
        }

        box[0]++;
        if (box[0] > ub[0]) {
            moveBox(box);
        }

    }
    return pos.map(value => value / C(45, 6));
}

const expectedLowCount = ():number[] => {
    const pos = new Array<number>(7);
    for(let i =0; i<=6; i++){
        pos[i] = C(22,i) * C(23,6-i) / C(45, 6)
    }
    return pos;
}
const pos = expectedLowCount();

console.log(pos.reduce((acc, cur) => acc + cur, 0));
console.log(pos);