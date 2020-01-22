import Generator from '../back-end/class/Generator/Generator'
import { ZeroToFour, ZeroToSix, LottoNumber } from '../back-end/class/Generator/GeneratorBase';
const readlineSync = require('readline-sync');
////
const constraintSum$10 = require('../back-end/json/Generator/sum$10.json');
const constraintSum = require('../back-end/json/Generator/sum_compressed.json');
const constraintDiffMaxMin = require('../back-end/json/Generator/diffMaxMin_compressed.json');
const constraintAC = require('../back-end/json/Generator/AC_compressed.json');
////
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
const exceptedLines:string = readlineSync.question('제외할 라인: (쉼표로 구분 1,2,3)');
const exceptedLinesArr = exceptedLines ? exceptedLines.split(',').map(value => Number(value) as ZeroToFour) : [];
console.log(exceptedLinesArr);
console.log('1', gen.setExceptedLines(exceptedLinesArr));

const lowCount:string = readlineSync.question('저값: (0~6)');
const lowCountNum = Number(lowCount) as ZeroToSix;
console.log(lowCountNum);
console.log('2', gen.setLowCount(lowCountNum));

const constraintConstant = lowCount.toString() + exceptedLinesArr.join('');


const sum$10:string = readlineSync.question(`십의자리 합 범위: 가능한 값들로는 ${constraintSum$10[constraintConstant].join(',')}이 있습니다. / (0~24)`);
let range = sum$10.split(',').map(value => Number(value));
console.log(range);
console.log('6', gen.setSum$10({from:range[0] as LottoNumber, to:range[1] as LottoNumber}));

const sum:string = readlineSync.question(`번호합 범위: ${constraintSum[constraintConstant].join('~')} / (21~255)`);
range = sum.split(',').map(value => Number(value));
console.log(range);
console.log('7', gen.setSum({from:range[0] as LottoNumber, to:range[1] as LottoNumber}));

const diffMaxMin:string = readlineSync.question(`고저차 범위: ${constraintDiffMaxMin[constraintConstant].join('~')} / (5~44)`);
range = diffMaxMin.split(',').map(value => Number(value));
console.log(range);
console.log('8', gen.setDiffMaxMin({from:range[0] as LottoNumber, to:range[1] as LottoNumber}));

const AC:string = readlineSync.question(`AC: ${constraintAC[constraintConstant].join('~')} / (0~10)`);
range = AC.split(',').map(value => Number(value));
console.log(range);
console.log('9', gen.setAC({from:range[0] as LottoNumber, to:range[1] as LottoNumber}));


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