import AWS from 'aws-sdk';
AWS.config.update({region:'ap-northeast-2'})
const dynamoDB = new AWS.DynamoDB();

export default dynamoDB;