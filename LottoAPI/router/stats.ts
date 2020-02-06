import express from 'express';
import queryStats from '../function/queryStats';
import { Method, QueryStatsParams } from '../interface/LottoDB';
const router = express.Router();

router.get('/:method', async (req, res) => {
    const method = req.params.method;
    let data;
    if (method in Method) {

        const temp: QueryStatsParams = {}
        if (req.query.list) {
            temp.list = JSON.parse(decodeURI(req.query.list));
        } else if (req.query.from && req.query.to) {
            temp.from = req.query.from;
            temp.to = req.query.to;
        }
        data = await queryStats(method as Method, temp);
    }
    else {
        if (method === "excludeInclude") {
            let temp:any = {};
            temp.emergence = await queryStats("emergence" as Method, {});
            temp.interval = await queryStats("interval" as Method, {});
            temp.howLongNone = await queryStats("howLongNone" as Method, {});
            temp.frequency = await queryStats("frequency" as Method, {});

            data = temp;
        }
        else res.json('wrong method');
    }

    const theDate = new Date('2020-02-01:20:40');
    const today = new Date();
    const between = Number(today) - Number(theDate);
    const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);

    res.json({ data, total: 896 + plusDate });
});

export default router;