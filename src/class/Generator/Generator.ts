import Calculate from '../Statistics/Calculate'
/*
전멸갯수(0~4) 입력 AnnihilatedLine
제외할 공색(0,1,2,3,4) 중 택(전멸갯수만큼)
십의자리 합(0~24) 입력
홀수갯수(0~6)
3의배수 갯수(0~6)
AC값(0~10)
고저차(5~44)
이월갯수(0~6)
*/
class Generator {
    annihilatedLineCount: number;
    exceptedLine: number[];
    sum$10: number;
    oddCount: number;
    $3Count: number;
    ac: number;
    diffMaxMin: number;
    carryCount?: number;

    traversal(method?: () => void): number {
        const SIZE = 6;
        const box = [1, 2, 3, 4, 5, 6];
        const upb = [41, 42, 43, 44, 45, 46];
        const moveBox = (box: number[]): void => {
            for (let i = SIZE - 2; i >= 0; i--) {
                if (box[i] < upb[i]) {
                    box[i]++;
                    for (let j = i + 1; j < SIZE; j++) {
                        box[j] = box[j - 1] + 1;
                    }
                    break;
                }
            }
        }
        const exceptedLine = function (box: number[]) {
            const temp: boolean[] = new Array<boolean>(5).fill(false);
            box.forEach(value => {
                temp[Math.floor(value / 10)] = true;
            });
            const result: number[] = [];
            temp.forEach((value, index) => {
                if (value) result.push(index);
            });

            return result;
        }
        let count = 0;
        while (true) {
            let check = true;
            //조건체크 후 실행

            const exceptedLines = exceptedLine(box);
            if (Calculate.annihilatedLineCount(box) !== this.annihilatedLineCount) {
                console.log('전멸갯수');
                check = false;
            }
            /*
            if (exceptedLines.length !== this.exceptedLine.length) {
                console.log(box, '전멸라인');

                check = false;
            }*/
            exceptedLines.forEach((value, i) => {
                if (value !== this.exceptedLine[i]) {
                    console.log(box, '전멸라인');
                    check = false;
                }
            });
            if (Calculate.sum$10(box) !== this.sum$10) {
                console.log(box, '십의자리합');

                check = false;
            }
            if (Calculate.oddCount(box) !== this.oddCount) {
                console.log(box, '홀수개수');

                check = false;
            }
            if (Calculate.$3Count(box) !== this.$3Count) {
                console.log(box, '3배수개수');

                check = false;
            }
            if (Calculate.AC(box) !== this.ac) {
                console.log(box, 'AC합');

                check = false;
            }
            if (Calculate.diffMaxMin(box) !== this.diffMaxMin) {
                console.log(box, '고저차');
                check = false;
            }
            //
            if (check) {
                console.log(count);
                count++;
            }
            if (box[0] === upb[0]) break;
            else {
                box[SIZE - 1]++;
                if (box[SIZE - 1] > upb[SIZE - 1]) moveBox(box);
            }
        }
        return count;
    }
}

const gen = new Generator();
gen.annihilatedLineCount = 1;
gen.exceptedLine = [2];
gen.sum$10 = 140;
gen.oddCount = 3;
gen.$3Count = 2;
gen.ac = 7;
gen.diffMaxMin = 12;

console.log(gen.traversal());