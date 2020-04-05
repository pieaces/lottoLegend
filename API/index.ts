import verify from "./auth";
import { getCurrentRound, scanLotto, getLotto, getLotto2 } from "./funtions";
import { updateNumbers, getNumbers, deleteMyNumber, updateIncOrExcNumbers, getIncOrExcRounds, getIncAndExcNumbers, deleteIncOrExcNumbers, scanWeekNumbers, getIncOrExcNumbers } from './dynamoDB/Numbers'
import { queryLottoData } from "./dynamoDB/lottoData";
import { freeGenerator, numbersToData } from "./dynamoDB/generator";
import { getPointAndRank, getPlanKeyAndUntil, getMyHome, expirePlan } from "./dynamoDB/userInfo";
import { getLottoData, getWinStats } from "./dynamoDB/getMainPage";

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
exports.handler = async (event: any) => {
    if(event['detail-type'] === 'Scheduled Event'){
        return console.log('Scheduled Event');
    }    
    console.log(event);

    const method: string = event.httpMethod;
    const resource: string = event.resource;
    let logedIn: boolean = false;

    let currentId: string;
    if (event.headers['x-id-token']) {
        try {
            const userInfo = verify(event.headers['x-id-token']);
            logedIn = true;
            currentId = userInfo["cognito:username"];
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
                        const data = numbersData[rounds[rounds.length - 1]] && numbersData[rounds[rounds.length - 1]].map((data) => {
                            const result: any = numbersToData(data.numbers, lottoData);
                            result.method = data.method;
                            result.tool = data.tool;
                            result.date = data.date;
                            return result;
                        }).reverse();
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
                        const round = event.pathParameters.round;
                        const { numsArr} = JSON.parse(event.body);
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
                    const choice = event.queryStringParameters && event.queryStringParameters.choice;
                    const flag = event.queryStringParameters && event.queryStringParameters.flag;

                    if (choice) {
                        body = await getIncOrExcNumbers(currentId, getCurrentRound()+1, choice);
                    } else if (flag) {
                        const round = getCurrentRound() + 1;
                        body = await getIncAndExcNumbers(currentId, round);
                        body.total = round;
                    }  else {
                        const rounds = await getIncOrExcRounds(currentId);
                        const round = Number(rounds[0]);
                        body = await getIncAndExcNumbers(currentId, round);
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
                        if(numbers && numbers.length > 0){
                            await updateIncOrExcNumbers(currentId, getCurrentRound() + 1, numbers.sort((a: number, b: number) => a - b), choice);
                        }else{
                            await deleteIncOrExcNumbers(currentId, getCurrentRound() + 1, choice);
                        }
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
                case 'POST':
                    const { lineCount, include } = JSON.parse(event.body);
                    body = await freeGenerator(currentId, {lineCount, include});
            }
        }
            break;
        case '/numbers/week':
        case '/numbers/week/{round}': {
            switch (method) {
                case 'GET':
                    const round = event.pathParameters && event.pathParameters.round;
                    const result = (await scanWeekNumbers(round));
                    const data = result.data.map(item => {
                        const hits = item.numbers && item.week.map(weekNum => !item.numbers.some(num => num === weekNum));
                        return {
                            round: item.round,
                            numbers: item.week,
                            hits
                        }
                    });
                    const rounds = result.rounds;
                    body = {data, rounds};
            }
        }
            break;
        case '/main/numbers': {
            const round = getCurrentRound();
            body = await getLottoData(round);
            body.stats = await getWinStats();
        }
            break;
        case '/mypage': {
            switch (method) {
                case 'GET':
                    const lotto = await getLotto2(getCurrentRound());
                    const myData = await getMyHome(currentId);

                    let winner = 6;
                    myData.beforeNumbers && myData.beforeNumbers.forEach(data => {
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
                    if(winner <= 5) myData.winner = winner;

                    let includeAnswer = 0, excludeAnswer = 0;
                    myData.include && myData.include.before && myData.include.before.forEach(num => {
                        if (lotto.numbers.some(item => item === num)) includeAnswer++
                    });
                    myData.exclude && myData.exclude.before && myData.exclude.before.forEach(num => {
                        if (!lotto.numbers.some(item => item === num)) excludeAnswer++
                    });

                    if(Number(new Date(myData.until)) < Number(new Date())){
                        await expirePlan(currentId);
                    }
                    body = {
                        winner: myData.winner,
                        lotto,
                        numsArr: myData.numsArr && myData.numsArr.reverse(),
                        total: myData.total,
                        include: myData.include && {
                            current: myData.include.current,
                            before: myData.include.before && {
                                size: myData.include.before.length,
                                answer: includeAnswer
                            }
                        },
                        exclude:  myData.exclude &&{
                            current: myData.exclude.current,
                            before: myData.exclude.before && {
                                size: myData.exclude.before.length,
                                answer: excludeAnswer
                            }
                        },
                        plan: myData.plan,
                        until: myData.until,
                        point: myData.point,
                        rank: myData.rank
                    }
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