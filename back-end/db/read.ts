import AWS from 'aws-sdk';

AWS.config.update(require('./key.json'));
const dynamoDb = new AWS.DynamoDB();

async function readLottoData() {
    var params = {
        TableName: "LottoData"
    };
    return await new Promise((resolve, reject) => {
        dynamoDb.scan(params, (error, data) => {
            if (error) {
                console.log(error, error.stack); // an error occurred
                reject(error);
            }
            else {
                const item = data.Items;
                const lottoData = item.map(item => {
                    return {
                        round: Number(item.Round.N),
                        date: item.LDate.S,
                        bonusNum: Number(item.BonusNum.N),
                        numbers: item.Numbers.NS.map(value => Number(value)).sort((a, b) => a - b)
                    };
                });
                resolve(lottoData.sort((a, b) => a.round - b.round));
            }
        });
    });
}

/*
    ExpressionAttributeNames: {
        "#R": "Round",
        "#D": "LDate",
        "#BN": "BonusNum",
        "#NS": "Numbers"
    },

    ProjectionExpression: "#R, #D, #BN, #NS",

    ExpressionAttributeValues: {
        ":n": {
            N: "891"
        }
    },
    FilterExpression: "round = :n",

    ExpressionAttributeValues: {
        ':s': {N: '2'},
        ':e' : {N: '09'},
        ':topic' : {S: 'PHRASE'}
    },
    ProjectionExpression: 'Episode, Title, Subtitle',
    FilterExpression: 'contains (Subtitle, :topic)',
*/