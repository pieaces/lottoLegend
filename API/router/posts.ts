import express from 'express';
import putPost, { Post } from '../Posts/putPost'

const router = express.Router();
router.post('/', async (req, res) => {
    const post: Post = {
        title: req.body.title,
        writerId: 'devId',
        writerName: 'devName',
        contents: req.body.contents
    };
    const bool = await putPost(post);
    res.json(bool);
});

export default router;