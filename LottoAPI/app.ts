const express = require('express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const app = express();
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.get('/items', function (req, res) {
    if (req.query.numbers === "only") {
        console.log('진입상공');
    }
});

app.listen(3000, function () {
    console.log("LottoApi", new Date());
});

module.exports = app
