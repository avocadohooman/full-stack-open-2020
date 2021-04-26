import express from 'express';
import diaryService from '../service/diaryService';

const diaryRouter = express.Router();

diaryRouter.get('/', async (_req, res) => {
    res.send(diaryService.getNonSensitiveDiaryEntries());
});

diaryRouter.post('/', async (_req, res) => {
    res.send('Saving a diary!');
});

export default diaryRouter;