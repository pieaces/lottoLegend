import dynamoDB from '.'
import { AWSError } from 'aws-sdk/lib/error';
import { GetItemOutput, GetItemInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb';
import { parsePlanKeyAndUntil, getCurrentRound, getPlanName } from '../funtions';
import { NSToNumbers } from './Numbers/functions';
import { MyNumberData } from './Numbers';

export enum Plan {
    "default" = "a",
    "basic" = "b",
    "premium" = "c",
    "premium+" = "d"
}
const ExpressionAttributeNames = {
    "#Plan": 'Plan',
    '#Until': 'Until'
};

export function getPlan(userName: string): Promise<Plan> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ProjectionExpression: '#Plan, #Until',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            else {
                const item = data.Item;
                let plan: Plan = Plan.default;
                if ('Plan' in item && 'Until' in item) {
                    const _plan = item.Plan.S;
                    const now = Number(new Date());
                    const until = Number(new Date(item.Until.S));
                    if (now <= until) {
                        switch (_plan) {
                            case Plan.basic:
                                plan = Plan.basic;
                                //availability = planValues[Plan.basic];
                                break;
                            case Plan.premium:
                                plan = Plan.premium;
                                //availability = planValues[Plan.premium];
                                break;
                            case Plan['premium+']:
                                plan = Plan['premium+']
                        }
                    }
                }
                resolve(plan);
            }
        });
    });
}

export function getPlanKeyAndUntil(userName: string): Promise<{ plan: string, until?: string }> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ProjectionExpression: '#Plan, #Until',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(parsePlanKeyAndUntil(data.Item));
            }
        });
    });
}
export function makeMessage(userName: string, message:string): Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeValues: {
            ':message': {
                S: message
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET Message = :message`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}
export function deleteMessage(userName: string): Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `Remove Message`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}
export function getMessage(userName: string): Promise<string> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Message': 'Message',
        },
        ProjectionExpression: '#Message',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            if('Message' in data.Item) resolve(data.Item.Message.S);
            else resolve();
        });
    });
}
type PayMethod = 'bank' | 'card';
export function makePlan(userName: string, plan: Plan, month: number, price:number, method:PayMethod): Promise<void> {
    const time = new Date();
    time.setMonth(time.getMonth() + month);
    const until = time.toISOString();

    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ExpressionAttributeValues: {
            ':value': {
                S: plan
            },
            ':until': {
                S: until
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Plan = :value, #Until = :until`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err: AWSError) => {
            if (err) reject(err);
            await makeMessage(userName, `${getPlanName(plan)} ${month}개월 가입이 성공적으로 완료되었습니다.\n이제 해당기간동안 베르누이 분석툴을 마음껏 사용하실 수 있으며,\n매주 베르누이 분석 20조합을 받아보실 수 있습니다.\n모든 조합리스트는 마이페이지에서 확인하실 수 있습니다.`);
            await makePayment(userName, plan, month, price, method);
            resolve();
        });
    });
}
export function makePayment(userName: string, plan: Plan, month: number, price:number, method:PayMethod):Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeValues: {
            ':empty_list': {
                L: new Array()
            },
            ":element": {
                L: [
                    {
                        M: {
                            plan: {
                                S: plan
                            },
                            month: {
                                N: month.toString()
                            },
                            price: {
                                N: price.toString()
                            },
                            date: {
                                S: new Date().toISOString()
                            },
                            method: {
                                S: method
                            }
                        }
                    }
                ]
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET Payment = list_append(if_not_exists(Payment, :empty_list), :element)`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err: AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}
export function makePaymentByBankBook(userName: string, bank:string, person:string, plan: Plan, month: number, price: number):Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        Key: {
            "UserName": {
                S: userName
            }
        },
        ExpressionAttributeValues: {
            ':payment': {
                M: {
                    bank: {
                        S: bank
                    },
                    person: {
                        S: person
                    },
                    plan: {
                        S: plan
                    },
                    month: {
                        N: month.toString()
                    },
                    price: {
                        N: price.toString()
                    },
                    date: {
                        S: new Date().toISOString()
                    }
                }
            }
        },
        UpdateExpression: 'SET PaymentBank = :payment'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
function getMethodName(method:PayMethod){
    return method === 'card' ? '카드결제' : '무통장입금'
}
export function getPayments(userName: string):Promise<any> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        Key: {
            "UserName": {
                S: userName
            }
        },
        ProjectionExpression: 'Payment',
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, async (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            if('Payment' in data.Item){
                resolve(data.Item.Payment.L.map(item => {
                    return{
                        date: item.M.date.S,
                        month: Number(item.M.month.N),
                        method: getMethodName(item.M.method.S as PayMethod),
                        plan: getPlanName(item.M.plan.S as Plan),
                        price: Number(item.M.price.N)
                    }
                }).reverse());
            }else resolve();
        });
    });
}
export function getPaymentByBankBook(userName: string) {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        Key: {
            "UserName": {
                S: userName
            }
        },
        ProjectionExpression: 'PaymentBank',
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, async (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            if ('Payment' in data.Item) {
                const payment = data.Item.Payment.M;
                const now = new Date();
                const dueDate = new Date(payment.date.S);
                dueDate.setDate(dueDate.getDate()+3);
                if (Number(now) < Number(dueDate)) {
                    resolve({
                        bank: payment.bank.S,
                        person: payment.person.S,
                        date: payment.date.S,
                        month: payment.month.N,
                        plan: getPlanName(payment.plan.S as Plan),
                        price: payment.price.N
                    });
                }else {
                    await deletePaymentBank(userName);
                    resolve();
                }
            } else resolve();
        });
    });
}
export function deletePaymentBank(userName: string) {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression:'Remove PaymentBank'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

export function expirePlan(userName: string): Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ExpressionAttributeValues: {
            ':value': {
                S: Plan.default
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Plan = :value Remove #Until`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function getPointAndRank(userName: string): Promise<{ point: number, rank: number }> {
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Rank': 'Rank'
        },
        ProjectionExpression: 'Point, #Rank',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };
    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            resolve({ point: Number(data.Item.Point.N), rank: Number(data.Item.Rank.N) })
        });
    });
}

