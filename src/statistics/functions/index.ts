export function getStaticsName(method: string) {
    let name: string;
    switch (method) {
        case 'excludedLineCount': name = '전멸구간 개수'
            break;
        case "carryCount": name = '이월 개수'
            break;
        case "lowCount": name = '저값(1~22) 개수'
            break;
        case "sum": name = '번호 합계'
            break;
        case "oddCount": name = '홀수 개수'
            break;
        case "primeCount": name = '소수 개수'
            break;
        case "$3Count": name = '3배수 개수'
            break;
        case "sum$10": name = '첫수(십의자리) 합'
            break;
        case "diffMaxMin": name = '고저차'
            break;
        case "AC": name = 'AC'
            break;
    }
    return name;
}

