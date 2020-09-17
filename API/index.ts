import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { GeneratorOption } from './Lotto/interface';
import { Plan, getRank } from './dynamoDB';
import Calculate from './Lotto/class/Calculate';
import Generator from './Lotto/class/Generator';
const pem = jwkToPem({
    "alg": "RS256",
    "e": "AQAB",
    "kid": "iEEJai7+dBRG78TChUQF/y1MR+OHGkwiY3ang0kMSJI=",
    "kty": "RSA",
    "n": "jTx_aOudg8n-T3o86X-1nlRVKWThpGwx-af5zIp_aoeanPvMqyd1LnQAiiXTCufLvo-j2MDiUivPFnsbVS1JJoUj5OKlIRdjILgP_-FO-0OXira3bA5yaZIzbehk8UfKzNmxH1B-48_wrYOZjqebWOjJ1aBw-09EAEiQqAhdU4kSy7LCIxUpfqRnMOhvM-7DFRtEHmVnsfl_kBSj3WJg7SR7ak945wieiW4mwVoRqZUO7YlNeHpnzkWMb3yIRNvwjB_-Zh5EpsNYBgXRtEXXl3ldyhNwUaq2HC5y7BNg9fb4gwhJP8DgDMRtfun7odD3teTK2rptU5kzS5Q4jjFZoQ",
    "use": "sig"
});

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}

exports.handler = async (event: any) => {
    console.log(event);

    let currentId: string;
    try {
        const userInfo:any = jwt.verify(event.headers['x-id-token'], pem, { algorithms: ['RS256'] });
        currentId = userInfo["cognito:username"];
    } catch (err) {
        console.log('Intruder Alert! - Expired Token || Not LogedIn', err);
        const response = {
            statusCode: 400,
            headers,
        };
        return response;
    }
    let statusCode: number = 200;
    let body: any;

    const plan = await getRank(currentId);
    // if (plan !== Plan.premium && plan !== Plan['premium+']) {
    //     console.log('Intruder Alert! - Not Premium!');
    //     const response = {
    //         statusCode: 400,
    //         headers,
    //     };
    //     return response;
    // }
    const option: GeneratorOption = {};
    let willRangeFinder: (numbers: number[]) => number = null;
    const { options } = JSON.parse(event.body);

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
            range: [...generator.rangeSet].sort((a, b) => (a - b)),
            count: generator.getGeneratedNumbers().length,
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