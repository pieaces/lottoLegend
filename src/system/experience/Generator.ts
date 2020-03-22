import Swal from "sweetalert2";

interface GeneratorOption {
    excludedLines?: number[];
    excludedNumbers?: number[];
    includedNumbers?: number[];
    lowCount?: number;
    sum?: Range;
    oddCount?: Range;
    primeCount?: Range;
    $3Count?: Range;
    sum$10?: Range;
    diffMaxMin?: Range;
    AC?: Range;
    consecutiveExist?: boolean;

    excludedLineCount?: number;
    carryCount?: number;
}

export default class Generator {
    option: GeneratorOption = {};

    async generate() {
        const option = JSON.parse(JSON.stringify(this.option));
        delete option.excludedLineCount;
        delete option.carryCount;
        Swal.fire({
            title: '체험종료',
            icon: 'info',
            footer: '결제페이지로 이동'
        }).then(() => {
            location.href = '/main.html';
        });
    }
}