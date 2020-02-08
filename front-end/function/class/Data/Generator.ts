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
        const headers = {
            'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k',
            'Content-Type': 'application/json'
        };
        const clone = JSON.parse(JSON.stringify(this.option));
        delete clone.excludedLineCount;
        delete clone.carryCount;

        const url =
            'https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/numbers/generator';
        console.log(url);
        const fetchResult = await fetch(
            url, //API 주소
            {
                headers,
                method: 'POST',
                body: JSON.stringify(clone)
            }
        );

        const data = JSON.parse(await fetchResult.text());
        return data;
    }
}