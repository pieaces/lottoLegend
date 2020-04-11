import DynamoDB from 'aws-sdk/clients/dynamodb';
const dynamoDB = new DynamoDB({region:'ap-northeast-2'});

export default dynamoDB;