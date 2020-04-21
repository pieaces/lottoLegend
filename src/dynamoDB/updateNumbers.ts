import { AWSError } from "aws-sdk";
import { UpdateItemInput, NumberSetAttributeValue } from "aws-sdk/clients/dynamodb";
import { dynamoDB } from ".";

export enum SelectTool {
    "free" = 'a',
    "charge" = 'b'
}
enum SelectMethod {
    "auto" = 'a',
    "manual" = 'm'
}
function numsArrToAWSMapList(numsArr: number[][], method: SelectMethod, tool: SelectTool) {
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
function numbersToNS(numbers: number[]): NumberSetAttributeValue {
    return numbers.map(num => num.toString());
}
export default async function updateNumbers(userName: string, tool:SelectTool, round: number, numsArr: number[][]): Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            "#Map": 'Numbers',
            "#Round": round.toString(),
        },
        ExpressionAttributeValues: {
            ":empty_list": {
                L: new Array()
            },
            ":element": {
                L: numsArrToAWSMapList(numsArr, SelectMethod.auto, tool)
            },
        },
        Key: {
            "UserName": {
                S: userName
            }
        },
        UpdateExpression: `SET #Map.#Round = list_append(if_not_exists(#Map.#Round, :empty_list), :element)`
    };
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, async (err: AWSError) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
