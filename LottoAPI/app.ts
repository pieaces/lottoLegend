import express from 'express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import queryStats from './function/queryStats'
import { Method } from './class/LottoData/Base';
import { GeneratorOption } from './class/Generator/Base';
import Generator from './class/Generator';
import Calculate from './class/Calculate';

const app = express();
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.get('/stats', async (req, res) => {
    const method: Method = req.query.method;
    if (!(method in Method)) {
        res.json("The parameter doesn't exist");
    }

    const theDate = new Date('2020-02-01:20:40');
    const today = new Date();
    const between = Number(today) - Number(theDate);
    const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);

    const data = await queryStats(method);
    res.json({data, total:896+plusDate});
});

app.post('/numbers/generator', (req, res) => {
    const option: GeneratorOption = {};

    option.excludedLines = req.body.excludedLines,
        option.includeNumbers = req.body.includeNumbers,
        option.excludeNumbers = req.body.excludeNumbers,
        option.lowCount = req.body.lowCount,
        option.sum = req.body.sum,
        option.oddCount = req.body.oddCount,
        option.primeCount = req.body.primeCount,
        option.$3Count = req.body.$3Count,
        option.sum$10 = req.body.sum$10,
        option.diffMaxMin = req.body.diffMaxMin,
        option.AC = req.body.AC,
        option.consecutiveExist = req.body.consecutiveExist;

    const current: string = req.body.current;
    const generator = new Generator(option);

    switch (current) {
        case 'excludedLines':
            res.json({
                range: generator.constraintLowCount()
            });
            break;
        case 'lowCount':
            res.json({
                range: generator.constraintSum()
            });
            break;
        case 'sum':
            generator.rangeFinder = Calculate.oddCount;
            break;
        case 'oddCount':
            generator.rangeFinder = Calculate.primeCount;
            break;
        case 'primeCount':
            generator.rangeFinder = Calculate.$3Count;
            break;
        case '$3Count':
            generator.rangeFinder = Calculate.sum$10;
            break;
        case 'sum$10':
            generator.rangeFinder = Calculate.diffMaxMin;
            break;
        case 'diffMaxMin':
            generator.rangeFinder = Calculate.AC;
            break;
        case 'AC':
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
            range: [...generator.rangeSet].sort((a,b)=>(a-b)),
            count: generator.getGeneratedNumbers().length
        });
    }
});

app.listen(3000, () => {
    console.log("LottoApi");
});

export default app;
