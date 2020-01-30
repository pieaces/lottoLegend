import Lotto from "../back-end/class/Lotto/Lotto";
const lotto = new Lotto(require('../back-end/json/lotto.json'));
////
import Generator from '../back-end/class/Generator/Generator'
import { ZeroToFour, ZeroToSix, LottoNumber, GeneratorOption } from '../back-end/class/Generator/Base';
import Calculate from '../back-end/class/Statistics/Calculate';
const readlineSync = require('readline-sync');
////
const constraintLowCount = require('../back-end/json/Generator/lowCount_compressed.json');
const constraintSum = require('../back-end/json/Generator/sum_compressed.json');
////
function cout(str:string, obj:any=""){
    console.log(str, obj);
}

cout('로또 번호 생성기[알파고 엔진 v 1.0.1]\n');

const option:GeneratorOption = { lowCount:3 };
////////////////////////
cout('최근5회차 번호', lotto.getLNumbers(5));
const excludedNumbers: string = readlineSync.question('1.excludedNumbers: (split with "," 1,2,3)');
let excludedNumbersArr:LottoNumber[];
if(excludedNumbers){
    if(excludedNumbers === ' ') excludedNumbersArr = [];
    else excludedNumbersArr = excludedNumbers.split(',').map(value => Number(value) as LottoNumber);
}
cout('제외번호: ',excludedNumbersArr);
cout('');
option.excludeNumbers = excludedNumbersArr;
////////////////////////
const includeNumbers: string = readlineSync.question('2.includedNumbers: (split with "," 1,2,3)');
let includeNumbersArr:LottoNumber[];
if(includeNumbers){
    if(includeNumbers === ' ') includeNumbersArr = [];
    else includeNumbersArr = includeNumbers.split(',').map(value => Number(value) as LottoNumber);
}
cout('포함번호: ',includeNumbersArr);
cout('');
option.includeNumbers = includeNumbersArr;

////////////////////////
const excludedLines: string = readlineSync.question('3.excludedLines: (split with "," 1,2,3)');
let excludedLinesArr:ZeroToFour[];
if(excludedLines){
    if(excludedLines === ' ') excludedLinesArr = [];
    else excludedLinesArr = excludedLines.split(',').map(value => Number(value) as ZeroToFour);
}
cout('전멸라인: ',excludedLinesArr);
cout('');
option.excludedLines = excludedLinesArr;


console.log('가용범위: ',constraintLowCount[excludedLinesArr.join('')].join('~'));
const lowCount: string = readlineSync.question('4.lowCount: (0~6)');
const lowCountNum = Number(lowCount) as ZeroToSix;
cout('저값 개수: ', lowCountNum);
cout('');
option.lowCount = lowCountNum;
////////////////////////
const constraintConstant = lowCount.toString() + excludedLinesArr.join('');
const sum: string = readlineSync.question(`5.sumRange: ${constraintSum[constraintConstant].join('~')} / (21~255)`);
let range = sum.split(',').map(value => Number(value));
cout('번호합 범위: ', range);
cout('');
option.sum = { from: range[0] as LottoNumber, to: range[1] as LottoNumber };

const gen = new Generator(option);
const generate = ():void=>{
    const date1 = new Date();
    gen.generate();
    const date2 = new Date();
    console.log(Number(date2) - Number(date1),'ms');
}

gen.rangeFinder = Calculate.oddCount;
generate();
cout('필터링된 번호개수: ' ,gen.getGeneratedNumbers().length);
console.log('가용범위: ',[...gen.rangeSet].sort((a,b)=>a-b));
////////////////////////
const oddCount: string = readlineSync.question('6.oddCountRange: (0~6)');
range = oddCount.split(',').map(value => Number(value));
cout('홀수 범위: ', range);
cout('');
option.oddCount = { from: range[0] as ZeroToSix, to: range[1] as ZeroToSix };

gen.rangeFinder = Calculate.primeCount;
generate();
cout('필터링된 번호개수: ' ,gen.getGeneratedNumbers().length);
console.log('가용범위: ',[...gen.rangeSet].sort((a,b)=>a-b));
////////////////////////
const primeCount: string = readlineSync.question('7.primeCountRange: (0~6)');
range = primeCount.split(',').map(value => Number(value));
cout('소수 범위: ', range);
cout('');
option.primeCount = { from: range[0] as ZeroToSix, to: range[1] as ZeroToSix };

gen.rangeFinder = Calculate.$3Count;
generate();
cout('필터링된 번호개수: ' ,gen.getGeneratedNumbers().length);
console.log('가용범위: ',[...gen.rangeSet].sort((a,b)=>a-b));
////////////////////////
const $3Count: string = readlineSync.question('8.$3CountRange: (0~6)');
range = $3Count.split(',').map(value => Number(value));
cout('3배수 범위: ', range);
cout('');
option.$3Count = { from: range[0] as ZeroToSix, to: range[1] as ZeroToSix };

gen.rangeFinder = Calculate.sum$10;
generate();
cout('필터링된 번호개수: ' ,gen.getGeneratedNumbers().length);
let capableRange = [...gen.rangeSet].sort((a,b)=>a-b);
console.log('가용범위: ',capableRange);
////////////////////////
const sum$10: string = readlineSync.question(`9.sum$10Range: / (0~24)`);
range = sum$10.split(',').map(value => Number(value));
cout('십의자리 합 범위: ', range);
cout('');
option.sum$10 = { from: range[0] as LottoNumber, to: range[1] as LottoNumber };


gen.rangeFinder = Calculate.diffMaxMin;
generate();
cout('필터링된 번호개수: ' ,gen.getGeneratedNumbers().length);
capableRange = [...gen.rangeSet].sort((a,b)=>a-b);
console.log('가용범위: ',capableRange);
////////////////////////
const diffMaxMin: string = readlineSync.question(`10.difference between Max and Min: (5~44)`);
range = diffMaxMin.split(',').map(value => Number(value));
cout('고저차범위: ', range);
cout('');
option.diffMaxMin = { from: range[0] as ZeroToSix, to: range[1] as ZeroToSix };

gen.rangeFinder = Calculate.AC;
generate();
cout('필터링된 번호개수: ' ,gen.getGeneratedNumbers().length);
capableRange = [...gen.rangeSet].sort((a,b)=>a-b);
console.log('가용범위: ',capableRange);
////////////////////////
const AC: string = readlineSync.question(`11.AC: (0~10)`);
range = AC.split(',').map(value => Number(value));
cout('AC 범위: ', range);
cout('');
option.AC = { from: range[0] as ZeroToSix, to: range[1] as ZeroToSix };

generate();
cout('필터링된 번호개수: ' ,gen.getGeneratedNumbers().length);
////////////////////////
const consecutiveExclude: string = readlineSync.question(`12.consecutiveExclude: (y/n)`);
if(consecutiveExclude === 'y'){
    option.consecutiveExclude = true;
}else{
    option.consecutiveExclude = false;
}
cout('연속번호 제외여부: ', consecutiveExclude);
cout('');

generate();
console.log(gen.getGeneratedNumbers());
console.log(gen.getGeneratedNumbers().length);
////////////////////////