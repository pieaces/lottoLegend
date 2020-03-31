import axios from "axios";
import cheerio from "cheerio";
import { UpdateItemInput } from "aws-sdk/clients/dynamodb";
import dynamoDB from ".";
import { getCurrentRound } from "./functions";

async function getLottoInfoHtml(round: number) {
    return await axios.get("https://dhlottery.co.kr/gameResult.do?method=byWin&drwNo=" + round);
};

async function getLottoInfo(round:number) {
    return await getLottoInfoHtml(round)
        .then(html => {
            let list:number[] = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("div#article tbody tr").children('td');

            $bodyList.each(function (i) {
                list[i] = Number($(this).text().replace(/[^0-9]/g, ''));
            });

            return [[list[2], list[3]], [list[8], list[9]], [list[13], list[14]], [list[18], list[19]], [list[23], list[24]]];
        });
}

export default async function autoPutInfo() {
    const round = getCurrentRound();
    const info = await getLottoInfo(round);
    if (info[0][0] !== 0) {
        const params: UpdateItemInput = {
            TableName: 'LottoData',
            Key: {
                'Round': {
                    N: round.toString()
                }
            },
            ExpressionAttributeValues: {
                ':info': {
                    M: {
                        first: {
                            M: {
                                winner: {
                                    N: info[0][0].toString()
                                },
                                winAmount: {
                                    N: info[0][1].toString()
                                }
                            }
                        },
                        second: {
                            M: {
                                winner: {
                                    N: info[1][0].toString()
                                },
                                winAmount: {
                                    N: info[1][1].toString()
                                }
                            }
                        },
                        third: {
                            M: {
                                winner: {
                                    N: info[2][0].toString()
                                },
                                winAmount: {
                                    N: info[2][1].toString()
                                }
                            }
                        },
                        fourth: {
                            M: {
                                winner: {
                                    N: info[3][0].toString()
                                },
                                winAmount: {
                                    N: info[3][1].toString()
                                }
                            }
                        },
                        fifth: {
                            M: {
                                winner: {
                                    N: info[4][0].toString()
                                },
                                winAmount: {
                                    N: info[4][1].toString()
                                }
                            }
                        },
                    }
                }
            },
            UpdateExpression: `SET Info = :info`
        };
        return new Promise((resolve, reject) => {
            dynamoDB.updateItem(params, function (err) {
                if (err) {
                    reject(err);
                }
                console.log('autoPutInfo 완료');
                resolve();
            });
        });
    }else{
        console.log('autoPutInfo - 동행복권 API 준비중')
    }
}