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

type ZeroToTwo = 0|1|2;
type ZeroToFour = 0|1|2|3|4;
type ZeroToSix = 0|1|2|3|4|5|6;

export default class Generator {
    exceptedLineCount: ZeroToFour;
    exceptedLines: ZeroToFour[];
    consecutiveNumber: ZeroToTwo;
    sum$10: [number, number];
    oddCount: ZeroToSix;
    $3Count: ZeroToSix;
    ac: [number, number];
    diffMaxMin: [number, number];
    carryCount?: ZeroToSix;

    traversal(method?: () => void): number {
        const list:number[] = [];
        for (let i = 0; i < 45; i++) {
            if (this.exceptedLines.indexOf(<ZeroToFour>Math.floor((i + 1) / 10)) === -1) {
                list.push(i);
            }
        }
        const BOX_SIZE = 6;
        const indexBox = [0, 1, 2, 3, 4, 5]; //list의 index를 value로 취함.

        const LIST_SIZE = list.length;
        const indexUpb = [LIST_SIZE-6, LIST_SIZE-5, LIST_SIZE-4, LIST_SIZE-3, LIST_SIZE-2, LIST_SIZE-1]; //list의 index를 value로 취함.

        const moveBox = (): void => {
            for (let i = BOX_SIZE - 2; i >= 0; i--) {
                if (indexBox[i] < indexUpb[i]) {
                    indexBox[i]++;
                    for (let j = i + 1; j < BOX_SIZE; j++) {
                        indexBox[j] = indexBox[j - 1] + 1;
                    }
                    break;
                }
            }
        }

        let count = 0;
        while (true) {
            //조건체크 후 실행
            const box = indexBox.map(value => list[value]);
            if (!(this.sum$10[0] <= Calculate.sum$10(box) && Calculate.sum$10(box) <= this.sum$10[1])) {
            }
            else if (Calculate.oddCount(box) !== this.oddCount) {
            }
            else if (Calculate.$3Count(box) !== this.$3Count) {
            }
            else if (!(this.ac[0] <= Calculate.AC(box) && Calculate.AC(box) <= this.ac[1])) {
            }
            else if (!(this.diffMaxMin[0] <= Calculate.diffMaxMin(box) && Calculate.diffMaxMin(box) <= this.diffMaxMin[1])) {
            }else{//모든 조건상황에서도 참이었을 때,
                count++;
                //console.log(box);
            }
            
            if (indexBox[0] === indexUpb[0]) break;
            else {
                indexBox[BOX_SIZE - 1]++;
                if (indexBox[BOX_SIZE - 1] > indexUpb[BOX_SIZE - 1]) moveBox();
            }
        }
        return count;
    }
}