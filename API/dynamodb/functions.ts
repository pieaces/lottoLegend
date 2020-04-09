import DynamoDB, { ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';
const dynamoDB = new DynamoDB({ region: 'ap-northeast-2' });

export enum SelectTool {
    "free" = 'a',
    "charge" = 'b'
}
export enum SelectMethod {
    'auto' = 'a',
    'manual' = 'm'
}
export enum Plan {
    "default" = "a",
    "basic" = "b",
    "premium" = "c",
    "premium+" = "d"
}
const FREE = 5;
function planValue(param: { plan?: Plan, _until?: string }) {
    const now = Number(new Date());
    if (!param.plan || !param._until) return false;
    const until = Number(new Date(param._until));
    if (now <= until) {
        switch (param.plan) {
            case Plan.basic:
            case Plan.premium:
            case Plan['premium+']:
                return true;
            default: return false;
        }
    }
}

export function scanUsers(round: number): Promise<{phone:string, numbers:number[][]}[]> {
    const params: ScanInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Plan": 'Plan',
            "#Until": 'Until',
            "#Round": round.toString()
        },
        ProjectionExpression: '#Plan, #Until, Phone, Numbers.#Round'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);
            const result = data.Items.filter(item => planValue({ plan: item.Plan && item.Plan.S as Plan, _until: item.Until && item.Until.S }))
                .map(item => {
                    return {
                        phone: item.Phone.S,
                        numbers: item.Numbers && item.Numbers.M[round].L.filter(item => item.M.tool.S === SelectTool.charge && item.M.method.S === SelectMethod.auto)
                            .map(item => (item.M.numbers.NS).map(num => Number(num)).sort((a,b) => a-b))
                    }
                }).filter(item => item.numbers && item.numbers.length > 0);
            resolve(result);
        });
    });
}