import Generator from '../back-end/class/Generator/Generator'
import { ZeroToFour, ZeroToSix, LottoNumber } from '../back-end/class/Generator/GeneratorBase';
const readlineSync = require('readline-sync');

const gen = new Generator();
/*
1. 제외할 공색(0,1,2,3,4) 중 택
2. 저값(0~6) 값
3. 홀수갯수(0~6) 값
4. 소수갯수(0~6) 값
5. 3의배수 갯수(0~6) 값
6. 십의자리 합(0~24) 범위
7. 번호합 (21~255) 범위
8. 고저차(5~44) 범위
9. AC값(0~10) 값 or 범위
10 이월갯수(0~6) 값 => 포함할 수 선택 나머지 제외.
11. 번호빈도 => 미출현번호, 차가운수 '포함할 수'
12. 번호빈도 => 뜨거운 수 최근 출현빈도, 번호간격, '제외할 수'
*/

console.log('1', gen.setExceptedLines([2]));

console.log('2', gen.setLowCount(2));

console.log('3', gen.setOddCount(2));

console.log('4', gen.setPrimeCount(2));

console.log('5', gen.set$3Count(2));

console.log('6', gen.setSum$10({from:4, to:17}));

console.log('7', gen.setSum({from:150, to:190}));

console.log('8', gen.setDiffMaxMin({from:7, to:43}));

console.log('9', gen.setAC({from:7, to:7}));

console.log('10', gen.setInclude([14]));

console.log('11', gen.setExclude([19]));

console.log('12', gen.setConsecutiveExclude(true));

const numbers = gen.generate();
console.log(numbers, numbers.length);