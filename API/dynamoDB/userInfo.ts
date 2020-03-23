import dynamoDB from ".";
import {  UpdateItemInput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

export enum Point{
    post=5,
    comment=1,
    recommend=1,
    recommended=5,
}
export function addPoint(userName:string, point:Point):Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeValues: {
            ':operand': {
                N: point.toString()
            }
        },
        Key: {
            UserName: {
                S: userName
            }
        },
        UpdateExpression: 'ADD Point :operand'
    }
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}
export function subtractPoint(userName:string, point:Point):Promise<void> {
    const params: UpdateItemInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeValues: {
            ':operand': {
                N: point.toString()
            }
        },
        Key: {
            UserName: {
                S: userName
            }
        },
        UpdateExpression: 'SET Point = Point - :operand'
    }
    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}