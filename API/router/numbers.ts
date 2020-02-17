import express from 'express';
import Generator from '../Lotto/class/Generator';
import Calculate from '../Lotto/class/Calculate';
import { GeneratorOption } from '../Lotto/interface/Generator';
const router = express.Router();

router.post('/generator', (req, res) => {
    const option: GeneratorOption = {};
    let willRangeFinder: (numbers: number[])=> number = null;

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