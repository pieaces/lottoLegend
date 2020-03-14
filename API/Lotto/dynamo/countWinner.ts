import dynamoDB from '.'
import { UpdateItemInput, GetItemInput, ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';

function scanUsers(round: number) {
    const params: ScanInput = {
        TableName: 'LottoUsers',
        ExpressionAttributeNames: {
            '#Round': round.toString()
        },
        ProjectionExpression: 'Numbers.#Round'
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err: AWSError, data: ScanOutput) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}