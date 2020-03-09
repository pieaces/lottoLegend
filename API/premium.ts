import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { Plan, getPlan } from './dynamoDB/userInfo';
import Calculate from './Lotto/class/Calculate';
import Generator from './Lotto/class/Generator';
import { numsArrToData } from './dynamoDB/generator';
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

    const plan = await getPlan(currentId);
    if (plan !== Plan.premium && plan !== Plan.premiumplus) {
        console.log('Intruder Alert! - Not Premium!');
        const response = {
            statusCode: 400,
            headers,
        };
        return response;
    }
    
    const { option } = JSON.parse(event.body);
    const generator = new Generator(option);
    if(typeof option.lowCount !== 'number'){
        return { statusCode: 400 };
    }else if(!option.sum) generator.rangeFinder = Calculate.sum;
    else if(!option.oddCount) generator.rangeFinder = Calculate.oddCount;
    else if(!option.primeCount) generator.rangeFinder = Calculate.primeCount;
    else if(!option.$3Count) generator.rangeFinder = Calculate.$3Count;
    else if(!option.sum$10) generator.rangeFinder = Calculate.sum$10;
    else if(!option.diffMaxMin) generator.rangeFinder = Calculate.diffMaxMin;
    else if(!option.AC) generator.rangeFinder = Calculate.AC;
    else if(typeof option.consecutiveExist !== 'boolean') generator.rangeFinder = Calculate.consecutiveExist;
    generator.generate();

    body = {
        range: [...generator.rangeSet].sort((a, b) => (a - b)),
        count: generator.count
    };
    if(!option.sum && option.lowCount) body.range = [body.range[0], body.range[body.range.length-1]];
    if (generator.count <= 50) {
        body.numbers = await numsArrToData(generator.getGeneratedNumbers());
    } else if (typeof option.consecutiveExist === 'boolean') {
        if (generator.count >= 75) {
            const indexSet = new Set<number>();
            while (indexSet.size < 50) {
                indexSet.add(Math.floor(Math.random() * generator.count));
            }
            const generatedNumbers = generator.getGeneratedNumbers();
            body.numbers = await numsArrToData(Array.from(indexSet).sort((a, b) => a - b).map(index => generatedNumbers[index]));
        }else{
            body.numbers = await numsArrToData(generator.getGeneratedNumbers().slice(0, 50));
        }
    }

    return {
        statusCode,
        headers,
        body: JSON.stringify(body)
    }
}