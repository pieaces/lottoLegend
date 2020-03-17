import { PutItemInput } from "aws-sdk/clients/dynamodb";
import dynamoDB from ".";
import { AWSError } from "aws-sdk";

export default function createUser(userName: string): Promise<void> {
    const params: PutItemInput = {
        TableName: 'LottoUsers',
        Item: {
            UserName: {
                S: userName
            },
            IncludeExclude: {
                M: {}
            },
            Numbers: {
                M: {}
            },
            Plan: {
                S: 'a'
            },
            Point: {
                N: '0'
            },
            Rank: {
                N: '5'
            }
        },
        ConditionExpression: "attribute_not_exists(UserName)"
    };
    return new Promise((resolve, reject) => {
        dynamoDB.putItem(params, function (err:AWSError) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}