import express from 'express';

const diaryRouter = express.Router();

diaryRouter.get('/', async (_req, res) => {
    res.send('Fetschin all diaries');
});

diaryRouter.post('post', async (_req, res) => {
    res.send('Saving a diary!');
});

export default diaryRouter;