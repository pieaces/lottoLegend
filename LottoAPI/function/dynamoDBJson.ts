import { Assembly, LottoDate } from '../class/LottoData'
import { Stats } from '../class/Statistics';

export type dynamoData = Assembly | number[] | Stats | number[][] | boolean[][] | LottoDate[];
export default function dynamoDBJson(data: dynamoData, option: any = null) {
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
    } else if ('mean' in data) {
        return {
            M: {
                'mean': {
                    N: data.mean.toString()
                },
                'stdev': {
                    N: data.stdev.toString()
                },
                'max': {
                    N: data.max.toString()
                },
                'min': {
                    N: data.min.toString()
                }
            }
        }
    } else if (typeof data[0] === 'number') {
        return {
            L: (<number[]>data).map(item => {
                return { "N": item.toString() };
            })
        }
    } else {
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
            (<number[][]>data).forEach((numbers: number[], index) => {
                list.push({
                    M: {
                        'list': {
                            L: numbers.map(num => { return { N: num.toString() } })
                        },
                        'stats': {
                            M: {
                                'mean': {
                                    N: option[index].mean.toString()
                                },
                                'stdev': {
                                    N: option[index].stdev.toString()
                                },
                                'max': {
                                    N: option[index].max.toString()
                                },
                                'min': {
                                    N: option[index].min.toString()
                                }
                            }
                        }
                    }
                });
            });
        }
        else {
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
}