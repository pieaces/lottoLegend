import AWS from 'aws-sdk';
import { Assembly, ProcessedData, Method2 } from '../LottoProcessor'

AWS.config.update(require('../key.json'));
const dynamoDB = new AWS.DynamoDB();

export async function writeLottoStat1(data: ProcessedData, name: string): Promise<void> {
    var params = {
        Item: {
            "Name": {
                S: name
            },
            "Ideal": dynamoDBJson(data.ideal),
            "Actual": dynamoDBJson(data.actual),
            "Coef": dynamoDBJson(data.coef),
        },
        TableName: "LottoStat"
    };

    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log('success');
        }
    });
}

export async function writeLottoStat2(data: ProcessedData, name: Method2): Promise<void> {
    var params = {
        Item: {
            "Name": {
                S: name
            },
        },
        TableName: "LottoStat"
    };

    let list;
    switch(name){
        case Method2.frequency:
            break;
    }
    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log('success');
        }
    });
}

function dynamoDBJson(data: Assembly | number[]) {
    if ("$12" in data) {
        return {
            M: {
                "$12": {
                    "L": data.$12.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "$24": {
                    "L": data.$24.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "$48": {
                    "L": data.$48.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "$192": {
                    "L": data.$192.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "All": {
                    "L": data.all.map(item => {
                        return { "N": item.toString() };
                    })
                },
                "Latest": {
                    "L": data.latest.map(item => {
                        return { "N": item.toString() };
                    })
                }
            }
        }
    } else{
        return {
            L: data.map(item => {
                return { "N": item.toString() };
            })
        }
    }
}