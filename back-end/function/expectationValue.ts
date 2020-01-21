import Probability from '../class/Statistics/Probability'
import Calculate from '../class/Statistics/Calculate'

const C = Probability.C;
const pqc = Probability.pqc;

function traversal(pos: number[], method: (numbers: number[]) => number) {
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

    while (true) {
        pos[method(box)]++;

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
/*
const pos = expectedPrimeCount();

console.log(pos.reduce((acc, cur) => acc + cur, 0));
console.log(pos);
*/

function $10() {
    const exceptedLines = (box:number[]) => {
        const check = new Array<boolean>(5).fill(true);
        box.forEach((value) => {
            check[Math.floor(value/10)] = false;
        });
        const result:number[] = [];
        check.forEach((value, i)=>{
            if(value) result.push(i);
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
        for(let i =0; i<mapDArr.length; i++){
            if(mapDArr[i].length === excepted.length){
                let check = true;
                for(let j =0; j<mapDArr[i].length; j++){
                    if(mapDArr[i][j] !== excepted[j]){
                        check = false;
                        break;
                    }
                }
                if(check){
                    const target = mapDArr[i];
                    const value = map.get(target);
                    value.add(Calculate.sum$10(box));
                    map.set(target, value);
                    outCheck = false;
                }
            }
         }
         if(outCheck){
            map.set(excepted, new Set<number>([Calculate.sum$10(box)]));
         }
        if (box[SIZE - 1] === ub[SIZE - 1]) {
            break;
        }

        box[0]++;
        if (box[0] > ub[0]) {
            moveBox(box);
        }
    }
    console.log(map);
}
$10();