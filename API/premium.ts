import { Plan, getPlan } from './dynamoDB/userInfo';
import Calculate from './Lotto/class/Calculate';
import Generator from './Lotto/class/Generator';
import { numbersToData } from './dynamoDB/generator';
import { scanLotto } from './funtions';
import verify from './auth';

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}

exports.handler = async (event: any) => {
    console.log(event);

    let currentId: string;
    try {
        const userInfo = verify(event.headers['x-id-token']);
        currentId = userInfo["cognito:username"];
    } catch (err) {
        console.log('Intruder Alert! - Expired Token', err);
        const response = {
            statusCode: 400,
            headers,
        };
        return response;
    }
    let statusCode: number = 200;
    let body: any;

    const plan = await getPlan(currentId);
    if (plan !== Plan.premium && plan !== Plan['premium+']) {
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
        const lottoData = await scanLotto();
        body.numbers = generator.getGeneratedNumbers().map(numbers => numbersToData(numbers, lottoData));
    } else if (typeof option.consecutiveExist === 'boolean') {
        const lottoData = await scanLotto();
        if (generator.count >= 75) {
            const indexSet = new Set<number>();
            while (indexSet.size < 50) {
                indexSet.add(Math.floor(Math.random() * generator.count));
            }
            const generatedNumbers = generator.getGeneratedNumbers();
            body.numbers = Array.from(indexSet).sort((a, b) => a - b).map(index => generatedNumbers[index]).map(numbers => numbersToData(numbers, lottoData));
        }else{
            body.numbers = generator.getGeneratedNumbers().slice(0, 50).map(numbers => numbersToData(numbers, lottoData));
        }
    }

    return {
        statusCode,
        headers,
        body: JSON.stringify(body)
    }
}