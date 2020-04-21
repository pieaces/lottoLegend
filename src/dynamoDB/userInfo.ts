import { dynamoDB } from '.'
import { ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';
import { SelectTool } from './updateNumbers';

export enum Plan {
    "default" = "a",
    "basic" = "b",
    "premium" = "c",
    "premium+" = "d"
}

const FREE = 5;
function planValue(param:{plan?: Plan, _until?: string}) {
    const now = Number(new Date());
    if(!param.plan || !param._until) return 5;
    const until = Number(new Date(param._until));
    if (now <= until) {
        switch (param.plan) {
            case Plan.basic:
                return 10;
            case Plan.premium:
                return 10;
            case Plan['premium+']:
                return 20;
            default: return FREE;
        }
    }
}
export function scanUsers(day?:number): Promise<{ userName: string, value: number, tool:SelectTool }[]> {
    let ProjectionExpression = '#UserName, #Plan, #Until';
    let ExpressionAttributeNames = {
        "#UserName": 'UserName',
        "#Plan": 'Plan',
        "#Until": 'Until'
    }
    if(day) {
        ProjectionExpression += ', #Day';
        ExpressionAttributeNames['#Day'] = 'Day';
    }
    const params: ScanInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames,
        ProjectionExpression
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);
            const result = data.Items
            .filter(item => {
                if(!day) return true;
                else{
                    if(item.Day && day === Number(item.Day.N)) return true;
                    else if((!item.Day || Number(item.Day.N) === -1) && day === 0) return true;
                    else return false;
                }
            })
                .map(item => {
                    const value = planValue({plan: item.Plan && item.Plan.S as Plan, _until: item.Until && item.Until.S});
                    return {
                        userName: item.UserName.S,
                        value,
                        tool: value === FREE ? SelectTool.free : SelectTool.charge
                    }
                });
            resolve(result);
        });
    });
}

export function getUsersCount(): Promise<number> {
    const params: ScanInput = {
        TableName: 'LottoUsers'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);
            resolve(data.Count);
        });
    });
}
