import AWS from 'aws-sdk'
const dynamoDB = new AWS.DynamoDB({region:'ap-northeast-2'});

export {dynamoDB};