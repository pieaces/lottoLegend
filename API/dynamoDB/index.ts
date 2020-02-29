import AWS from 'aws-sdk'
const dynamoDB = new AWS.DynamoDB();
const TableName = "LottoUsers";

export {dynamoDB, TableName};