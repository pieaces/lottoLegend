/*
전멸갯수(0~4) 정확히 입력 (0~4으로 한정)
제외할 공색(0,1,2,3,4) 중 택(전멸갯수만큼) 정확히
저고비율
십의자리 합(0~24) 범위
홀수갯수(0~6) 정확히
3의배수 갯수(0~6) 정확히
AC값(0~10) 정확히 입력 or 범위
고저차(5~44) 범위
이월갯수(0~6)

번호빈도수 => 제외할 수, 포함할 수 고르기 뜨거운, 차가운수, 미출현번호
*/

export type ZeroToFour = 0|1|2|3|4;
export type ZeroToSix = 0|1|2|3|4|5|6;
export type Range = {from:number, to:number};

export default interface Generatable {
    exceptedLineCount: ZeroToFour;
    exceptedLines: ZeroToFour[];
    lowCount: ZeroToSix;
    sum$10: Range;
    oddCount: ZeroToSix;
    $3Count: ZeroToSix;
    ac: Range;
    diffMaxMin: Range;
    carryCount: ZeroToSix;
    includeNumber: number[];
    excludeNumber: number[];

    generate(): Array<number[]>
}