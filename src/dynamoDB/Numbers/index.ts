import { PutItemInput, DeleteItemInput, ScanInput, ScanOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk";
import { dynamoDB } from "..";

export function putNumbers(index: number, numbers: number[]): Promise<void> {
    const params: PutItemInput = {
        TableName: 'LottoNumbers',
        Item: {
            Index: {
                N: index.toString()
            },
            Numbers: {
                NS: numbers.map(num => num.toString())
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.putItem(params, (err: AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function deleteNumbers(index: number): Promise<void> {
    const params: DeleteItemInput = {
        TableName: 'LottoNumbers',
        Key: {
            Index: {
                N: index.toString()
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.deleteItem(params, (err: AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function getNumbersCount(): Promise<number> {
    const params: ScanInput = {
        TableName: 'LottoNumbers'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);
            resolve(data.Count);
        });
    });
}
export function scanNumbers(): Promise<{ numbersList: number[][], count: number }> {
    const params: ScanInput = {
        TableName: 'LottoNumbers'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);
            resolve({
                numbersList: data.Items.sort((a, b) => Number(b.Index.N) - Number(a.Index.N)).map(item => item.Numbers.NS.map(num => Number(num))),
                count: data.Count
            });
        });
    });
}
