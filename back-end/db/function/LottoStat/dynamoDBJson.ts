import { Assembly, LottoDate } from '../../class/LottoProcessor'

export function dynamoDBJson2(data: number[][] | boolean[][] | LottoDate[]) {
    let list: any = [];
    if ("date" in data[0]) {
        (<LottoDate[]>data).forEach((item: LottoDate) => {
            list.push({
                M: {
                    "round": {
                        N: item.round.toString()
                    },
                    "date": {
                        S: item.date
                    }
                }
            });
        });
    } else if (typeof data[0][0] === 'number') {
        (<number[][]>data).forEach((numbers: number[]) => {
            list.push({
                L: numbers.map(num => { return { N: num.toString() } })
            });
        });
    } else {
        (<boolean[][]>data).forEach((items: boolean[]) => {
            list.push({
                L: items.map(item => { return { BOOL: item } })
            });
        });
    }

    return {
        L: list
    }
}
export function dynamoDBJson(data: Assembly | number[]) {
    if ("$12" in data) {
        return {
            M: {
                "$12": {
                    "L": data.$12.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "$24": {
                    "L": data.$24.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "$48": {
                    "L": data.$48.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "$192": {
                    "L": data.$192.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "all": {
                    "L": data.all.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "latest": {
                    "L": data.latest.map(item => {
                        return { "N": item.toString() };
                    })
                }
            }
        }
    } else {
        return {
            L: data.map(item => {
                return { "N": item.toString() };
            })
        }
    }
}