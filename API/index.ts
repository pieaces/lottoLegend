import putPhone from "./dynamo/putPhone";

exports.handler = async (event:any, context:any, callback:any) => {
    // Send post authentication data to Cloudwatch logs
    console.log ("Authentication successful", event);
    return new Error('error!!!!');
    //await putPhone();
    // Return to Amazon Cognito
    callback(null, event);
};