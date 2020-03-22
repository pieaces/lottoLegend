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
        let data: any;

        if (option.consecutiveExist) {
            data = {
                count: 47,
                numbers: [[1, 2, 3, 4, 5, 6]]
            }
        } else if (option.AC) {
            data = {
                count: 66
            }
        } else if (option.diffMaxMin) {
            data = {
                count: 75
            }
        } else if (option.sum$10) {
            data = {
                count: 169
            }
        } else if (option.$3Count) {
            data = {
                count: 367
            }
        } else if (option.primeCount) {
            data = {
                count: 413
            }

        } else if (option.oddCount) {
            data = {
                count: 1432
            }
        } else if (option.sum) {
            data = {
                count: 2937
            }
        } else {
            data = {};
        }
        console.log(data);
        return data;
    }
}