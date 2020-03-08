import { postAuthAPI } from "../../amplify/api";

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
      
        const data = await postAuthAPI('/numbers/generator/premium', {option})
        console.log(data);
        return data;
    }
}