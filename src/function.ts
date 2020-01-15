/*
1전체 2최근10회차 3최근30회차 4최근50회차
홀수짝수=1:2
번호합 = 120
십의자리 비
일의자리 비
AC 합
고저 차
고저비율
이월되는번호 = 택마다 궁합수
. 장기간 미출현번호? 택마다 궁합수 여부
. 번호 총 통계
*/

export function returnAC(numbers: number[]): number {
    const set = new Set<number>();
    numbers.reverse().forEach((bigValue, index, array) => array.slice(index + 1).forEach(smallValue => set.add(bigValue - smallValue)));
    return set.size - (numbers.length - 1);
}

function ratioOddEven(numbers: number[]): [number, number] {
    let odd = 0;
    let even = 0;

    numbers.forEach(value => {
        if(value % 2 === 1) odd++;
        else even++;
    })

    return [odd, even];
}
export function averageOddEven(numsArray: Array<Array<number>>): [number, number]{
    let odd =0;
    let even = 0;

    numsArray.forEach(numbers=>{
        const [_odd, _even] = ratioOddEven(numbers);
        odd += _odd, even += _even;
    });
    odd /=numsArray.length;
    even /= numsArray.length;
    return [odd, even];
}