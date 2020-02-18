import express from 'express';
import Posts from '../Posts';

const router = express.Router();
router.post('/', async (req, res) => {
    const db = new Posts();
    const {title, writerId, writerName, contents} = req.body;
    const insertId = await db.put(title, writerId, writerName, contents);
    res.json(true);
});

router.get('/', async (req, res) => {
    
})
export default router;