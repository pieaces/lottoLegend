import Generator from '../back-end/class/Generator/Generator'
/*
전회차 이월여부로 포함,제외
뜨거운수, 차가운수(번호간격, 최근출현) + 번호별퍼센트 로 포함,제외
전멸라인 설정으로 제외
위의 설정으로 10개 수 제외시킬 것.
*/
const date = new Date();
const gen = new Generator({
    lowCount:2,
    excludedLines:[4],
    excludeNumbers:[19,32,36,37],
    includeNumbers:[],
    sum:{from:150, to:170},
    oddCount:{from:2, to:3},
    primeCount:{from:0, to:1},
    $3Count:{from:2,to:2},
    sum$10: {from:11,to:12},
});

gen.generate();
const date2 = new Date();
console.log([...gen.rangeSet][0], [...gen.rangeSet][[...gen.rangeSet].length-1]);
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