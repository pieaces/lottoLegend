import DynamoDB = require('aws-sdk/clients/dynamodb');
import { SelectMethod, SelectTool } from '.';

export function numbersToNS(numbers: number[]): DynamoDB.NumberSetAttributeValue {
    return numbers.map(num => num.toString());
}
export function NSToNumbers(NS:DynamoDB.NumberSetAttributeValue): number[]{
    return NS.map(item => Number(item));
}

export function numsArrToAWSMapList(numsArr: number[][], method: SelectMethod, tool: SelectTool) {
    return numsArr.map(nums => {
        return {
            M: {
                method: { S: method },
                tool: { S: tool },
                numbers: { NS: numbersToNS(nums) },
                date: { S: new Date().toISOString() }
            }
        }
    })
}