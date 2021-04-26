import express from 'express';
import diaryService from '../service/diaryService';
import toNewDiaryEntry from '../utils/utils';

const diaryRouter = express.Router();

diaryRouter.get('/', async (_req, res) => {
    res.send(diaryService.getNonSensitiveDiaryEntries());
});

diaryRouter.get('/:id', async (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));

    if (diary) {
        return res.send(diary);
    } else {
        return res.sendStatus(404).json({error: 'diary entry not found'});
    }
})

diaryRouter.post('/', async (req, res) => {

    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);

        const addedEntry = diaryService.addEntry(newDiaryEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default diaryRouter;