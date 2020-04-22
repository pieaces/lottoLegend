import { dynamoDB } from '.'
import { ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';
import { SelectTool } from './updateNumbers';
import { getCurrentRound } from '../funtions';
import { Plan, PlanValue } from './payment';

function planValue(param:{plan?: Plan, until?: string}) {
    const now = Number(new Date());
    if(!param.plan || !param.until) return PlanValue.default;
    const until = Number(new Date(param.until));
    if (now <= until) {
        switch (param.plan) {
            case Plan.basic:
                return PlanValue.basic;
            case Plan.premium:
                return PlanValue.premium;
            case Plan['premium+']:
                return PlanValue["premium+"];
            default: return PlanValue.default;
        }
    }
}
function isDefault(user:{plan?:Plan, until?:string}){
    return (PlanValue.default === planValue({ plan: user.plan, until: user.until }));
}

export function scanUsers(day?:number): Promise<{ userName: string, value: number, tool:SelectTool }[]> {
    let ProjectionExpression = '#UserName, #Plan, #Until, #Numbers.#Round';
    const round = (getCurrentRound()+1).toString();
    let ExpressionAttributeNames = {
        "#UserName": 'UserName',
        "#Plan": 'Plan',
        "#Until": 'Until',
        "#Numbers": 'Numbers',
        "#Round": round
    }
    if(typeof day === 'number') {
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
                if(typeof day !== 'number') return true;
                else{
                    if(item.Numbers && item.Numbers.M[round].L.some(list => list.M.method.S === 'a')) return false;
                    if(item.Day && day === Number(item.Day.N) && !isDefault({ plan: item.Plan && item.Plan.S as Plan, until: item.Until && item.Until.S })) return true;
                    else if ((!item.Day || Number(item.Day.N) === -1 || isDefault({ plan: item.Plan && item.Plan.S as Plan, until: item.Until && item.Until.S })) && day === 0) return true;
                    else return false;
                }
            }).map(item => {
                    const value = planValue({plan: item.Plan && item.Plan.S as Plan, until: item.Until && item.Until.S});
                    return {
                        userName: item.UserName.S,
                        value,
                        tool: value === PlanValue.default ? SelectTool.free : SelectTool.charge
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
