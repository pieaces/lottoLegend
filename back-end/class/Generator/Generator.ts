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
        const SIZE = 6;
        const box = [1, 2, 3, 4, 5, 6];
        const upb = [40, 41, 42, 43, 44, 45];
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
        const exceptedLineChecker = function (box: number[], exceptedLines:number[]):boolean { //없어야하는 것들을 포함하면 false
            let check = true;
            const linesSet = new Set<number>();
            for(let i=0; i<box.length; i++){
                linesSet.add(Math.floor(box[i]/10));
            }
            const lines = [...linesSet];
            for(let i =0; i<lines.length; i++){
                if(exceptedLines.indexOf(lines[i]) !== -1){
                    check = false;
                    break;
                }
            }
            
            return check;
        }

        let count = 0;
        while (true) {
            let check = true;
            //조건체크 후 실행

            if (Calculate.exceptedLineCount(box) !== this.exceptedLineCount) {
                check = false;
            }
            else if(!exceptedLineChecker(box, this.exceptedLines)){
                check = false;
            }
            else if (!(this.sum$10[0] <= Calculate.sum$10(box) && Calculate.sum$10(box) <= this.sum$10[1])) {
                check = false;
            }
            else if (Calculate.oddCount(box) !== this.oddCount) {
                check = false;
            }
            else if (Calculate.$3Count(box) !== this.$3Count) {
                check = false;
            }
            else if (!(this.ac[0] <= Calculate.AC(box) && Calculate.AC(box) <= this.ac[1])) {
                check = false;
            }
            else if (!(this.diffMaxMin[0] <= Calculate.diffMaxMin(box) && Calculate.diffMaxMin(box) <= this.diffMaxMin[1])) {
                check = false;
            }else{//모든 조건상황에서도 참이었을 때,
                count++;
                //console.log(box);
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
