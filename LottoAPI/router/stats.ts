import express from 'express';
import queryStats from '../function/queryStats';
import { Method, QueryStatsParams } from '../interface/LottoDB';
import queryLotto from '../function/queryLotto';
import { LottoNumber } from '../interface/Lotto';
const router = express.Router();

router.get('/:method', async (req, res) => {
    const method = req.params.method;
    let data;
    if (method in Method) {
        const temp: QueryStatsParams = {}
        if ((req.query.from && req.query.to)) {
            temp.from = Number(req.query.from);
            temp.to = Number(req.query.to);
        } else if (req.query.list) {
            temp.list = JSON.parse(decodeURI(req.query.list));
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
            let round = 896 + plusDate;
            let total:number = 0;

            const winNums: LottoNumber[][] = [];
            while (winNums.length !== 3) {
                try {
                    const numbers = await queryLotto(round);
                    winNums.push(numbers);
                    if(total !== 0) total = round;
                } catch (err) {
                    console.log(err);
                }finally{
                    round--;
                }
            }

            res.json({ data, total, winNums});
        }
        else res.json('wrong method');
    }
});

export default router;