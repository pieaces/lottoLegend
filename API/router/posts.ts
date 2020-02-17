import express from 'express';
import putPost  from '../Posts/putPost'
import Post from '../Posts/interface';

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

router.get('/', async (req, res) => {
    
})
export default router;