interface MyPage {
    include?: { current?: number[], before?: number[] },
    exclude?: { current?: number[], before?: number[] },
    numsArr?: MyNumberData[],
    beforeNumbers?: MyNumberData[],
    point?: number,
    rank?: number,
    plan?: string,
    until?: string,
    winner?: number,
    total?: number
}
export function getMyHome(userName: string): Promise<MyPage> {
    const round = getCurrentRound() + 1;
    const params: GetItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Numbers": 'Numbers',
            "#IncExc": 'IncludeExclude',
            "#Current": round.toString(),
            "#Before": (round - 1).toString(),
            "#Plan": "Plan",
            "#Until": "Until",
            "#Point": "Point",
            "#Rank": "Rank"
        },
        ProjectionExpression: '#Numbers.#Current, #Numbers.#Before, #IncExc.#Current, #IncExc.#Before, #Plan, #Until, #Point, #Rank',
        Key: {
            "UserName": {
                S: userName
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            else {
                const result: MyPage = {};

                const beforeNumbers = data.Item.Numbers && data.Item.Numbers.M[round-1] && data.Item.Numbers.M[round-1].L;
                const numbersData = data.Item.Numbers && data.Item.Numbers.M[round] && data.Item.Numbers.M[round].L;
                result.beforeNumbers = beforeNumbers && beforeNumbers.map(item => {
                    return {
                        numbers: NSToNumbers(item.M.numbers.NS).sort((a, b) => a - b),
                        date: item.M.date.S,
                        method: item.M.method.S,
                        tool: item.M.tool.S,
                    }
                });
                result.numsArr = numbersData && numbersData.map(item => {
                    return {
                        numbers: NSToNumbers(item.M.numbers.NS).sort((a, b) => a - b),
                        date: item.M.date.S,
                        method: item.M.method.S,
                        tool: item.M.tool.S,
                    }
                });

                if ('IncludeExclude' in data.Item) {
                    const include: { current?: number[], before?: number[] } = {};
                    const exclude: { current?: number[], before?: number[] } = {};

                    if (data.Item.IncludeExclude.M[round]) {
                        const current = data.Item.IncludeExclude.M[round].M;
                        if (current) {
                            include.current = current.include && current.include.NS.map(item => Number(item)).sort((a,b)=>a-b);
                            exclude.current = current.exclude && current.exclude.NS.map(item => Number(item)).sort((a,b)=>a-b);
                        }
                    }
                    if (data.Item.IncludeExclude.M[round - 1]) {
                        const before = data.Item.IncludeExclude.M[round - 1].M;
                        if (before) {
                            include.before = before.include && before.include.NS.map(item => Number(item)).sort((a,b)=>a-b);
                            exclude.before = before.exclude && before.exclude.NS.map(item => Number(item)).sort((a,b)=>a-b);
                        }
                    }
                    result.include = include;
                    result.exclude = exclude;
                }
                const { plan, until } = parsePlanKeyAndUntil(data.Item);
                result.plan = plan;
                result.until = until;
                result.point = Number(data.Item.Point.N);
                result.rank = Number(data.Item.Rank.N);
                result.total = round;
                resolve(result);
            }
        });
    });
}