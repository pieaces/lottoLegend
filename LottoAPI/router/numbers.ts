import express from 'express';
import Generator from '../class/Generator';
import Calculate from '../class/Calculate';
import { Method } from '../interface/LottoDB';
import { GeneratorOption } from '../interface/Generator';
const router = express.Router();

router.post('/generator', (req, res) => {
    const option: GeneratorOption = {};

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
    }
    if (req.body.oddCount) {
        option.oddCount = req.body.oddCount;
    }
    if (req.body.primeCount) {
        option.primeCount = req.body.primeCount;
    }
    if (req.body.$3Count) {
        option.$3Count = req.body.$3Count;
    }
    if (req.body.sum$10) {
        option.sum$10 = req.body.sum$10;
    }
    if (req.body.diffMaxMin) {
        option.diffMaxMin = req.body.diffMaxMin;
    }
    if (req.body.AC) {
        option.AC = req.body.AC;
    }
    if (req.body.consecutiveExist) {
        option.consecutiveExist = req.body.consecutiveExist;
    }

    const current: Method = req.body.current;
    const generator = new Generator(option);

    switch (current) {
        case Method.excludedLineCount:
            res.json({
                range: generator.constraintLowCount()
            });
            break;
        case Method.lowCount:
            res.json({
                range: generator.constraintSum()
            });
            break;
        case Method.sum:
            generator.rangeFinder = Calculate.oddCount;
            break;
        case Method.oddCount:
            generator.rangeFinder = Calculate.primeCount;
            break;
        case Method.primeCount:
            generator.rangeFinder = Calculate.$3Count;
            break;
        case Method.$3Count:
            generator.rangeFinder = Calculate.sum$10;
            break;
        case Method.sum$10:
            generator.rangeFinder = Calculate.diffMaxMin;
            break;
        case Method.diffMaxMin:
            generator.rangeFinder = Calculate.AC;
            break;
        case Method.AC:
            generator.rangeFinder = Calculate.consecutiveExist;
            break;
    }
    generator.generate();
    if (current === 'consecutiveExist') {
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