import DynamoDB = require('aws-sdk/clients/dynamodb');
import { SelectMethod, SelectTool } from '.';

export function numbersToAWSList(numbers: number[]): DynamoDB.ListAttributeValue {
    return numbers.map(num => {
        return {
            N: num.toString()
        }
    });
}
export function AWSListToNumbers(list:DynamoDB.ListAttributeValue): number[]{
    return list.map(item => Number(item.N));
}

export function numsArrToAWSMapList(numsArr: number[][], method: SelectMethod, tool: SelectTool) {
    return numsArr.map(nums => {
        return {
            M: {
                method: { S: method },
                tool: { S: tool },
                numbers: { L: numbersToAWSList(nums) },
                date: { S: new Date().toISOString() }
            }
        }
    })
}