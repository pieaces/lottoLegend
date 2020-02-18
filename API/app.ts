import express from 'express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import statsRouter from './router/stats';
import numbersRouter from './router/numbers';

const app = express();
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.use('/stats', statsRouter);
app.use('/numbers', numbersRouter);

app.listen(3000, () => {
    console.log("LottoApi 서버 가동");
});

export default app;
