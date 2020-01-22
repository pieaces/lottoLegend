import Probability from '../class/Statistics/Probability'
import Calculate from '../class/Statistics/Calculate'

const C = Probability.C;
const pqc = Probability.pqc;

function traversal(pos: number[], method: (numbers: number[]) => number) {
    const ub = [40, 41, 42, 43, 44, 45];
    const moveBox = (box: number[]): void => {
        for (let i = SIZE-2; i >= 0; i--) {
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

        box[SIZE-1]++;
        if (box[SIZE-1] > ub[SIZE-1]) {
            moveBox(box);
        }
    }
    return pos.map(value => value / C(45, 6));
}

function expectedAnnhilationCount() {
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

function expectedSum$10(): number[] {
    return traversal(new Array<number>(25).fill(0), Calculate.sum$10);

}
function expectedSum$1(): number[] {
    return traversal(new Array<number>(51).fill(0),
    (box:number[]):number => Calculate.sum$1(box) - 2);
}
function expectedSum(): number[] {
    return traversal(new Array<number>(235).fill(0),
    (box:number[]):number => Calculate.sum(box) - 21);
}

function expectedOddCount(): number[] {
    return pqc(7, 23 / 45);
}

function expectedPrimeCount(): number[] {
    return pqc(7, 14/45);
}
function expected$3Count(): number[] {
    return pqc(7, 1 / 3);
}

function expectedDiffMaxMinData(): number[] {
    return traversal(new Array<number>(40).fill(0),
    (box:number[]):number => Calculate.diffMaxMin(box) - 5);

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
    return traversal(new Array<number>(11).fill(0), Calculate.AC);
}

const expectedLowCount = (): number[] => {
    const pos = new Array<number>(7);
    for (let i = 0; i <= 6; i++) {
        pos[i] = C(22, i) * C(23, 6 - i) / C(45, 6)
    }
    return pos;
}

function expectedConsecutive(): number[] {
    return traversal(new Array<number>(2).fill(0), Calculate.consecutiveExist);
}


const pos = expectedSum();

console.log(pos.reduce((acc, cur) => acc + cur, 0));

let str = "[\n";
pos.forEach(value =>{
    str += `\t${value},\n`
});
console.log(str);
