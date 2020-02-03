import express from 'express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import queryStats from './class/LottoDynamoDB/function/queryStats'
import { Method } from './class/LottoData/Base';

const app = express();
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.get('/stats', async function (req, res) {
    const method:Method = req.query.method;
    if(!(method in Method)){
        res.send("The parameter doesn't exist");
    }
    const data = await queryStats(method);
    res.json(data);
});
app.listen(3000, function () {
    console.log("LottoApi", new Date());
});

app.listen(3000, function () {
    console.log("LottoApi", new Date());
});

export default app;
