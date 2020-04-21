import { AWSError } from 'aws-sdk/lib/error';
import { GetItemOutput, GetItemInput, UpdateItemInput, ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { dynamoDB } from '.';

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

function getPlanName(plan:Plan){
    switch(plan){
        case Plan.default: return '없음';
        case Plan.basic: return '기본';
        case Plan.premium: return '프리미엄';
        case Plan["premium+"]: return '프리미엄+';
    }
}
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

export function makeDay(userName: string, day:0|1|2|3|4|5|6): Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Day': 'Day'
        },
        ExpressionAttributeValues: {
            ':day': {
                N:  day.toString()
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Day = :day`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export type PayMethod = 'bank' | 'card';
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
            //await makeMessage(userName, `${getPlanName(plan)} ${month}개월 가입이 성공적으로 완료되었습니다.\n이제 해당기간동안 베르누이 분석툴을 마음껏 사용하실 수 있으며,\n매주 베르누이 분석 20조합을 받아보실 수 있습니다.\n모든 조합리스트는 마이페이지에서 확인하실 수 있습니다.`);
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
            if ('PaymentBank' in data.Item) {
                const paymentBank = data.Item.PaymentBank.M;
                const now = new Date();
                const dueDate = new Date(paymentBank.date.S);
                dueDate.setDate(dueDate.getDate()+3);
                if (Number(now) < Number(dueDate)) {
                    resolve({
                        bank: paymentBank.bank.S,
                        person: paymentBank.person.S,
                        date: paymentBank.date.S,
                        month: paymentBank.month.N,
                        plan: getPlanName(paymentBank.plan.S as Plan),
                        price: paymentBank.price.N
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

export async function scanUsersForAdmin(): Promise<any> {
    const params:ScanInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames:{
            '#Rank': 'Rank',
            '#Plan': 'Plan',
            '#Until': 'Until'
        },
        ProjectionExpression: 'UserName, Point, #Rank, PaymentBank, #Plan, #Until'
    };
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err:AWSError, data: ScanOutput) => {
            if (err) reject(err);
            const users = data.Items.filter(item => item.PaymentBank).map(item => {
                return {
                    userName: item.UserName.S,
                    rank: item.Rank.N,
                    point: item.Point.N,
                    plan: item.Plan.S,
                    until: item.Until && item.Until.S,
                    paymentBank: item.PaymentBank && {
                        bank: item.PaymentBank.M.bank.S,
                        person: item.PaymentBank.M.person.S,
                        date: item.PaymentBank.M.date.S,
                        month: item.PaymentBank.M.month.N,
                        plan: item.PaymentBank.M.plan.S,
                        price: item.PaymentBank.M.price.N
                    }
                }
            }).sort((a,b) => a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0);
            resolve({
                users, count:data.Count
            });
        });
    });
}