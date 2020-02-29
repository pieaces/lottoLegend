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
function isIdentical(currentId: string, writerId: string): Response {
    if (currentId === writerId) {
        return new Response(false);
    } else {
        return new Response(true, '작성자가 아닙니다.');
    }
}
exports.handler = async (event: any) => {
    console.log(event);
    const method: string = event.httpMethod;
    const resource: string = event.resource;
    let logedIn: boolean = false;

    let currentId: string, currentName: string;
    if (event.headers['x-id-token']) {
        let decodedToken: any;
        try {
            decodedToken = jwt.verify(event.headers['x-id-token'], pem, { algorithms: ['RS256'] });
            logedIn = true;
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


    const option: GeneratorOption = {};
    let willRangeFinder: (numbers: number[]) => number = null;
    const data = JSON.parse(event.body);

    if (data.excludedLines) {
        option.excludedLines = data.excludedLines;
    }
    if (data.includedNumbers) {
        option.includedNumbers = data.includedNumbers;
    }
    if (data.excludedNumbers) {
        option.excludedNumbers = data.excludedNumbers;
    }
    if (data.lowCount) {
        option.lowCount = data.lowCount;
    }
    if (data.sum) {
        option.sum = data.sum;
        willRangeFinder = Calculate.oddCount;
    }
    if (data.oddCount) {
        option.oddCount = data.oddCount;
        willRangeFinder = Calculate.primeCount;
    }
    if (data.primeCount) {
        option.primeCount = data.primeCount;
        willRangeFinder = Calculate.$3Count;
    }
    if (data.$3Count) {
        option.$3Count = data.$3Count;
        willRangeFinder = Calculate.sum$10;
    }
    if (data.sum$10) {
        option.sum$10 = data.sum$10;
        willRangeFinder = Calculate.diffMaxMin;
    }
    if (data.diffMaxMin) {
        option.diffMaxMin = data.diffMaxMin;
        willRangeFinder = Calculate.AC;
    }
    if (data.AC) {
        option.AC = data.AC;
        willRangeFinder = Calculate.consecutiveExist;
    }
    if (typeof data.consecutiveExist === 'boolean') {
        option.consecutiveExist = data.consecutiveExist;
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