import verify from "./auth";
import { getCurrentRound, scanLotto, getLotto, getLotto2 } from "./funtions";
import { updateNumbers, getNumbers, deleteMyNumber, updateIncOrExcNumbers, getIncOrExcRounds, getIncAndExcNumbers } from './dynamoDB/Numbers'
import { queryLottoData } from "./dynamoDB/lottoData";
import { freeGenerator, numbersToData } from "./dynamoDB/generator";
import { getPointAndRank, getPlanKeyAndUntil } from "./dynamoDB/userInfo";

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
        case '/numbers/mass':
        case '/numbers/mass/{round}': {
            if (logedIn) {
                switch (method) {
                    case 'GET': {
                        const round = event.pathParameters && event.pathParameters.round;
                        const tool = event.queryStringParameters && event.queryStringParameters.tool;
                        const selectMethod = event.queryStringParameters && event.queryStringParameters.method;
                        const numbersData = await getNumbers(currentId, round, { method: selectMethod, tool });
                        const lottoData = await scanLotto();

                        const rounds = Object.keys(numbersData);
                        const data = numbersData[rounds[rounds.length - 1]].map((data) => {
                            const result: any = numbersToData(data.numbers, lottoData);
                            result.method = data.method;
                            result.tool = data.tool;
                            result.date = data.date;
                            return result;
                        });
                        body = { data, rounds };
                        if (Number(rounds[rounds.length - 1]) <= getCurrentRound()) {
                            body.answer = await getLotto2(Number(rounds[rounds.length - 1]));
                        }
                    }
                        break;
                    case 'POST':
                        const { numsArr, tool } = JSON.parse(event.body);
                        body = await updateNumbers(currentId, getCurrentRound() + 1, numsArr, tool);
                        break;
                    case 'DELETE': {
                        const { numsArr, round } = JSON.parse(event.body);
                        await deleteMyNumber(currentId, round, numsArr);
                        break;
                    }
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
                    const flag = event.queryStringParameters && event.queryStringParameters.flag;

                    if (flag) {
                        const round = getCurrentRound() + 1;
                        body = await getIncAndExcNumbers(userName, round);
                        body.total = round;
                    } else {
                        const rounds = await getIncOrExcRounds(userName);
                        const round = Number(rounds[0]);
                        body = await getIncAndExcNumbers(userName, round);
                        body.rounds = rounds;
                        if (round <= getCurrentRound()) {
                            body.answer = await getLotto(round);
                        }
                    }
                }
                    break;
                case 'POST':
                    if (logedIn) {
                        const { numbers, choice } = JSON.parse(event.body);
                        await updateIncOrExcNumbers(currentId, getCurrentRound() + 1, numbers.sort((a: number, b: number) => a - b), choice);
                        break;
                    } else {
                        statusCode = 400;
                        body = "로그인되지 않은 사용자입니다."
                    }
                    break;
            }
        }
            break;
        case '/numbers/piece/{round}': {
            switch (method) {
                case 'GET': {
                    const userName = event.queryStringParameters && event.queryStringParameters.userName || currentId;
                    const round = Number(event.pathParameters.round);

                    body = await getIncAndExcNumbers(userName, round);
                    if (round <= getCurrentRound()) {
                        body.answer = await getLotto(round);
                    }
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
        case '/mypage': {
            switch (method) {
                case 'GET':
                    const round = getCurrentRound();
                    const lotto = await getLotto2(round);
                    const numbersData = await getNumbers(currentId, round);

                    let winner = 6;
                    numbersData[round] && numbersData[round].forEach(data => {
                        let count = 0;
                        data.numbers.forEach(num => {
                            if (lotto.numbers.some(item => item === num)) count++;
                        });
                        switch (count) {
                            case 3:
                                if (winner > 5) winner = 5;
                                break;
                            case 4:
                                if (winner > 4) winner = 4;
                                break;
                            case 5:
                                if (data.numbers.some(item => lotto.bonusNum === item)) {
                                    if (winner > 2) winner = 2;
                                }
                                else {
                                    if (winner > 3) winner = 3;
                                }
                                break;
                            case 6:
                                winner = 1;
                        }
                    });
                    const { include, exclude } = await getIncAndExcNumbers(currentId, round);
                    let includeAnswer = 0, excludeAnswer = 0;
                    include && include.forEach(num => {
                        if (lotto.numbers.some(item => item === num)) includeAnswer++
                    });
                    exclude && exclude.forEach(num => {
                        if (lotto.numbers.some(item => item === num)) excludeAnswer++
                    });
                    const {plan, until} = await getPlanKeyAndUntil(currentId);
                    const {point, rank} = await getPointAndRank(currentId);
                    body = { winner, lotto,
                        include: include && { size: include.length, answer: includeAnswer },
                        exclude: exclude && { size: exclude.length, answer: excludeAnswer },
                        plan, until, point, rank }
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