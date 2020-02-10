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
        } else if (typeof req.query.from === 'number' && typeof req.query.to === 'number') {
            temp.from = req.query.from;
            temp.to = req.query.to;
        }
        data = await queryStats(method as Method, temp);
        res.json({ data });
    }
    else {
        if (method === "excludeInclude") {
            let temp: any = {};
            temp.emergence = await queryStats("emergence" as Method, {});
            temp.interval = await queryStats("interval" as Method, {});
            temp.howLongNone = await queryStats("howLongNone" as Method, {});
            temp.frequency = await queryStats("frequency" as Method, {});

            data = temp;
            const theDate = new Date('2020-02-01:20:50');
            const today = new Date();
            const between = Number(today) - Number(theDate);
            const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);

            res.json({ data, total: 896 + plusDate });
        }
        else res.json('wrong method');
    }
});

export default router;