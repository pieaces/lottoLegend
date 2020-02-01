import AWS from 'aws-sdk';
import LottoProcessor from './LottoProcessor' 
import {Method} from '../class/Lotto/Inter'

AWS.config.update(require('./key.json'));
const dynamodb = new AWS.DynamoDB();

async function write(): Promise<boolean> {
    var params = {
        Item: {
            "Name": {
                S: "oddCount"
            },
            "$12": {
                M: {
                    "Ex": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    },
                    "Ac": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    }
                }
            },
            "$24": {
                M: {
                    "Ex": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    },
                    "Ac": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    }
                }
            },
            "$48": {
                M: {
                    "Ex": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    },
                    "Ac": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    }
                }
            },
            "$192": {
                M: {
                    "Ex": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    },
                    "Ac": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    }
                }
            },
            "$All": {
                M: {
                    "Ex": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    },
                    "Ac": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    }
                }
            },
            "Latest": {
                M: {
                    "Ex": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    },
                    "Ac": {
                        "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
                    }
                }
            },
            "Coef": {
                "L": [{ "N": "1" }, { "N": "4" }, { "N": "3.14159" }]
            },
        },
        TableName: "LottoStat"
    };

    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log('success');           // successful response
    });
    return true;
}

write().then(data => console.log(data));