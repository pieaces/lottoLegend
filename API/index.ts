import verify from "./auth";
import { getCurrentRound, scanLotto, getLotto } from "./funtions";
import { updateNumbers, getNumbers, deleteMyNumber, getIncOrExcNumbers, updateIncOrExcNumbers, IncOrExc, getIncOrExcRounds } from './dynamoDB/Numbers'
import { queryLottoData } from "./dynamoDB/lottoData";
import { freeGenerator, numbersToData } from "./dynamoDB/generator";

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
exports.handler = async (event: any) => {
    console.log(event);
    const method: string = event.httpMethod;
    const resource: string = event.resource;
    let logedIn: boolean = false;

    let currentId: string, currentName: string;
    if (event.headers['x-id-token']) {
        try {
            const userInfo = verify(event.headers['x-id-token']);
            logedIn = true;
            currentId = userInfo["cognito:username"];
            currentName = userInfo.nickname;
        } catch (err) {
            console.log('Intruder Alert! - Expired Token', err);
            const response = {
                statusCode: 400,
                headers,
            };
            return response;
        }
    }

    let statusCode: number = 200;
    let body: any;
    switch (resource) {
        case '/numbers/mass': {
            if (logedIn) {
                switch (method) {
                    case 'GET': {
                        const round = event.queryStringParameters.round;
                        const tool = event.queryStringParameters.tool;
                        const selectMethod = event.queryStringParameters.method;
                        const numbersData = await getNumbers(currentId, round, {method: selectMethod, tool});
                        const lottoData = await scanLotto();
                        body = numbersData.map(async (data, index) => {
                            const result:any = numbersToData(data.numbers, lottoData);
                            result.method = numbersData[index].method;
                            result.tool = numbersData[index].tool;
                            result.date = numbersData[index].date;
                            if(numbersData[index].win) result.win = numbersData[index].win;
                            return result;
                        });
                    }
                        break;
                    case 'POST':
                        const { numsArr, tool } = JSON.parse(event.body);
                        body = await updateNumbers(currentId, getCurrentRound(), numsArr, tool);
                        break;
                    case 'DELETE':
                        const { numbers } = JSON.parse(event.body);
                        await deleteMyNumber(currentId, getCurrentRound(), numbers);
                        break;
                }
            } else {
                statusCode = 400;
                body = "로그인되지 않은 사용자입니다."
            }
        }
            break;
        case '/numbers/piece': {
            switch (method) {
                case 'GET': {
                    const userName = event.queryStringParameters && event.queryStringParameters.userName || currentId;
                    const round = event.queryStringParameters && event.queryStringParameters.round || getCurrentRound();
                    const choice = event.queryStringParameters && event.queryStringParameters.choice;
                    if (choice) {
                        const numbers = await getIncOrExcNumbers(userName, round, choice);
                        body = {numbers};
                        if(!event.queryStringParameters.round){
                            const rounds = await getIncOrExcRounds(userName, choice);
                            body.rounds = rounds;
                        }
                        if(round !== getCurrentRound()){
                            body.answer = await getLotto(round);
                        }
                    } else {
                        const include = await getIncOrExcNumbers(userName, round, IncOrExc.include);
                        const exclude = await getIncOrExcNumbers(userName, round, IncOrExc.exclude);
                        body = { include, exclude, total:round };
                    }
                }
                    break;
                case 'POST':
                    if (logedIn) {
                        const { numbers, choice } = JSON.parse(event.body);
                        await updateIncOrExcNumbers(currentId, getCurrentRound(), numbers.sort((a: number, b: number) => a - b), choice);
                        break;
                    } else {
                        statusCode = 400;
                        body = "로그인되지 않은 사용자입니다."
                    }
                    break;
            }
        }
            break;
        case '/numbers/win': {
            const round = event.queryStringParameters && event.queryStringParameters.round || getCurrentRound();
            switch (method) {
                case 'GET':
                    body = await queryLottoData(round);
            }
        }
            break;
        case '/numbers/generator/free': {
            switch (method) {
                case 'GET':
                    const lineCount = event.queryStringParameters && JSON.parse(event.queryStringParameters.lineCount);
                    body = await freeGenerator(currentId, lineCount);
            }
        }
            break;
    }
    const response = {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
    return response;
};