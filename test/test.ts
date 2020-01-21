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
const exceptedLines:string = readlineSync.question('제외할 라인: (쉼표로 구분 1,2,3)');
const exceptedLinesArr = exceptedLines ? exceptedLines.split(',').map(value => Number(value) as ZeroToFour) : [];
console.log(exceptedLinesArr);
console.log('1', gen.setExceptedLines(exceptedLinesArr));

const lowCount:string = readlineSync.question('저값: (0~6)');
const lowCountNum = Number(lowCount) as ZeroToSix;
console.log(lowCountNum);
console.log('2', gen.setLowCount(lowCountNum));

const oddCount:string = readlineSync.question('홀수개수: (0~6)');
const oddCountNum = Number(oddCount) as ZeroToSix
console.log(oddCountNum);
console.log('3', gen.setOddCount(oddCountNum));

const primeCount:string = readlineSync.question('소수개수: (0~6)');
const primeCountNum = Number(primeCount) as ZeroToSix
console.log(primeCountNum);
console.log('4', gen.setPrimeCount(primeCountNum));

const $3Count:string = readlineSync.question('3배수개수: (0~6)');
const $3CountNum = Number($3Count) as ZeroToSix;
console.log($3CountNum);
console.log('5', gen.set$3Count($3CountNum));

const sum$10:string = readlineSync.question('십의자리 합 범위: ex) 5,19 (0~24)');
let range = sum$10.split(',').map(value => Number(value));
console.log(range);
console.log('6', gen.setSum$10({from:range[0] as LottoNumber, to:range[1] as LottoNumber}));

const sum:string = readlineSync.question('번호합 범위: ex) 120,170 (21~255)');
range = sum.split(',').map(value => Number(value));
console.log(range);
console.log('7', gen.setSum({from:range[0] as LottoNumber, to:range[1] as LottoNumber}));

const diffMaxMin:string = readlineSync.question('고저차: ex) 13,29 (5~44)');
range = diffMaxMin.split(',').map(value => Number(value));
console.log(range);
console.log('8', gen.setDiffMaxMin({from:range[0] as LottoNumber, to:range[1] as LottoNumber}));

const AC:string = readlineSync.question('AC: ex) 7,8 (0~10)');
range = AC.split(',').map(value => Number(value));
console.log(range);
console.log('9', gen.setAC({from:range[0] as LottoNumber, to:range[1] as LottoNumber}));


console.log('가용번호: ', gen.getCapableNumbers());

const include:string = readlineSync.question('포함할 수: ex) 10,15,29');
const includeArr = include.split(',').map(value => Number(value) as LottoNumber);
console.log(includeArr);
console.log('10', gen.setInclude(includeArr));

const exclude:string = readlineSync.question('제외할 수: ex) 13,17,31,39');
const excludeArr = exclude.split(',').map(value => Number(value) as LottoNumber);
console.log(excludeArr);
console.log('11', gen.setExclude(excludeArr));


const numbers = gen.generate();
console.log(numbers.length, numbers);