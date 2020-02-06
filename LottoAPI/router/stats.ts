import express from 'express';
import queryStats from '../function/queryStats';
import { Method, QueryStatsParams } from '../interface/LottoDB';
const router = express.Router();

router.get('/:method', async (req, res) => {
    const method: Method = req.params.method as Method;
    if (!(method in Method)) {
        res.json("The parameter doesn't exist");
    }
    const temp:QueryStatsParams = {}
    if(req.query.list){
        temp.list = JSON.parse(decodeURI(req.query.list));
    }else if(req.query.from && req.query.to){
        temp.from = req.query.from;
        temp.to = req.query.to;
    }
    
    const theDate = new Date('2020-02-01:20:40');
    const today = new Date();
    const between = Number(today) - Number(theDate);
    const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);

    const data = await queryStats(method, temp);
    
    res.json({ data, total: 896 + plusDate });
});

export default router;