import AWS from 'aws-sdk'

import key from './key'
AWS.config.update(key);

const dynamoDB = new AWS.DynamoDB();
const TableName = "LottoUsers";

export {dynamoDB, TableName};