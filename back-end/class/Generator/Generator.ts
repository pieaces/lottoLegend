import Calculate from '../Statistics/Calculate'
/*
전멸갯수(0~4) 정확히 입력 (0~4으로 한정)
제외할 공색(0,1,2,3,4) 중 택(전멸갯수만큼) 정확히
연속번호
십의자리 합(0~24) 입력 범위 
홀수갯수(0~6) 정확히
3의배수 갯수(0~6) 정확히
AC값(0~10) 범위
고저차(5~44) 범위
저고비율
이월갯수(0~6)

번호빈도수 => 제외할 수, 포함할 수 고르기
뜨거운수 차가운수 
미출현번호
*/
class Generator {
    annihilatedLineCount: number;
    exceptedLine: number[];
    sum$10: [number, number];
    oddCount: number;
    $3Count: number;
    ac: [number, number];
    diffMaxMin: [number, number];
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
                if (!value) result.push(index);
            });

            return result;
        }
        let count = 0;
        while (true) {
            let check = true;
            //조건체크 후 실행

            const exceptedLines = exceptedLine(box);
            if (Calculate.annihilatedLineCount(box) !== this.annihilatedLineCount) {
                check = false;
            }
            /*
            if (exceptedLines.length !== this.exceptedLine.length) {
                console.log(box, '전멸라인');

                check = false;
            }*/
            exceptedLines.forEach((value, i) => {
                if (value !== this.exceptedLine[i]) {
                    check = false;
                }
            });
            if (!(Calculate.sum$10(box) <= this.sum$10[0] && Calculate.sum$10(box) <= this.sum$10[1])) {
                check = false;
            }
            if (Calculate.oddCount(box) !== this.oddCount) {

                check = false;
            }
            if (Calculate.$3Count(box) !== this.$3Count) {

                check = false;
            }
            if (!(Calculate.AC(box) <= this.ac[0] && Calculate.AC(box) <= this.ac[1])) {

                check = false;
            }
            if (!(Calculate.diffMaxMin(box) <= this.diffMaxMin[0] && Calculate.diffMaxMin(box) <= this.diffMaxMin[1])) {

                check = false;
            }
            //
            if (check) {
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
gen.sum$10 = [11,12];
gen.oddCount = 3;
gen.$3Count = 2;
gen.ac = [7,9];
gen.diffMaxMin = [35,39];

console.log(gen.traversal());