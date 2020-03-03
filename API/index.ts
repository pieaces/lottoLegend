import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { Response } from "./Response";
import { GeneratorOption } from './Lotto/interface';
import { Plan, getRank } from './dynamoDB/getRank';
import Calculate from './Lotto/class/Calculate';
import Generator from './Lotto/class/Generator';
const pem = jwkToPem({
    "alg": "RS256",
    "e": "AQAB",
    "kid": "mv27gjWoWPX6h3VfMR2y2WsKGIAwdQ9jXRgn4cnMrYo=",
    "kty": "RSA",
    "n": "lqR6rfxpx4fNjalDjNrG1qQCo0sd7uLgIEwCRqg7bgvY6mbKPFhY0EbQGmgKl8-_p1Zx48r4XJ5zeKmbcpBBHrY57fQOsZGQonXSFH4FQDRMVMFVHwExokvGLnk83mJpuHikO1b-IMmsUlRwm6NE_Jgu7Yg4ErHPNcx3kBYfFjHO7h0J3jZ6HM_5uW8QPLh9Mvt_ZDxr37ElctecSXiWoKr7ySbsTt_W5qFxMHLkd9mwVO_CC3k5pBpLXsn5VKRAiM51X_aaQ1MMGTZ4f-0KFZr3jChn7-7BKouJoGO43x1FdkexdiBjRIWGzTszFXeziTNFY1R9uTtzrFdgeqMJ3w",
    "use": "sig"
});

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}

exports.handler = async (event: any) => {
    console.log(event);

    let currentId: string, currentName: string;
    if (event.headers['x-id-token']) {
        let decodedToken: any;
        try {
            decodedToken = jwt.verify(event.headers['x-id-token'], pem, { algorithms: ['RS256'] });
            const userInfo = decodedToken as { 'cognito:username': string, nickname: string };
            currentId = userInfo["cognito:username"];
            currentName = userInfo.nickname;
            const rank = await getRank(currentId);
            if (rank !== Plan.premium) {
                console.log('Intruder Alert! - Not Premium!');
                const response = {
                    statusCode: 200,
                    body:JSON.stringify(new Response(true, 'Not Premium')),
                    headers,
                };
                return response;
            }
        } catch (err) {
            console.log('Intruder Alert! - Expired Token || Not LogedIn', err);
            const response = {
                statusCode: 400,
                headers,
            };
            return response;
        }
    }

    let statusCode: number = 200;
    let body: any;

    const option: GeneratorOption = {};
    let willRangeFinder: (numbers: number[]) => number = null;
    const {options} = JSON.parse(event.body);

    if (options.excludedLines) {
        option.excludedLines = options.excludedLines;
    }
    if (options.includedNumbers) {
        option.includedNumbers = options.includedNumbers;
    }
    if (options.excludedNumbers) {
        option.excludedNumbers = options.excludedNumbers;
    }
    if (options.lowCount) {
        option.lowCount = options.lowCount;
    }
    if (options.sum) {
        option.sum = options.sum;
        willRangeFinder = Calculate.oddCount;
    }
    if (options.oddCount) {
        option.oddCount = options.oddCount;
        willRangeFinder = Calculate.primeCount;
    }
    if (options.primeCount) {
        option.primeCount = options.primeCount;
        willRangeFinder = Calculate.$3Count;
    }
    if (options.$3Count) {
        option.$3Count = options.$3Count;
        willRangeFinder = Calculate.sum$10;
    }
    if (options.sum$10) {
        option.sum$10 = options.sum$10;
        willRangeFinder = Calculate.diffMaxMin;
    }
    if (options.diffMaxMin) {
        option.diffMaxMin = options.diffMaxMin;
        willRangeFinder = Calculate.AC;
    }
    if (options.AC) {
        option.AC = options.AC;
        willRangeFinder = Calculate.consecutiveExist;
    }
    if (typeof options.consecutiveExist === 'boolean') {
        option.consecutiveExist = options.consecutiveExist;
    }

    const generator = new Generator(option);
    generator.rangeFinder = willRangeFinder;
    generator.generate();

    if (!generator.option.sum) {
        statusCode = 400;
    }
    else if (generator.option.sum && generator.count <= 50) {
        body = {
            numbers: generator.getGeneratedNumbers()
        };
    } else {
        body = {
            range: [...generator.rangeSet].sort((a, b) => (a - b)),
            count: generator.getGeneratedNumbers().length
        };
    }

    return {
        statusCode,
        headers,
        body: JSON.stringify(body)
    }
}