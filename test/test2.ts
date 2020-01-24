import Generator from '../back-end/class/Generator/Generator'

const date = new Date();
const gen = new Generator({exceptedLines:[2]});
/*

gen.setSum({from:140, to:160});
gen.setSum$10({from:10, to:12});
gen.setDiffMaxMin({from:32, to:37});
gen.setAC({from:5, to:5});
gen.setOddCount(3);
gen.setPrimeCount(2);
gen.set$3Count(2);
gen.setExclude([20]);
gen.setInclude([]);
*/
gen.generate();
const date2 = new Date();
console.log([...gen.numberSet][0], [...gen.numberSet][[...gen.numberSet].length-1]);
//gen.getGeneratedNumbers().forEach(value => console.log(value));
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