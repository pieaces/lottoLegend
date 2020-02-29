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
        const body = JSON.parse(JSON.stringify(this.option));
        delete body.excludedLineCount;
        delete body.carryCount;
      
        const data = await postAuthAPI('/generator', {body})
        console.log(data);
        return data;
    }
}