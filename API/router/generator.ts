import express from 'express';
import Generator from '../Lotto/class/Generator';
import Calculate from '../Lotto/class/Calculate';
import { GeneratorOption } from '../Lotto/interface';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { getRank, Plan } from '../dynamoDB/getRank';
const pem = jwkToPem({
    "alg": "RS256",
    "e": "AQAB",
    "kid": "mv27gjWoWPX6h3VfMR2y2WsKGIAwdQ9jXRgn4cnMrYo=",
    "kty": "RSA",
    "n": "lqR6rfxpx4fNjalDjNrG1qQCo0sd7uLgIEwCRqg7bgvY6mbKPFhY0EbQGmgKl8-_p1Zx48r4XJ5zeKmbcpBBHrY57fQOsZGQonXSFH4FQDRMVMFVHwExokvGLnk83mJpuHikO1b-IMmsUlRwm6NE_Jgu7Yg4ErHPNcx3kBYfFjHO7h0J3jZ6HM_5uW8QPLh9Mvt_ZDxr37ElctecSXiWoKr7ySbsTt_W5qFxMHLkd9mwVO_CC3k5pBpLXsn5VKRAiM51X_aaQ1MMGTZ4f-0KFZr3jChn7-7BKouJoGO43x1FdkexdiBjRIWGzTszFXeziTNFY1R9uTtzrFdgeqMJ3w",
    "use": "sig"
});
const router = express.Router();

router.post('/', (req, res) => {
    const option: GeneratorOption = {};
    let willRangeFinder: (numbers: number[])=> number = null;
    const idToken = req.header('x-id-token');
    if(!idToken) {
        console.log("Intruder Alert! - No Token!");
        return res.json('잘못된 접근입니다.');
    }
    jwt.verify(idToken, pem, { algorithms: ['RS256'] }, async (err, decodedToken:any) => {
        if(err){
            console.log('Intruder Alert! - Expired Token!');
            return res.json('잘못된 접근입니다.');
        }
        const userName = decodedToken["cognito:username"];
        const rank = await getRank(userName);
        if(rank !== Plan.premium) {
            console.log('Intruder Alert! - Not Premium!');
            return res.json('잘못된 접근입니다.');
        }
    });
    if (req.body.excludedLines) {
        option.excludedLines = req.body.excludedLines;
    }
    if (req.body.includedNumbers) {
        option.includedNumbers = req.body.includedNumbers;
    }
    if (req.body.excludedNumbers){
        option.excludedNumbers = req.body.excludedNumbers;
    }
    if (req.body.lowCount) {
        option.lowCount = req.body.lowCount;
    }
    if (req.body.sum) {
        option.sum = req.body.sum;
        willRangeFinder = Calculate.oddCount;
    }
    if (req.body.oddCount) {
        option.oddCount = req.body.oddCount;
        willRangeFinder = Calculate.primeCount;
    }
    if (req.body.primeCount) {
        option.primeCount = req.body.primeCount;
        willRangeFinder = Calculate.$3Count;
    }
    if (req.body.$3Count) {
        option.$3Count = req.body.$3Count;
        willRangeFinder = Calculate.sum$10;
    }
    if (req.body.sum$10) {
        option.sum$10 = req.body.sum$10;
        willRangeFinder = Calculate.diffMaxMin;
    }
    if (req.body.diffMaxMin) {
        option.diffMaxMin = req.body.diffMaxMin;
        willRangeFinder = Calculate.AC;
    }
    if (req.body.AC) {
        option.AC = req.body.AC;
        willRangeFinder = Calculate.consecutiveExist;
    }
    if (typeof req.body.consecutiveExist === 'boolean') {
        option.consecutiveExist = req.body.consecutiveExist;
    }

    const generator = new Generator(option);
    generator.rangeFinder = willRangeFinder;
    generator.generate();

    if(!generator.option.sum){
        res.json("Not Proper Parameters");
    }
    else if (generator.option.sum && generator.count <= 50) {
        res.json({
            numbers: generator.getGeneratedNumbers()
        });
    } else {
        res.json({
            range: [...generator.rangeSet].sort((a, b) => (a - b)),
            count: generator.getGeneratedNumbers().length
        });
    }
});

export default router;