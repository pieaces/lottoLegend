import { scanUsers } from "./dynamodb/functions";

exports.handler = (event: any, context: any, callback: any) => {
    
    scanUsers()
};
