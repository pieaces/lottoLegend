import Generator from '../back-end/class/Generator/Generator'
import { ZeroToFour, ZeroToSix, LottoNumber } from '../back-end/class/Generator/Base';
const readlineSync = require('readline-sync');

const date = new Date();
const gen = new Generator();
/*
1. 제외할 공색(0,1,2,3,4) 중 택
2. 저값(0~6) 값
3. 십의자리 합(0~24) 범위
4. 번호합 (21~255) 범위
5. 고저차(5~44) 범위
6. AC값(0~10) 값 or 범위
7. 홀수갯수(0~6) 값
8. 소수갯수(0~6) 값
9. 3의배수 갯수(0~6) 값
10 이월갯수(0~6) 값 => 포함할 수 선택 나머지 제외.
11. 번호빈도 => 미출현번호, 차가운수 '포함할 수'
12. 번호빈도 => 뜨거운 수 최근 출현빈도, 번호간격, '제외할 수'
13. 연속번호 제외여부
*/

gen.setExceptedLines([4]);
gen.setLowCount(2);
gen.setSum$10({from:10, to:12});
gen.setSum({from:140, to:160});
gen.setDiffMaxMin({from:32, to:37});
gen.setAC({from:5, to:5});
gen.setOddCount(3);
gen.setPrimeCount(2);
gen.set$3Count(2);
gen.onConsecutiveExclude(true);
gen.setExclude([]);
gen.setInclude([]);
gen.generate();

//console.log(gen.getGeneratedNumbers(), gen.getGeneratedNumbers().length);
const date2 = new Date();
console.log(gen.getGeneratedNumbers().length + '개', Number(date2) - Number(date) + 'ms');
/*
console.log('10', gen.setInclude([3,7]));
console.log('11', gen.setExclude([25]));

gen.filterInclude() // 추후에는 기존 number 받아온 것에서 체 거르기 할 것
console.log(gen.getGeneratedNumbers(), gen.getGeneratedNumbers().length);
*/
/*
3제외, 저3
10합 9~13, 15 => 10,14
총합 100~182 => 120,160
고저차 31~44 => 32,35
ac 1~10 => 2,5
홀수 3
소수2
3배수2
*/