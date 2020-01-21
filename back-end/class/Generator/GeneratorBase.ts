/*
1. 제외할 공색(0,1,2,3,4) 중 택
2. 저값(0~6) 값
3. 홀수갯수(0~6) 값
4. 소수갯수(0~6) 값
5. 3의배수 갯수(0~6) 값
6. 십의자리 합(0~24) 범위
7. 일의자리 합(2~44) 범위
8. 고저차(5~44) 범위
9. AC값(0~10) 값 or 범위
10 이월갯수(0~6) 값 => 포함할 수 선택 나머지 제외.
11. 번호빈도 => 미출현번호, 차가운수 '포함할 수'
12. 번호빈도 => 뜨거운 수 최근 출현빈도, 번호간격, '제외할 수'
*/
import Calculate from '../Statistics/Calculate'
import { Range } from 'immutable';

export type ZeroToFour = 0|1|2|3|4;
export type ZeroToSix = 0|1|2|3|4|5|6;
export type LottoNumber = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45;
export type Range = {from:LottoNumber, to:LottoNumber};

export default class GeneratorBase{
    protected exceptedLines: ZeroToFour[] = [2];
    protected lowCount: ZeroToSix = 3;
    protected oddCount: ZeroToSix = 3;
    protected primeCount: ZeroToSix = 2;
    protected $3Count: ZeroToSix = 2;
    protected sum$10: Range = {from:9, to:15};
    protected diffMaxMin: Range = {from:25, to:40};
    protected ac: Range = {from:7, to:9};
    protected includeNumber: LottoNumber[];
    protected excludeNumber: LottoNumber[];
    private capableNumbers: LottoNumber[] = [];

    constructor(){}

    setExceptedLines(exceptedLines: ZeroToFour[]):boolean{
        this.exceptedLines = exceptedLines;

        for (let i = 1; i <= 45; i++) {
            const existExcept = exceptedLines.indexOf(<ZeroToFour>Math.floor(i / 10));
            if (existExcept === -1) {
                this.capableNumbers.push(i as LottoNumber);
            }
        }

        return true;
    }

    setLowCount(lowCount:ZeroToSix):boolean{
        if(this.capableNumbers.length === 0) return false;

        if(Calculate.lowCount(this.capableNumbers) >= lowCount){
            this.lowCount = lowCount;
            return true;
        }else{
            return false;
        }
    }

    setOddCount(oddCount:ZeroToSix):boolean {
        if(this.capableNumbers.length === 0) return false;

        this.oddCount = oddCount;
        return true;
    }

    set$3Count($3Count:ZeroToSix):boolean {
        if(this.capableNumbers.length === 0) return false;

        this.$3Count = $3Count;
        return true;
    }

    setSum$10(sum$10:Range):boolean{
        if(this.capableNumbers.length === 0) return false;

        if(this.exceptedLines.indexOf(4) !== -1){
            if(sum$10.from < 0 || 18 < sum$10.to) return false;
        }
        if(this.exceptedLines.indexOf(0) !== -1){
            if(sum$10.from < 6 || 24 < sum$10.to) return false;
        }
    }
}


const gen = new GeneratorBase();
gen.setExceptedLines([0,1,2]);
console.log(gen.setLowCount(0));